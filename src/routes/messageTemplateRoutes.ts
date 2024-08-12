import { Router } from 'express';
import MessageTemplate from '../models/MessageTemplate';

const router = Router();

// Route to create a new message template
router.post('/', async (req, res) => {
  try {
    const { title, content, messageCategory, userId } = req.body;

    if (!title || !content || !messageCategory || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newTemplate = await MessageTemplate.create({ title, content, messageCategory, userId });
    res.status(201).json(newTemplate);
  } catch (error) {
    console.error('Error creating message template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update a message template by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, messageCategory, userId } = req.body;

    const template = await MessageTemplate.findByPk(id);

    if (!template) {
      return res.status(404).json({ error: 'Message template not found' });
    }

    await template.update({ title, content, messageCategory, userId });
    res.json(template);
  } catch (error) {
    console.error('Error updating message template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a message template by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const template = await MessageTemplate.findByPk(id);

    if (!template) {
      return res.status(404).json({ error: 'Message template not found' });
    }

    await template.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting message template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get a message template by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const template = await MessageTemplate.findByPk(id);

    if (!template) {
      return res.status(404).json({ error: 'Message template not found' });
    }

    res.json(template);
  } catch (error) {
    console.error('Error retrieving message template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all message templates
router.get('/', async (req, res) => {
  try {
    const templates = await MessageTemplate.findAll();
    res.json(templates);
  } catch (error) {
    console.error('Error retrieving message templates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all message templates by userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const templates = await MessageTemplate.findAll({
      where: { userId },
    });

    if (templates.length === 0) {
      return res.status(404).json({ error: 'No message templates found for this userId' });
    }

    res.json(templates);
  } catch (error) {
    console.error('Error retrieving message templates by userId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
