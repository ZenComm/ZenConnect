import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaEye } from 'react-icons/fa'; // Use FaEnvelope for messaging
import { Link } from 'react-router-dom';

const EmployeeView = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/profiles', {
        validateStatus: () => true,
      });
      if (result.status === 200) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Error loading users', error);
    }
  };

  return (
    <section style={styles.fullscreenContainer}>
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          style={styles.searchInput}
        />
      </div>

      <table className="table table-bordered table-hover shadow" style={styles.table}>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Group Name</th>
            <th>Technical Skills</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users
            .filter((user) =>
              (user.full_name?.toLowerCase() || '').includes(search) ||
              (user.email?.toLowerCase() || '').includes(search) ||
              (user.role?.toLowerCase() || '').includes(search) ||
              (user.groupName?.toLowerCase() || '').includes(search) ||
              (user.technicalSkills?.toLowerCase() || '').includes(search)
            )
            .map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.full_name || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.role || 'N/A'}</td>
                <td>{user.groupName || 'N/A'}</td>
                <td>
                  {Array.isArray(user.technicalSkills)
                    ? user.technicalSkills.join(', ')
                    : user.technicalSkills || 'N/A'}
                </td>
                <td className="mx-2">
                  <Link to={`/user-profile/${user.id}`} className="btn btn-info" style={styles.iconButton}>
                    <FaEye size={24} /> {/* View Profile Icon */}
                  </Link>
                </td>
                <td className="mx-2">
                  <Link to={`/chat/${user.id}`} className="btn btn-success" style={styles.iconButton}>
                    <FaEnvelope size={24} /> {/* Send Message Icon */}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

const styles = {
  fullscreenContainer: {
    minHeight: '100vh', // Fullscreen height
    width: '100%', // Fullscreen width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#f5f5f5', // Optional: background color
  },
  searchBar: {
    width: '80%', // Adjust as needed
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  table: {
    width: '90%', // Adjust as needed
  },
  iconButton: {
    fontSize: '24px', // Increase button size
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default EmployeeView;