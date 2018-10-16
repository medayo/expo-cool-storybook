
import {
    ConnectedSocket,
    EmitOnSuccess,
    MessageBody,
    OnConnect,
    OnDisconnect,
    OnMessage,
    SocketController,
} from 'socket-controllers';
import { $log } from 'ts-log-debug';

@SocketController()
export class WebsocketService {

    @OnConnect()
    public connection(@ConnectedSocket() socket: any) {
        $log.debug('client connected');
    }

    @OnDisconnect()
    public disconnect(@ConnectedSocket() socket: any) {
        $log.debug('client disconnected');
    }

    @OnMessage('save')
    @EmitOnSuccess('cool')
    public save(@ConnectedSocket() socket: any, @MessageBody() message: any) {
        $log.debug('received message:', message);
        $log.debug('setting id to the message and sending it back to the client');
        return {
            id: 1,
            text: 'new message',
        };
    }

}
