import { CoolStorybook } from './snapshot.component';
import { StoryStorage } from './story.storage';

class CoolStorybookServiceDef {
    private ref: CoolStorybook;

    public setRef(ref: CoolStorybook) {
        this.ref = ref;
    }

    public sendAllStories() {
        this.ref.sendAllStories();
    }

    public sendStory(storyName: string) {
        const story = StoryStorage.get(storyName);
        this.ref.sendStory(story, storyName);
    }

}

export const CoolStorybookService = new CoolStorybookServiceDef();
