const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your_jwt_secret_key';

// Setup multer for form-data parsing
const upload = multer();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to read and write to JSON file
function readAdminsFile() {
  const data = fs.readFileSync(path.join(__dirname, 'admins.json'), 'utf8');
  return JSON.parse(data);
}

function writeAdminsFile(data) {
  fs.writeFileSync(
    path.join(__dirname, 'admins.json'),
    JSON.stringify(data, null, 2),
    'utf8'
  );
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Login endpoint to get JWT token
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const data = readAdminsFile();
  const admin = data.admins.find(a => a.email === email);
  
  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  if (admin.status !== 'active') {
    return res.status(403).json({ message: 'Account is inactive' });
  }
  
  const token = jwt.sign(
    { id: admin.id, role: admin.role, name: admin.name },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({
    token,
    user: {
      id: admin.id,
      name: admin.name,
      role: admin.role
    }
  });
});

// Create admin endpoint
app.post('/admin', verifyToken, upload.none(), (req, res) => {
  // Check if user has permissions
  if (req.user.role !== 'super admin') {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }
  
  const { email, password, name, role } = req.body;
  
  // Input validation
  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const data = readAdminsFile();
  
  // Check if email already exists
  if (data.admins.some(admin => admin.email === email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  
  // Create new admin
  const newAdmin = {
    id: Date.now().toString(),
    email,
    password, // In a real app, you would hash this password
    name,
    role,
    permissions: role === 'super admin' ? 'all' : 'limited',
    status: 'active'
  };
  
  // Add to admins array
  data.admins.push(newAdmin);
  writeAdminsFile(data);
  
  // Return the new admin (excluding password)
  const { password: _, ...adminResponse } = newAdmin;
  res.status(201).json(adminResponse);
});

// Get all admins
app.get('/admin', verifyToken, (req, res) => {
  const data = readAdminsFile();
  
  // Filter out passwords
  const admins = data.admins.map(admin => {
    const { password, ...rest } = admin;
    return rest;
  });
  
  res.json(admins);
});

// Change admin status
app.patch('/admin/:id/status', verifyToken, upload.none(), (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  // Validate status
  if (status !== 'active' && status !== 'inactive') {
    return res.status(400).json({ message: 'Invalid status' });
  }
  
  // Prevent changing own status
  if (id === req.user.id) {
    return res.status(403).json({ message: 'Cannot change your own status' });
  }
  
  const data = readAdminsFile();
  const adminIndex = data.admins.findIndex(admin => admin.id === id);
  
  if (adminIndex === -1) {
    return res.status(404).json({ message: 'Admin not found' });
  }
  
  // Update status
  data.admins[adminIndex].status = status;
  writeAdminsFile(data);
  
  // Return updated admin (excluding password)
  const { password, ...adminResponse } = data.admins[adminIndex];
  res.json(adminResponse);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});