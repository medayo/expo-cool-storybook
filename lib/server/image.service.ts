import * as fs from 'fs-extra';
import * as gm from 'gm';
import { $log } from 'ts-log-debug';
class ImageServiceDef {

    public compare(currentDir: string, referenceDir: string, diffDir: string, tolerance: number) {

        $log.debug(currentDir);
        return new Promise((resolve, reject) => {
            gm.compare(
                currentDir,
                referenceDir,
                { file: diffDir, tolerance: tolerance / 100, highlightStyle: 'Tint' },
                (err, isEqual) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (isEqual) {
                            fs.remove(diffDir);
                        }
                        resolve(isEqual);
                    }
                },
            );
        });
    }
}

export const ImageService = new ImageServiceDef();
