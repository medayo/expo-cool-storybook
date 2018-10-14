import { IStory, RenderFunction, StoryDecorator } from './stories.component';
import { StoryStorage } from './story.storage';

export class Story {
    public storyInfo: Array<{ storyName: string, callback: RenderFunction }> = [];

    public add(storyName: string, callback: RenderFunction): this {
        this.storyInfo.push({
            callback,
            storyName,
        });
        return this;

    }
    public addDecorator(decorator: StoryDecorator): this {
        throw new Error('Method not implemented.');
    }
}
