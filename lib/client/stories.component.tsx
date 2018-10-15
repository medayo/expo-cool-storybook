
import { takeSnapshotAsync } from 'expo';
import * as React from 'react';
import { View } from 'react-native';
import { Story } from './story.component';
import { StoryStorage } from './story.storage';

export function storiesOf(name: any, module: any): Story {

    let getStory = StoryStorage.get(name);
    if (!getStory) {
        getStory = new Story();
    }
    return StoryStorage.add(name, getStory);
}

export function getStories() {
    return StoryStorage.getAll();
}
