import * as React from 'react';
import { View } from 'react-native';
import { CoolStorybook } from '../lib/client/snapshot.component';
import { CoolStorybookService } from '../lib/client/snapshot.service';
import './stories/text.story';
import { TextInfo } from './TextInfo';

export class DemoApp extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        return (
            <View>
                <CoolStorybook ref={(ref) => CoolStorybookService.setRef(ref)} />
                <TextInfo>gogogo</TextInfo>
            </View>
        );
    }
}
