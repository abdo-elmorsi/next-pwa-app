import db, { closeDB } from './db';

export const insertData = async (name, age) => {
    try {
        await db.users.add({ name, age: Number(age) });
        closeDB()
        return null;
    } catch (error) {
        throw new Error(`Error inserting data: ${error}`);
    }
};

export const getAllData = async () => {
    try {
        const users = await db.users.toArray();
        closeDB()
        return users;
    } catch (error) {
        throw new Error(`Error getting data: ${error}`);
    }
};

export const updateData = async (id, name, age) => {
    try {
        await db.users.update(id, { name, age: Number(age) });
        closeDB()
        return null;
    } catch (error) {
        throw new Error(`Error updating data: ${error}`);
    }
};

export const deleteData = async (id) => {
    try {
        await db.users.delete(id);
        closeDB()
        return null;
    } catch (error) {
        throw new Error(`Error deleting data: ${error}`);
    }
};

export const getById = async (id) => {
    try {
        const data = await db.users.get(id);
        closeDB()
        return data;
    } catch (error) {
        throw new Error(`Error getting data by id: ${error}`);
    }
};