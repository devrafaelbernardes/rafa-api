import knexfile from '../../knexfile';
import lib_knex from 'knex';
const knex = lib_knex(knexfile);
export default knex;