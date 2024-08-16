import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    scheduledFor: { type: Date, default: Date.now },
});

const Content = mongoose.model('Content', ContentSchema);
export default Content;