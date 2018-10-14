import { takeSnapshotAsync } from 'expo';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { View } from 'react-native';
import '../example/stories/text.story';
import { StoryStorage } from './story.storage';

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
            <View ref={this.loaded}>
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
            }, 2000);
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
                // tslint:disable-next-line:no-console
                console.log(this.dataURI);
            }

        });

    }
}
