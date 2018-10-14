# Expo Cool Storybook (WIP)

Visual Regression Testing for Expo projects.

## Whats the problem

Have you ever used Storybook? It's fantastic, however, it is not the best with React Native. Loki is a tool that will work with Storybook to navigate through your components and take a screenshot of the component (that is on screen).

Few of issues:

- CI is not scalable with this approach.
- Expo has a very nice splash screen in which CI can't tap/click on the wizard. *:-( Sadtimes*
- It's very slow to spin up indivial phones and visual regression all of them.
- It's hard to setup everything unless you know what you are doing

Don't worry thought Expo "Cool Storybook" is here to npm your way into your project!

Install: 

> npm install expo-cool-storybook

Add ```    <Snapshot />``` to the start of your app:

```javascript
import * as React from 'react';
import { View } from 'react-native';
import { Snapshot } from 'expo-cool-storybook';

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
```

Write a story: 

```javascript
import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from 'expo-cool-storybook';

storiesOf('Text')
    .add('with white Text', () =>
        <Text>gogogo</Text>,

    )
    .add('with white Text2', () =>
        <Text>gogogo2</Text>,
    );

```

### Still working out the detail but the idea is below

Once we have complete the capture, images will be stored in a story folder for you to see differences. Will probably add config for phone support in the package.json.

More soon...
