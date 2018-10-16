
import * as path from 'path';
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
import { FileService } from './file.service';
import { ImageService } from './image.service';

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

    @OnMessage('imageSent')
    @EmitOnSuccess('compared')
    public async imageSave(
        @ConnectedSocket() socket: any,
        @MessageBody() message: { image: string, device: string, story: { storyName: string } }) {
        $log.debug('received message', message.story);
        $log.debug('setting id to the message and sending it back to the client');

        const base64Data = message.image.replace(/^data:image\/png;base64,/, '');

        const saveCurrentPath = `./test/current/${message.device}-${message.story.storyName}.png`;

        await FileService.writeFile(saveCurrentPath, base64Data, 'base64');

        FileService.createDir(path.resolve(`./test/diff/${message.device}-${message.story.storyName}.png`));

        try {
            await ImageService.compare(
                path.resolve(`./test/current/${message.device}-${message.story.storyName}.png`),
                path.resolve(`./test/ref/${message.device}-${message.story.storyName}.png`),
                path.resolve(`./test/diff/${message.device}-${message.story.storyName}.png`),
                0.02,
            );
        } catch (err) {
            $log.error('gm error:', err);
            $log.debug('saving ref');
            await FileService.writeFile(`./test/ref/${message.device}-${message.story.storyName}.png`,
                base64Data, 'base64');
        }

        return {
            received: true,
        };
    }

}
