import * as React from 'react';
import { View } from 'react-native';
import { Snapshot } from '../lib/client/snapshot.component';

export class DemoApp extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        return (
            <Snapshot />
        );
    }
}
