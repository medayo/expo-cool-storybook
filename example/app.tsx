import * as React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { CoolStorybook } from '../lib/client/snapshot.component';
import { CoolStorybookService } from '../lib/client/snapshot.service';
import './stories/text.story';
import { ExampleText } from './TextInfo';

const container: ViewStyle = {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
};
export class DemoApp extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.sendStories = this.sendStories.bind(this);
    }

    public componentDidMount() {
        this.sendStories();
    }
    public render() {

        return (
            <View style={{ flex: 1 }}>
                <CoolStorybook
                    host='http://192.168.1.212:3001'
                    ref={(ref) => CoolStorybookService.setRef(ref)}
                />
                <View style={container}>
                    <ExampleText>This is a demo of Expo-Cool-Storybook</ExampleText>
                    <TouchableOpacity onPress={this.sendStories}>
                        <ExampleText>Tap here to recapture and send!</ExampleText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    private sendStories() {
        CoolStorybookService.sendAllStories();
    }
}
