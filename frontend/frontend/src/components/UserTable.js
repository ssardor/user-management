import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [token]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(user => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
    );
  };

  const handleAction = async (action) => {
    try {
      for (const userId of selectedUsers) {
        if (action === 'delete') {
          await axios.delete(`http://localhost:5000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } else {
          await axios.patch(`http://localhost:5000/api/users/${action}/${userId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      }
      setUsers(users.filter(user => !selectedUsers.includes(user._id)));
      setSelectedUsers([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="toolbar">
        <button className="btn btn-danger" onClick={() => handleAction('delete')}>Delete</button>
        <button className="btn btn-secondary" onClick={() => handleAction('block')}>Block</button>
        <button className="btn btn-success" onClick={() => handleAction('unblock')}>Unblock</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" onChange={handleSelectAll} /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Registration Date</th>
            <th>Last Login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleSelectUser(user._id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.registrationDate).toLocaleString()}</td>
              <td>{new Date(user.lastLogin).toLocaleString()}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;