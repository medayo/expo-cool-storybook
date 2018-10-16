
import { takeSnapshotAsync } from 'expo';
import * as React from 'react';
import { View } from 'react-native';
import { Story } from './story.component';
import { IStoriesOfOptions, StoryStorage } from './story.storage';

export function storiesOf(name: any, options: IStoriesOfOptions): Story {

    let getStory;
    try {
        getStory = StoryStorage.get(name).story;
    } catch (err) {
        getStory = new Story();
    }
    return StoryStorage.add(name, getStory, options);
}

export function getStories() {
    return StoryStorage.getAll();
}
