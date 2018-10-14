
import { takeSnapshotAsync } from 'expo';
import * as React from 'react';
import { View } from 'react-native';
import { Story } from './story.component';
import { StoryStorage } from './story.storage';

export type Renderable = React.ComponentType | JSX.Element;
export type RenderFunction = () => Renderable | Renderable[];

export type StoryDecorator = (story: RenderFunction, context: { kind: string, story: string }) => Renderable | null;

export interface IStory {
    readonly kind: string;
    add(storyName: string, callback: RenderFunction): this;
    addDecorator(decorator: StoryDecorator): this;
}

export interface IStoriesProps {
    addDecorator(decorator: StoryDecorator): void;
    configure(fn: () => void, module: NodeModule): void;
    setAddon(addon: object): void;
    storiesOf(name: string, module: NodeModule): Story;
    storiesOf<T>(name: string, module: NodeModule): Story & T;
    forceReRender(): void;
}
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
