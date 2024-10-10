import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [full_name, setFull_name] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('INTERN'); // Default to 'INTERN'
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]); // Store group names
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch group names from API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/api/groups/getAll')
      .then(response => setGroups(response.data))
      .catch(error => console.error('Error fetching groups:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        full_name,
        username,
        email,
        password,
        role,
        groupName
      });
      setSuccess('Registration successful! You can now login.');
      // Clear the form fields
      setFull_name('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('INTERN'); // Reset to default role
      setGroupName('');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center text-primary mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Fullname:</label>
            <input
              type="text"
              className="form-control"
              value={full_name}
              onChange={(e) => setFull_name(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role:</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="MANAGER">Manager</option>
              <option value="INTERN">Intern</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Group Name:</label>
            <select
              className="form-select"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            >
              <option value="">Select a group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
