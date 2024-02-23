import Dexie from 'dexie';

const db = new Dexie('MyDatabase');
db.version(1).stores({
    users: '++id, name, age',
    products: '++id, name, details',
});
export const closeDB = () => {
    console.log("closed");
    // db.close();
}
export default db;