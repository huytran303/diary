export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { content, date } = req.body;
        try {
            const newEntry = await DiaryEntry.create({ content, date });
            res.status(201).json(newEntry);
        } catch (error) {
            console.error('Error creating entry:', error.message); // Ghi log chi tiết lỗi
            res.status(400).json({ error: error.message || 'Failed to create entry' });
        }
    } else if (req.method === 'GET') {
        try {
            const entries = await DiaryEntry.findAll();
            res.status(200).json(entries);
        } catch (error) {
            console.error('Error fetching entries:', error.message); // Ghi log chi tiết lỗi
            res.status(400).json({ error: error.message || 'Failed to fetch entries' });
        }
    }
}
