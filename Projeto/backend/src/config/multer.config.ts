import multer from 'multer';

export const videoStorage = multer({
    dest: 'temp',
});