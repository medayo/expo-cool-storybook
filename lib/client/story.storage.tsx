
import { Story } from './story.component';

export interface IStoriesOfOptions {
    transparent?: boolean;
}

export class StoryStorageDef {

    private stories: any = {};

    public getAll(): Array<{
        story: Story,
        options: IStoriesOfOptions,
    }> {
        return this.stories;
    }

    public add(storyName: string, story: Story, options: IStoriesOfOptions): Story {
        this.stories[storyName] = { story, options };

        return this.stories[storyName].story;
    }

    public get(storyName: string): {
        story: Story,
        options: IStoriesOfOptions,
    } {
        return this.stories[storyName];
    }

}

export const StoryStorage = new StoryStorageDef();
