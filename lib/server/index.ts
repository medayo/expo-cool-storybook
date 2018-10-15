import 'es6-shim';
import * as Express from 'express';
import * as http from 'http';
import 'reflect-metadata';
import { useSocketServer } from 'socket-controllers';
import * as socketServer from 'socket.io';
import './websocket';

const app = Express();
const server = new http.Server(app);
const io = socketServer(server);
class WebsocketServerDef {

    public start(port = 3001) {
        server.listen(port);

        app.get('/', (req: any, res: any) => {
            res.send('hello express');
        });

        io.use((socket: any, next: () => void) => {
            next();
        });
        useSocketServer(io);
    }

}

export const WebsocketServer = new WebsocketServerDef();
