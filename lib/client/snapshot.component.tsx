import { Constants, takeSnapshotAsync } from 'expo';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { View } from 'react-native';
import '../../example/stories/text.story';
import { StoryStorage } from './story.storage';
import { WebsocketService } from './websocket.service';

enum ImageType {
    png = 'png',
    jpg = 'jpg',
    jpeg = 'jpeg',
    webm = 'webm',
}

@observer export class Snapshot extends React.Component<{}, {}> {
    @observable public snapshot: { snapshot: string, type: string };
    @observable private storyComponent: React.ReactNode;
    @observable private snapshotRef: any;

    constructor(props: Readonly<{}>) {
        super(props);
        this.loaded = this.loaded.bind(this);
    }

    public render() {
        return (
            <View style={{ position: 'absolute' }} ref={this.loaded}>
                {this.storyComponent}
            </View>
        );
    }

    public takeSnapshot(type: ImageType = ImageType.png):
        Promise<{ snapshot: string, type: string }> {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const result = await takeSnapshotAsync(this.snapshotRef, {
                    format: type,
                    result: 'base64',
                });
                resolve({ snapshot: result, type });
            }, 250);
        });

    }
    private loaded(ref: any) {
        this.snapshotRef = ref;
        const stories = StoryStorage.getAll();
        Object.entries(stories).forEach(async ([key, detail]) => {
            // tslint:disable-next-line:no-console
            console.log(key, detail);

            for (const story of detail.story.storyInfo) {
                this.storyComponent = story.callback();
                this.snapshot = await this.takeSnapshot(detail.options.transparent ? ImageType.png : ImageType.jpg);
                await WebsocketService.emit('imageSent', {
                    device: Constants.deviceName,
                    image: this.snapshot.snapshot,
                    imageType: this.snapshot.type,
                    story,
                });
            }

        });

    }
}
