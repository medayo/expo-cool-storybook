
import { ConnectedSocket, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController } from 'socket-controllers';

@SocketController()
export class MessageController {

    @OnConnect()
    public connection(@ConnectedSocket() socket: any) {
        // tslint:disable-next-line:no-console
        console.log('client connected');
    }

    @OnDisconnect()
    public disconnect(@ConnectedSocket() socket: any) {
        // tslint:disable-next-line:no-console
        console.log('client disconnected');
    }

    @OnMessage('save')
    public save(@ConnectedSocket() socket: any, @MessageBody() message: any) {
        // tslint:disable-next-line:no-console
        console.log('received message:', message);
        // tslint:disable-next-line:no-console
        console.log('setting id to the message and sending it back to the client');
        message.id = 1;
        socket.emit('message_saved', message);
    }

}
