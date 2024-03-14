import Dexie from 'dexie';

const db = new Dexie('MyDatabase');
db.version(1).stores({
    users: '++id, name, password, age',
    products: '++id, name, details',
});
export const closeDB = () => {
    return null;
    db.close();
}
export default db;