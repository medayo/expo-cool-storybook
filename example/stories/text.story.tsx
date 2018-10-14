import React from 'react';
import { Text, View } from 'react-native';
import { getStories, storiesOf } from '../../lib/stories.component';

storiesOf('Circlebutton', module)
    .add('with white Text', () =>
        <Text>gogogo</Text>,

    )
    .add('with white Text2', () =>
        <Text>gogogo2</Text>,
    );

// tslint:disable-next-line:no-console
console.log(getStories());
