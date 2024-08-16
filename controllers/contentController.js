import Content from '../models/Content.js';

export const createContent = async (req, res) => {
    const { title, body, scheduledFor } = req.body;
    try {
        const content = new Content({
            title,
            body,
            author: req.user.id,
            scheduledFor,
        });
        await content.save();
        res.status(201).json({ message: 'Content created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Content creation failed' });
    }
};