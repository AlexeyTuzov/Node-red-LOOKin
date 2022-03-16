import * as http from 'http';
import {ClientRequest} from 'http';

const httpRequest = async (IP: string, path: string): Promise<string> => {

    return new Promise( (resolve, reject) => {

            const req: ClientRequest = http.get({host: IP, path: path}, res => {

                let data: string = '';
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
                res.on('error', err => {
                    reject(console.log(err.stack));
                });
            });
            req.on('error', (err:any) => {
                reject(new Error(err.message));
            });
    });
}

export default httpRequest;
