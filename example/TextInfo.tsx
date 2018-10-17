import React from 'react';
import { Text, View } from 'react-native';
import { CoolStorybookService } from '../lib/client/snapshot.service';
import { addStoriesOf, CreateStory } from '../lib/client/stories.component';
import { PhoneSizeTypes } from '../lib/client/story.storage';

interface ITextInfo {
    children: string;
}

@CreateStory('This tests the component with text "Expo is awesome"',
    () => <ExampleText>Expo is awesome</ExampleText>,
    { style: PhoneSizeTypes.PhoneCentered })
export class ExampleText extends React.Component<ITextInfo, any> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        addStoriesOf('ExampleText',
            'This was the render of: ' + this.props.children,
            () => this.render(),
            { style: PhoneSizeTypes.PhoneDimensions },
        );
    }

    public render() {
        return (
            <Text>{this.props.children}</Text>
        );
    }
}
