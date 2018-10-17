import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from '../../lib/client';
import { PhoneSizeTypes } from '../../lib/client/story.storage';

storiesOf('Circlebutton', { transparent: false })
    .addDetail('with Text', () =>
        <Text>James</Text>,
        { style: PhoneSizeTypes.PhoneCentered },
    )
    .addDetail('with Text 2', () =>
        <Text>Cool</Text>,
    );
