import React from 'react';
import dynamic from 'next/dynamic';

const FormComponent = dynamic(() => import('../components/FormComponent'));
const DataListComponent = dynamic(() => import('../components/DataListComponent'));

const App = () => {

  return (
    <div className='bg-gray-600'>
      <div className='container min-h-screen pt-16 mx-auto'>
        <h1 className='text-3xl font-bold text-center text-white'>IndexedDB CRUD Application</h1>
        <FormComponent />
        <DataListComponent />
      </div>
    </div>
  );
};

export default App;