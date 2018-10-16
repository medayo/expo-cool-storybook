import SocketIOClient from 'socket.io-client';
class WebSocketDef {
    public socket: SocketIOClient.Socket;
    constructor() {

        // Creating the socket-client instance will automatically connect to the server.
        this.socket = SocketIOClient('http://192.168.1.102:3000/');
        this.socket.on('disconnect', () => {
            console.log('Disconnected from web socket');
        });
        this.socket.on('error', (error: any) => {
            console.log('Error from web socket: ', error);
        });
    }

    public emit(eventName: string, data: any): Promise<any> {
        console.log(eventName);
        return new Promise((resolve, reject) => {

            this.socket.on('compared', () => {
                console.log('Awesome, got it');
                this.socket.off('compared');
                resolve();
            });

            this.socket.emit(eventName, data);

        });

    }

}

export const WebsocketService = new WebSocketDef();
