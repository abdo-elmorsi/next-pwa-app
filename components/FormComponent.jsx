import React, { useState } from 'react';
import { insertData as addUser } from '../db/users';
import { insertData as addProduct } from '../db/products';
import useToast from '../hooks/useToast';

const FormComponent = () => {
    const { showToast } = useToast();

    const [usersFormData, setUsersFormData] = useState({ name: '', age: '' });
    const handleUserChange = (e) => setUsersFormData({ ...usersFormData, [e.target.name]: e.target.value });




    const [productsFormData, setProductsFormData] = useState({ name: '', details: '' });
    const handleProductChange = (e) => setProductsFormData({ ...productsFormData, [e.target.name]: e.target.value });

    const handleSubmitUser = (e) => {
        e.preventDefault();
        try {
            addUser(usersFormData.name, usersFormData.age);
            showToast('info', `${usersFormData.name} has been added.`);
            setUsersFormData({ name: '', age: '' });
        } catch (error) {
            showToast('error', error);
        }
    };


    const handleSubmitProduct = (e) => {
        e.preventDefault();
        try {
            addProduct(productsFormData.name, productsFormData.details);
            showToast('info', `${productsFormData.name} has been added.`);
            setProductsFormData({ name: '', details: '' });
        } catch (error) {
            showToast('error', error);
        }
    };

    return (
        <div className='flex flex-wrap items-center justify-between gap-8 px-8 mb-8 lg-gap-0 lg:px-0'>
            <div className='w-full lg:w-5/12 '>
                <h2 className='text-center text-white'>Users</h2>
                <form className="max-w-md mx-auto mt-6">
                    <div className="mb-4">
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter name'
                            value={usersFormData.name}
                            onChange={handleUserChange}
                            className="w-full p-2 text-gray-700 border rounded bg-gray-50 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            name='age'
                            placeholder='Enter age'
                            type='number'
                            value={usersFormData.age}
                            onChange={handleUserChange}
                            className="w-full p-2 text-gray-700 border rounded bg-gray-50 focus:outline-none"
                        ></input>
                    </div>
                    <button onClick={handleSubmitUser} className="p-2 text-black bg-yellow-200 rounded bg-gold-500" >
                        Add
                    </button>
                </form>
            </div>
            <div className='w-full lg:w-5/12 '>
                <h2 className='text-center text-white'>Products</h2>
                <form className="max-w-md mx-auto mt-6">
                    <div className="mb-4">
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter name'
                            value={productsFormData.name}
                            onChange={handleProductChange}
                            className="w-full p-2 text-gray-700 border rounded bg-gray-50 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            cols={1}
                            rows={1}
                            name='details'
                            placeholder='Enter details'
                            value={productsFormData.details}
                            onChange={handleProductChange}
                            className="w-full p-2 text-gray-700 border rounded bg-gray-50 focus:outline-none"
                        ></textarea>
                    </div>
                    <button onClick={handleSubmitProduct} className="p-2 text-black bg-yellow-200 rounded bg-gold-500" >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;