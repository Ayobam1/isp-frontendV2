const readline = require('readline');
const axios = require('axios');
const FormData = require('form-data');

const API_URL = 'http://localhost:3001';
let token = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to prompt for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Login function
async function login() {
  console.log('\n===== Admin Login =====');
  const email = await prompt('Email: ');
  const password = await prompt('Password: ');
  
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    
    token = response.data.token;
    console.log('\nLogin successful!');
    console.log(`Welcome, ${response.data.user.name} (${response.data.user.role})`);
    return response.data.user;
  } catch (error) {
    console.error('\nLogin failed:', error.response?.data?.message || error.message);
    return null;
  }
}

// Create admin function
async function createAdmin() {
  console.log('\n===== Create Admin =====');
  const email = await prompt('Email: ');
  const password = await prompt('Password: ');
  const name = await prompt('Name: ');
  const role = await prompt('Role (super admin/admin): ');
  
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('name', name);
  formData.append('role', role);
  
  try {
    const response = await axios.post(`${API_URL}/admin`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders()
      }
    });
    
    console.log('\nAdmin created successfully!');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('\nFailed to create admin:', error.response?.data?.message || error.message);
    return null;
  }
}

// List all admins
async function listAdmins() {
  console.log('\n===== Admin List =====');
  
  try {
    const response = await axios.get(`${API_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('\nAdmins:');
    response.data.forEach(admin => {
      console.log(`ID: ${admin.id}, Name: ${admin.name}, Email: ${admin.email}, Role: ${admin.role}, Status: ${admin.status}`);
    });
    return response.data;
  } catch (error) {
    console.error('\nFailed to fetch admins:', error.response?.data?.message || error.message);
    return [];
  }
}

// Change admin status
async function changeAdminStatus() {
  console.log('\n===== Change Admin Status =====');
  
  // First list all admins
  const admins = await listAdmins();
  if (admins.length === 0) {
    return;
  }
  
  const id = await prompt('Enter admin ID to change status: ');
  const status = await prompt('New status (active/inactive): ');
  
  const formData = new FormData();
  formData.append('status', status);
  
  try {
    const response = await axios.patch(`${API_URL}/admin/${id}/status`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders()
      }
    });
    
    console.log('\nAdmin status updated successfully!');
    console.log(response.data);
  } catch (error) {
    console.error('\nFailed to update admin status:', error.response?.data?.message || error.message);
  }
}

// Main menu
async function showMenu(user) {
  console.log('\n===== Admin Management System =====');
  console.log('1. Create Admin');
  console.log('2. List Admins');
  console.log('3. Change Admin Status');
  console.log('4. Logout');
  console.log('5. Exit');
  
  const choice = await prompt('Enter your choice (1-5): ');
  
  switch (choice) {
    case '1':
      await createAdmin();
      break;
    case '2':
      await listAdmins();
      break;
    case '3':
      await changeAdminStatus();
      break;
    case '4':
      console.log('\nLogging out...');
      token = null;
      return false;
    case '5':
      console.log('\nExiting...');
      rl.close();
      process.exit(0);
      break;
    default:
      console.log('\nInvalid choice, please try again.');
  }
  
  return true;
}

// Main function
async function main() {
  let loggedIn = false;
  let user = null;
  
  while (!loggedIn) {
    user = await login();
    if (user) {
      loggedIn = true;
    } else {
      const retry = await prompt('\nDo you want to try again? (y/n): ');
      if (retry.toLowerCase() !== 'y') {
        console.log('\nExiting...');
        rl.close();
        process.exit(0);
      }
    }
  }
  
  let stayInMenu = true;
  while (stayInMenu) {
    stayInMenu = await showMenu(user);
    
    if (!stayInMenu) {
      loggedIn = false;
      while (!loggedIn) {
        user = await login();
        if (user) {
          loggedIn = true;
          stayInMenu = true;
        } else {
          const retry = await prompt('\nDo you want to try again? (y/n): ');
          if (retry.toLowerCase() !== 'y') {
            console.log('\nExiting...');
            rl.close();
            process.exit(0);
          }
        }
      }
    }
  }
}

main().catch(error => {
  console.error('An unexpected error occurred:', error);
  rl.close();
  process.exit(1);
});