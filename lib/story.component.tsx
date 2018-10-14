export type Renderable = React.ComponentType | JSX.Element;
export type RenderFunction = () => Renderable | Renderable[];

export class Story {

    public storyInfo: Array<{ storyName: string, callback: RenderFunction }> = [];

    public add(storyName: string, callback: RenderFunction): this {
        this.storyInfo.push({
            callback,
            storyName,
        });
        return this;

    }
}
