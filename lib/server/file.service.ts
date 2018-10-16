import * as fs from 'fs-extra';
import { dirname } from 'path';

class FileServiceDef {
    public readFile(path: string, opts = 'utf8') {
        return new Promise((resolve, reject) => {
            fs.readFile(path, opts, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }

    public writeFile(path: string, data: any, opts = 'utf8') {
        return new Promise((resolve, reject) => {
            fs.mkdirp(dirname(path), (errMk) => {
                if (errMk) {
                    reject(errMk);
                }
                fs.writeFile(path, data, opts, (err) => {
                    if (err) { reject(err); }
                    else { resolve(); }
                });
            });
        });
    }
}

export const FileService = new FileServiceDef();
