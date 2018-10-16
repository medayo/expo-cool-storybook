import SocketIOClient from 'socket.io-client';
class WebSocketDef {
    private socket: SocketIOClient.Socket;
    constructor() {
        // Creating the socket-client instance will automatically connect to the server.
        this.socket = SocketIOClient('http://192.168.1.102:3000/');
    }

    public emit(eventName: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.socket.on('compared', () => {
                this.socket.off('compared');
                resolve();
            });
            this.socket.emit(eventName, data);
        });
    }
}

export const WebsocketService = new WebSocketDef();
