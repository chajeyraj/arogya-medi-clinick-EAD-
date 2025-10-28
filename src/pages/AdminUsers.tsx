import React, { useState } from 'react';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { users } from '../data/users';
const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  // Filter users based on search term
  const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.role.toLowerCase().includes(searchTerm.toLowerCase())).map(({
    password,
    ...rest
  }) => rest); // Remove password from display
  const handleAddNew = () => {
    setCurrentUser(null);
    setShowModal(true);
  };
  const handleEdit = (user: any) => {
    setCurrentUser(user);
    setShowModal(true);
  };
  const handleDelete = (id: string) => {
    // In a real app, this would call an API to delete the user
    alert(`Delete user with ID: ${id}`);
  };
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button onClick={handleAddNew} className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" /> Add New User
        </button>
      </div>
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input type="text" placeholder="Search users by name, username, or role..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" />
      </div>
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : user.role === 'owner' ? 'bg-blue-100 text-blue-800' : user.role === 'pharmacist' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{user.email}</div>
                    <div>{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.status === 'active' ? <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1" /> : <XCircleIcon className="h-5 w-5 text-red-500 mr-1" />}
                      <span className={`${user.status === 'active' ? 'text-green-800' : 'text-red-800'}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-900 mr-3">
                      <EditIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add/Edit User Modal */}
      {showModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {currentUser ? 'Edit User' : 'Add New User'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input type="text" defaultValue={currentUser?.name || ''} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input type="text" defaultValue={currentUser?.username || ''} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input type="email" defaultValue={currentUser?.email || ''} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input type="text" defaultValue={currentUser?.phone || ''} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role
                </label>
                <select defaultValue={currentUser?.role || ''} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="owner">Owner</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="supplier">Supplier</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="status" value="active" defaultChecked={currentUser?.status === 'active' || !currentUser} className="form-radio h-4 w-4 text-yellow-500" />
                    <span className="ml-2">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="status" value="inactive" defaultChecked={currentUser?.status === 'inactive'} className="form-radio h-4 w-4 text-red-500" />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div>
              {!currentUser && <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>}
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-yellow-500 text-black rounded-lg">
                  {currentUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export default AdminUsers;