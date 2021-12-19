import { extname } from 'path';

export const imageFileFilter = (req: any, file: any, callback: any) => {
    // if (!file.mimetype.match(/\.(jpg|jpeg|png|gif)$/)) {
    if (!file.mimetype.match(/image.*/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req: any, file: any, callback: any) => {
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 50; i++) {
        text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }

    let fileName = date+'.'+text;
    let fileExtName = file.mimetype.split('/')[1];

    const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
    callback(null, `${fileName}.${randomName}.${fileExtName}`);
};
