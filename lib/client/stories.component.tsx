
import { RenderFunction, Story } from './story.component';
import { IStoriesOfOptions, StoryStorage } from './story.storage';

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
    options?: IStoriesOfOptions,
) {

    const story = storiesOf(
        storyName,
        options);

    story.addDetail(detailOfStory, render);
}

// tslint:disable-next-line:no-identical-functions
export function CreateStory(
    detailOfStory: string,
    render: RenderFunction,
    options?: IStoriesOfOptions,
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
