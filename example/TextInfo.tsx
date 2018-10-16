import React from 'react';
import { Text, View } from 'react-native';
import { CoolStorybookService } from '../lib/client/snapshot.service';
import { CreateStory } from '../lib/client/stories.component';

@CreateStory('This says gogogo5',
    () => <TextInfo>testing</TextInfo>,
    { transparent: false })
export class TextInfo extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        CreateStory('This was the render', this.render, {}, 'TextInfo');
        CoolStorybookService.sendStory('TextInfo');
        CoolStorybookService.sendAllStories();
    }
    public render() {
        return (
            <Text>{this.props.children}</Text>
        );
    }
}
