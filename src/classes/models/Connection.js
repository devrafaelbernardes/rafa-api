import database from '../../database/connection';

const Connection = () => ({
    getConnection: () => database,
});
const instance = Connection;
Object.freeze(instance);
export default instance;