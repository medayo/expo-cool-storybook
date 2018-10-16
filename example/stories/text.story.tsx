import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from '../../lib/client';

storiesOf('Circlebutton', module)
    .add('with Text', () =>
        <Text>cool story</Text>,

    )
    .add('with Text 2', () =>
        <Text>This is text212121221</Text>,
    );
