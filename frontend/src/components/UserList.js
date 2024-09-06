import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UserList() {
  const [users, setUsers] = useState([])
  const [role, setRole] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users', {
          headers: { Authorization: `Bearer ${token}` },
          params: { role },
        })
        setUsers(res.data)
      } catch (error) {
        alert('Error retrieving users')
      }
    }
    fetchUsers()
  }, [role, token])

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <br /><br />
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="">All Roles</option>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        <option value="Guest">Guest</option>
      </select>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" >First Name</th>
            <th scope="col" >Last Name</th>
            <th scope="col" >Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td colspan="2" >{user.firstName}</td>
              <td colspan="2" >{user.lastName}</td>
              <td colspan="2" >{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
