import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dir = './uploads/images';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;
    cb(null, filename);
  }
});

export const upload = multer({ storage });
