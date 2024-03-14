import React, { useEffect, useState } from 'react';
import { Button, Input } from '../components';
import useToast from '../hooks/useToast';
import { getAllUsers, createUser, deleteUser } from '../db/users';

const defaultData = { name: '', age: '', password: '' };
const Users = () => {
  const { Toast, showToast } = useToast();

  const [users, setUsers] = useState([]);
  const [data, setData] = useState(defaultData);
  const handleUserChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const resetForm = () => {
    setData(defaultData)
  }


  const getUsers = async () => {
    const users = await getAllUsers();
    setUsers(users);
    return;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createUser(data.name, data.age, data.password);
      showToast('success', `${data.name} has been added.`);
      resetForm();
      getUsers();
    } catch (error) {
      showToast('error', error);
    }
  }


  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      showToast('success', 'Item has been deleted.');
      getUsers();
    } catch (error) {
      showToast('error', error);
    }
  };


  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <div className='flex flex-col items-center h-screen gap-10 px-24 lg:gap-48 lg:flex-row'>
        <div className='flex-1 w-full'>
          <h2 className='text-center text-white'>Users</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-auto mt-6">
            <Input
              label="User Name"
              value={data.name}
              onChange={handleUserChange}
              name='name'
              placeholder='Enter name'
            />

            <Input
              label="Password"
              type="password"
              value={data.password}
              onChange={handleUserChange}
              name='password'
              placeholder='Enter password'

            />
            <Input
              label="Age"
              type="number"
              value={data.age}
              onChange={handleUserChange}
              name='age'
              placeholder='Enter age'

            />
            <Button type='submit' disabled={
              !data?.name ||
              !data?.age ||
              !data?.password
            }  >
              Add User
            </Button>
          </form>
        </div>





        <div className='flex-1 w-full'>

          <div className=' border  h-[250px] overflow-auto'>
            <table className="min-w-full">
              <thead className='sticky top-0 z-20 bg-gray-700'>
                <tr>
                  <th className="px-4 py-2 font-semibold text-gray-200">Name</th>
                  <th className="px-4 py-2 font-semibold text-gray-200">Age</th>
                  <th className="px-4 py-2 font-semibold text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-500">
                    <td className="px-4 py-2 text-gray-200">{item.name}</td>
                    <td className="px-4 py-2 text-gray-200">{item.age}</td>
                    <td className="px-4 py-2 text-gray-200">
                      <div>   <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
      {Toast()}
    </>
  );
};

export default Users;