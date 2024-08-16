import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const s3 = new S3Client({ region: process.env.AWS_REGION });
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMedia = upload.single('file');

export const uploadToS3 = async (req, res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}_${path.basename(req.file.originalname)}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read',
    };

    try {
        const data = await s3.upload(params).promise();
        res.status(200).json({ url: data.Location });
    } catch (error) {
        res.status(500).json({ error: 'Media upload failed' });
    }
};