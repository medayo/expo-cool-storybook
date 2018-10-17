import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from '../../lib/client';

storiesOf('Circlebutton', { transparent: false })
    .addDetail('with Text', () =>
        <Text>James</Text>,

    )
    .addDetail('with Text 2', () =>
        <Text>This is text212121221</Text>,
    );
