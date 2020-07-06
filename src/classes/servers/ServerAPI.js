import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import minify from 'express-minify';
import { ApolloServer } from 'apollo-server-express';
import BullBoard from 'bull-board';
import Queue from '../models/Queue';

import { PORT, ROUTE, isDevelopment, LINK_IMAGES } from '../../config/server';
import { PATH_IMAGES, PATH_VIDEOS, PATH_MATERIAL, PATH_PUBLIC } from '../../config/paths';
import schema from '../../graphql/schema';
import Token from '../models/Token';
import typeDefs from '../../graphql/typeDefs';
import resolvers from '../../graphql/resolvers';
import { configMulter, multer } from '../../config/multer';
import AuthController from '../controllers/AuthController';


const classToken = Token();

const getToken = (authorization) => {
    try {
        return classToken.getTokenAccess(authorization);
    } catch (error) { }
    return null;
}

const classAuthController = AuthController();

const app = express();

const pathServer = '/';

app.use(helmet());
app.use(minify());
app.use(express.json());

if (!isDevelopment) {
    app.get(`${ROUTE.GRAPHQL}`, (req, res) => res.send('Not found!'));
    app.use(cors({
        origin: [
            'https://dashboard.rbernardes.com.br', 'https://www.dashboard.rbernardes.com.br',
            'https://ead.rbernardes.com.br', 'https://www.ead.rbernardes.com.br',
            'https://api.rbernardes.com.br', 'https://www.api.rbernardes.com.br',
            'https://rbernardes.com.br', 'https://www.rbernardes.com.br',
        ],
        /* methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
        credentials: true,
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "authorization"] */
    }));
} else {
    app.use(cors());
}

app.use(ROUTE.ADMIN_QUEUES, BullBoard.UI);

app.use(express.static(PATH_PUBLIC));
app.use(ROUTE.IMAGE, express.static(PATH_IMAGES));
app.use(ROUTE.MATERIAL, express.static(PATH_MATERIAL));
app.use(ROUTE.VIDEO, express.static(PATH_VIDEOS));

BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.post(ROUTE.UPLOAD, multer(configMulter).single('upload'), (request, response) => {
    try {
        const token = request.query.token;
        if (token) {
            const validated = classToken.verify(token);
            if (validated && response && response.req && response.req.file) {
                const file = response.req.file;
                return response.json({
                    uploaded: true,
                    url: LINK_IMAGES + file.key
                });
            }
        }
    } catch (error) { }

    return response.json({
        uploaded: false,
        message: "Error to upload file!"
    });
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schema,
    introspection: isDevelopment,
    playground: isDevelopment,
    subscriptions: {
        path: pathServer,
        onConnect: ({ authorization = null } = {}, webSocket, context) => {
            const tokenUser = getToken(authorization) || {};
            /* 
            if(tokenUser){
                const { adminId = null, studentId = null } = tokenUser;
                if(adminId){
                    console.log(`Administrador(${adminId}) - CONNECTED`);
                }
                if(studentId){
                    console.log(`Estudante(${studentId}) - CONNECTED`);
                }
            }
             */
            return {
                tokenUser,
            };
        },
        onDisconnect: (webSocket, context) => {
            //console.log("DESCONNECTED");
        },
    },
    context: ({ req, connection }) => {
        if (connection && connection.context) {
            return connection.context;
        }
        return ({
            tokenUser: getToken(req.headers['authorization'] || null) || {},
        });
    }
});

const httpServer = http.createServer(app);
server.applyMiddleware({ app, path: pathServer });
server.installSubscriptionHandlers(httpServer);

const start = () => {
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
        console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
    });
}

export const ServerAPI = () => ({
    start,
});

export default ServerAPI;