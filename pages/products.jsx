import React, { useEffect, useState } from 'react';
import { Button, Input } from '../components';
import useToast from '../hooks/useToast';
import { getAllProducts, createProduct, deleteProduct } from '../db/products';

const defaultData = { name: '', details: '' };
const Products = () => {
  const { Toast, showToast } = useToast();

  const [products, setProducts] = useState([]);
  const [data, setData] = useState(defaultData);
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const resetForm = () => {
    setData(defaultData)
  }


  const getProducts = async () => {
    const products = await getAllProducts();
    setProducts(products);
    return;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createProduct(data.name, data.details);
      showToast('success', `${data.name} has been added.`);
      resetForm();
      getProducts();
    } catch (error) {
      showToast('error', error);
    }
  }


  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      showToast('success', 'Item has been deleted.');
      getProducts();
    } catch (error) {
      showToast('error', error);
    }
  };


  useEffect(() => {
    getProducts();
  }, [])

  return (
    <>
      <div className='flex flex-col items-center h-screen gap-10 px-24 lg:gap-48 lg:flex-row'>
        <div className='flex-1 w-full'>
          <h2 className='text-center text-white'>Products</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-auto mt-6">
            <Input
              label="Product Name"
              value={data.name}
              onChange={handleChange}
              name='name'
              placeholder='Enter name'
            />

            <Input
              label="Details"
              value={data.details}
              onChange={handleChange}
              name='details'
              placeholder='Enter details'

            />
            <Button type='submit' disabled={
              !data?.name ||
              !data?.details
            }  >
              Add Products
            </Button>
          </form>
        </div>





        <div className='flex-1 w-full'>

          <div className=' border  h-[250px] overflow-auto'>
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

export default Products;