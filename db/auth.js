import db, { closeDB } from './db';
import { verifyPassword } from './utils/index.js';


export const userLogin = async ({ name, password }) => {
    try {
        const user = await db.users.get({ name });
        if (!user) {
            throw new Error(`User Not Found`);
        }
        const isCorrectPassword = verifyPassword(password, user.password);
        if (!isCorrectPassword) {
            throw new Error(`Incorrect Password`);
        }

        closeDB();
        return { name: user.name, age: user.age, id: user.id };
    } catch (error) {
        throw error;
    }
};
