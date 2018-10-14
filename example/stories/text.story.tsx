import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from '../../lib/';

storiesOf('Circlebutton', module)
    .add('with Text', () =>
        <Text>gogogo</Text>,

    )
    .add('with Text 2', () =>
        <Text>This is text2</Text>,
    );
