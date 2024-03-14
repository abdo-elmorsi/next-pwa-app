import React, { useState, useEffect } from 'react';
import { deleteData as deleteUser, getAllData } from '../db/users';
import { deleteData as deleteProduct } from '../db/products';
import useToast from '../hooks/useToast';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/db';

const DataListComponent = () => {
    const { Toast, showToast } = useToast();
    const users = useLiveQuery(async () => await db.users.toArray()) || [];
    const products = useLiveQuery(async () => await db.products.toArray()) || [];
    console.log(users);
    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            showToast('success', 'Item has been deleted.');
        } catch (error) {
            showToast('error', error);
        }
    };
    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            showToast('success', 'Item has been deleted.');
        } catch (error) {
            showToast('error', error);
        }
    };

    return (
        <>
            <div className='flex flex-wrap items-center justify-between gap-8 px-8 pb-10 lg-gap-0 lg:px-0'>
                <div className=' w-full lg:w-5/12 border  h-[250px] overflow-auto'>
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
                                            onClick={() => handleDeleteUser(item.id)}
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
                <div className=' w-full lg:w-5/12 border  h-[250px] overflow-auto'>
                    <table className="min-w-full">
                        <thead className='sticky top-0 z-20 bg-gray-700'>
                            <tr>
                                <th className="px-4 py-2 font-semibold text-gray-200">Name</th>
                                <th className="px-4 py-2 font-semibold text-gray-200">Details</th>
                                <th className="px-4 py-2 font-semibold text-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-500">
                                    <td className="px-4 py-2 text-gray-200">{item.name}</td>
                                    <td className="px-4 py-2 text-gray-200">{item.details}</td>
                                    <td className="px-4 py-2 text-gray-200">
                                        <div>   <button
                                            onClick={() => handleDeleteProduct(item.id)}
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
            {Toast()}
        </>
    );
};

export default DataListComponent;