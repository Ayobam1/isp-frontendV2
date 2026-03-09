import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Started from './components/getStarted';
import Sign from './components/Sign';
import Dashboard from './components/Dashboard';
import Subscriptions from './components/Subscriptions';
import Support from './components/Support';
import History from './components/History';
import Buybundle from './components/Buybundle';
// import Payments from './components/Payments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/started" element={<Started />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/support" element={<Support />} />
        <Route path="/history" element={<History />} />
        <Route path="/buybundle" element={<Buybundle />} />
        {/* <Route path="/payments" element={<Payments />} /> */}
      </Routes>
    </Router>
  );
}

export default App;


