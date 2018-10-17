import { PhoneSizeTypes } from './story.storage';

export type Renderable = React.ComponentType | JSX.Element;
export type RenderFunction = () => Renderable | Renderable[];

export class Story {

    public storyInfo: Array<{
        storyName: string,
        options: { style: PhoneSizeTypes },
        callback: RenderFunction,
    }> = [];

    public addDetail(storyName: string, callback: RenderFunction, options?: { style: PhoneSizeTypes }): this {
        this.storyInfo.push({
            callback,
            options,
            storyName,
        });
        return this;

    }
}
