import db, { closeDB } from './db';

export const insertData = async (name, details) => {
    try {
        await db.products.add({ name, details });
        closeDB()
        return null;
    } catch (error) {
        throw new Error(`Error inserting data: ${error}`);
    }
};

export const getAllData = async () => {
    try {
        const products = await db.products.toArray();
        closeDB()
        return products;
    } catch (error) {
        throw new Error(`Error getting data: ${error}`);
    }
};

export const updateData = async (id, name, details) => {
    try {
        await db.products.update(id, { name, details });
        closeDB()
        return null;
    } catch (error) {
        throw new Error(`Error updating data: ${error}`);
    }
};

export const deleteData = async (id) => {
    try {
        await db.products.delete(id);
        closeDB()
        return null;
    } catch (error) {
        throw new Error(`Error deleting data: ${error}`);
    }
};

export const getById = async (id) => {
    try {
        const data = await db.products.get(id);
        closeDB()
        return data;
    } catch (error) {
        throw new Error(`Error getting data by id: ${error}`);
    }
};