
import * as path from 'path';
import * as sanitize from 'sanitize-filename';
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
        @MessageBody() message: {
            image: string, imageType: string,
            device: string,
            story: { storyName: string },
            storyName: string,
        }) {

        const basePath = './coolstorybook/';

        $log.debug('received image');
        $log.debug('setting id to the message and sending it back to the client');

        const base64Data = message.image;

        // tslint:disable-next-line:max-line-length
        let fileTemplate = sanitize(`${message.device}-${message.storyName}-${message.story.storyName}`) + `.${message.imageType}`;

        fileTemplate = fileTemplate.toString()
            .replace(/ /g, '-');

        const saveCurrentPath = `${basePath}current/${fileTemplate}`;

        await FileService.writeFile(saveCurrentPath, base64Data, 'base64');

        FileService.createDir(
            path.resolve(`${basePath}diff/${fileTemplate}`),
        );

        try {
            await ImageService.compare(
                path.resolve(`${basePath}current/${fileTemplate}`),
                path.resolve(`${basePath}ref/${fileTemplate}`),
                path.resolve(`${basePath}diff/${fileTemplate}`),
                2,
            );
        } catch (err) {
            $log.error('gm error:', err);
            $log.debug('saving ref');
            await FileService.writeFile(`${basePath}ref/${fileTemplate}`,
                base64Data, 'base64');
        }

        return {
            received: true,
        };
    }

}
