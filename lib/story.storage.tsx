
import { Story } from './story.component';
export class StoryStorageDef {

    private stories: any = {};

    public getAll(): Story[] {
        return this.stories;
    }

    public add(storyName: string, story: Story): Story {
        this.stories[storyName] = story;
        return this.stories[storyName];
    }

    public get(storyName: string): Story {
        return this.stories[storyName];
    }

}

export const StoryStorage = new StoryStorageDef();
