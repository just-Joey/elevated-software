const prisma = require('../services/prismaClient')
async function handleContact(req, res) {
    try {
        const { name, email, business, message } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }
        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                business,
                message,
            },
        });

        res.json({ success: true, contact });
    } catch (error) {
        console.error('Error handling contact form submission:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}

module.exports = { handleContact };