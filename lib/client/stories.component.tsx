
import { RenderFunction, Story } from './story.component';
import { IStoriesOfOptions, PhoneSizeTypes, StoryStorage } from './story.storage';

export function storiesOf(
    storyName: string,
    options: IStoriesOfOptions): Story {

    let getStory;
    try {
        getStory = StoryStorage.get(storyName).story;
    } catch (err) {
        getStory = new Story();
    }
    return StoryStorage.add(storyName, getStory, options);
}

export function addStoriesOf(
    storyName: string,
    detailOfStory: string,
    render: RenderFunction,
    options?: { style: PhoneSizeTypes },
) {

    const story = storiesOf(
        storyName,
        {});

    story.addDetail(detailOfStory, render, options);
}

// tslint:disable-next-line:no-identical-functions
export function CreateStory(
    detailOfStory: string,
    render: RenderFunction,
    options?: { style: PhoneSizeTypes },
    overideStoryClassName?: string,
) {
    return (target: any) => {
        addStoriesOf(
            overideStoryClassName || target.name,
            detailOfStory,
            render,
            options);
    };
}

export function getStories() {
    return StoryStorage.getAll();
}
