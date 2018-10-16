import { Constants, takeSnapshotAsync } from 'expo';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { View } from 'react-native';
import '../../example/stories/text.story';
import { StoryStorage } from './story.storage';
import { WebsocketService } from './websocket.service';

@observer export class Snapshot extends React.Component<{}, {}> {
    @observable public dataURI: string;
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

    public takeSnapshot(): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const result = await takeSnapshotAsync(this.snapshotRef, {
                    format: 'png',
                    result: 'base64',
                });
                resolve(result);
            }, 250);
        });

    }
    private loaded(ref: any) {
        this.snapshotRef = ref;
        const stories = StoryStorage.getAll();
        Object.entries(stories).forEach(async ([key, value]) => {
            // tslint:disable-next-line:no-console
            console.log(key, value.storyInfo);

            for (const story of value.storyInfo) {
                this.storyComponent = story.callback();
                this.dataURI = await this.takeSnapshot();
                await WebsocketService.emit('imageSent', { image: this.dataURI, device: Constants.deviceName, story });
            }

        });

    }
}
