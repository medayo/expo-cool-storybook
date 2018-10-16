import * as fs from 'fs-extra';
import * as gm from 'gm';
class ImageServiceDef {

    public compare(path1: string, path2: string, diffPath: string, tolerance: number) {
        return new Promise((resolve, reject) => {
            gm.compare(
                path1,
                path2,
                { file: diffPath, tolerance: tolerance / 100 },
                (err, isEqual) => {
                    if (err) {
                        if (typeof err === 'string') {
                            reject(new Error(err));
                        } else {
                            reject(err);
                        }
                    } else {
                        if (isEqual) {
                            fs.remove(diffPath);
                        }
                        resolve(isEqual);
                    }
                },
            );
        });
    }
}

export const ImageService = new ImageServiceDef();
