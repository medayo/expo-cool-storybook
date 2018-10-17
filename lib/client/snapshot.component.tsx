import { Constants, takeSnapshotAsync } from 'expo';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { View } from 'react-native';
import { Story } from './story.component';
import { IStoriesOfOptions, StoryStorage } from './story.storage';
import { WebsocketService } from './websocket.service';

enum ImageType {
    png = 'png',
    jpg = 'jpg',
    jpeg = 'jpeg',
    webm = 'webm',
}

interface ICoolStoryBook {
    host: string;
}

@observer export class CoolStorybook extends React.Component<ICoolStoryBook, {}> {
    @observable private snapshot: { snapshot: string, type: string };
    @observable private storyComponent: React.ReactNode;
    @observable private snapshotRef: any;

    constructor(props: Readonly<ICoolStoryBook>) {
        super(props);
        WebsocketService.start(props.host);
        this.loaded = this.loaded.bind(this);
    }

    public render() {
        return (
            <View style={{ position: 'absolute', zIndex: -9999, top: -9999 }} ref={this.loaded}>
                {this.storyComponent}
            </View>
        );
    }

    public async sendAllStories() {
        const stories = StoryStorage.getAll();
        for (const [key, detail] of Object.entries(stories)) {
            await this.sendStory(detail, key);
        }
    }

    public async sendStory(detail: { story: Story; options: IStoriesOfOptions; }, key: string) {
        for (const story of detail.story.storyInfo) {
            this.storyComponent = story.callback();
            this.snapshot = await this.takeSnapshot(detail.options.transparent ? ImageType.png : ImageType.jpg);
            await WebsocketService.emit('imageSent', {
                device: Constants.deviceName,
                image: this.snapshot.snapshot,
                imageType: this.snapshot.type,
                story,
                storyName: key,
            });
        }
    }

    private takeSnapshot(type: ImageType = ImageType.png):
        Promise<{ snapshot: string, type: string }> {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const result = await takeSnapshotAsync(this.snapshotRef, {
                    format: type,
                    result: 'base64',
                });
                resolve({ snapshot: result, type });
            }, 50);
        });

    }

    private loaded(ref: any) {
        this.snapshotRef = ref;
    }
}
