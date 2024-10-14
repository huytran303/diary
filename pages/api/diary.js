import { DiaryEntry } from '../../db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { content, date } = req.body;
        try {
            const newEntry = await DiaryEntry.create({ content, date });
            res.status(201).json(newEntry);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create entry' });
        }
    } else if (req.method === 'GET') {
        try {
            const entries = await DiaryEntry.findAll();
            res.status(200).json(entries);
        } catch (error) {
            res.status(400).json({ error: 'Failed to fetch entries' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
