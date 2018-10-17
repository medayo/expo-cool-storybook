import SocketIOClient from 'socket.io-client';
class WebSocketDef {
    private socket: SocketIOClient.Socket;

    public start(host: string): any {
        this.socket = SocketIOClient(host);
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
