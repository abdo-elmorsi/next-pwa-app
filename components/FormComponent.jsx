import React, { useState } from 'react';
import { insertData as addUser } from '../db/users';
import { insertData as addProduct } from '../db/products';
import useToast from '../hooks/useToast';
import { Button, Input } from '../components';

const FormComponent = () => {
    const { showToast } = useToast();

    const [usersFormData, setUsersFormData] = useState({ name: '', age: '', password: '' });
    const handleUserChange = (e) => setUsersFormData({ ...usersFormData, [e.target.name]: e.target.value });




    const [productsFormData, setProductsFormData] = useState({ name: '', details: '' });
    const handleProductChange = (e) => setProductsFormData({ ...productsFormData, [e.target.name]: e.target.value });

    const handleSubmitUser = (e) => {
        e.preventDefault();
        try {
            addUser(usersFormData.name, usersFormData.age, usersFormData.password);
            showToast('success', `${usersFormData.name} has been added.`);
            setUsersFormData({ name: '', age: '' });
        } catch (error) {
            showToast('error', error);
        }
    };


    const handleSubmitProduct = (e) => {
        e.preventDefault();
        try {
            addProduct(productsFormData.name, productsFormData.details);
            showToast('success', `${productsFormData.name} has been added.`);
            setProductsFormData({ name: '', details: '' });
        } catch (error) {
            showToast('error', error);
        }
    };

    return (
        <div className='flex flex-wrap items-center justify-between gap-8 px-8 mb-8 lg-gap-0 lg:px-0'>
            <div className='w-full lg:w-5/12 '>
                <h2 className='text-center text-white'>Users</h2>
                <form className="flex flex-col max-w-md gap-3 mx-auto mt-6">
                    <Input
                        label="User Name"
                        value={usersFormData.name}
                        onChange={handleUserChange}
                        name='name'
                        placeholder='Enter name'
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={usersFormData.password}
                        onChange={handleUserChange}
                        name='password'
                        placeholder='Enter password'

                    />
                    <Input
                        label="Age"
                        type="number"
                        value={usersFormData.age}
                        onChange={handleUserChange}
                        name='age'
                        placeholder='Enter age'

                    />
                    <Button disabled={
                        !usersFormData.name ||
                        !usersFormData.age ||
                        !usersFormData.password
                    } onClick={handleSubmitUser} >
                        Add User
                    </Button>
                </form>
            </div>
            <div className='w-full lg:w-5/12 '>
                <h2 className='text-center text-white'>Products</h2>
                <form className="flex flex-col max-w-md gap-3 mx-auto mt-6">

                    <Input
                        label="Product Name"
                        value={productsFormData.name}
                        onChange={handleProductChange}
                        name='name'
                        placeholder='Enter name'
                    />

                    <Input
                        label="Product Details"
                        value={productsFormData.details}
                        onChange={handleProductChange}
                        name='details'
                        placeholder='Enter details'
                    />


                    <Button disabled={
                        !productsFormData.name ||
                        !productsFormData.details
                    } onClick={handleSubmitProduct}  >
                        Add Product
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;