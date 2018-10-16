import * as fs from 'fs-extra';
import * as gm from 'gm';
import { $log } from 'ts-log-debug';
class ImageServiceDef {

    public compare(path1: string, path2: string, diffPath: string, tolerance: number) {

        $log.debug(path1);
        return new Promise((resolve, reject) => {
            gm.compare(
                path1,
                path2,
                { file: diffPath, tolerance: tolerance / 100 },
                (err, isEqual) => {
                    if (err) {
                        reject(err);
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
