import { Router } from 'express';
import ApiKey from '../models/ApiKey';

const router = Router();

// Create a new API key
router.post('/', async (req, res) => {
  try {
    const { keycode, userId } = req.body;

    if (!keycode || !userId) {
      return res.status(400).json({ error: 'Key and userId are required' });
    }

    const newApiKey = await ApiKey.create({ keycode, userId });
    res.status(201).json(newApiKey);
  } catch (error) {
    console.error('Error creating API key:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get an API key by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const apiKey = await ApiKey.findByPk(id);

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    res.json(apiKey);
  } catch (error) {
    console.error('Error retrieving API key:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all API keys
router.get('/', async (req, res) => {
  try {
    const apiKeys = await ApiKey.findAll();
    res.json(apiKeys);
  } catch (error) {
    console.error('Error retrieving API keys:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an API key by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { keycode, userId } = req.body;

    const apiKey = await ApiKey.findByPk(id);

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    await apiKey.update({ keycode, userId });
    res.json(apiKey);
  } catch (error) {
    console.error('Error updating API key:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an API key by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const apiKey = await ApiKey.findByPk(id);

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    await apiKey.destroy();
    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting API key:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
