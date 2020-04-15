import resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './typeDefs';

export default makeExecutableSchema({ 
    typeDefs, 
    resolvers 
});