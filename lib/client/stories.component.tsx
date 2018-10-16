
import { RenderFunction, Story } from './story.component';
import { IStoriesOfOptions, StoryStorage } from './story.storage';

export function storiesOf(name: string, options: IStoriesOfOptions): Story {

    let getStory;
    try {
        getStory = StoryStorage.get(name).story;
    } catch (err) {
        getStory = new Story();
    }
    return StoryStorage.add(name, getStory, options);
}

// tslint:disable-next-line:no-identical-functions
export function CreateStory(
    detail: string,
    render: RenderFunction,
    options?: IStoriesOfOptions,
    overideStoryClassName?: string,
) {
    return (target: any) => {
        let getStory;
        try {
            getStory = StoryStorage.get(overideStoryClassName || target.name).story;
        } catch (err) {
            getStory = new Story();
        }

        const story = StoryStorage.add(
            overideStoryClassName || target.name,
            getStory,
            options);

        story.addDetail(detail, render);
    };
}

export function getStories() {
    return StoryStorage.getAll();
}
