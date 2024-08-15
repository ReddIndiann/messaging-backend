import { Router } from 'express';
import Sender from '../models/Sender';
import User from '../models/User'; // Import the User model

const router = Router();

// Route to create a new sender
router.post('/', async (req, res) => {
  try {
    const { name, userId, purpose } = req.body;

    if (!name || !userId || !purpose) {
      return res.status(400).json({ error: 'Name, purpose, and userId are required' });
    }

    // Validate that the userId exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new Sender with default status 'pending'
    const newSender = await Sender.create({ name, userId, purpose });
    res.status(201).json(newSender);
  } catch (error) {
    console.error('Error creating sender:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update a sender by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, userId, status, purpose } = req.body;

    // Find the sender by ID
    const sender = await Sender.findByPk(id);

    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    // If userId is being updated, validate that the new userId exists
    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    // Update the sender's details
    await sender.update({ name, userId, status, purpose });
    res.json(sender);
  } catch (error) {
    console.error('Error updating sender:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a sender by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the sender by ID
    const sender = await Sender.findByPk(id);

    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    // Delete the sender
    await sender.destroy();
    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting sender:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get a sender by ID, including the related User data
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the sender by ID and include the associated User
    const sender = await Sender.findByPk(id, {
      include: [{ model: User, as: 'user' }] // Include the User data
    });

    if (!sender) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    res.json(sender);
  } catch (error) {
    console.error('Error retrieving sender:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all senders, including the related User data
router.get('/', async (req, res) => {
  try {
    const senders = await Sender.findAll({
      include: [{ model: User, as: 'user' }] // Include the User data
    });
    res.json(senders);
  } catch (error) {
    console.error('Error retrieving senders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all senders by userId, including the related User data
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all senders with the specified userId and include the associated User
    const senders = await Sender.findAll({
      where: { userId },
      include: [{ model: User, as: 'user' }] // Include the User data
    });

    if (senders.length === 0) {
      return res.status(404).json({ error: 'No senders found for this userId' });
    }

    res.json(senders);
  } catch (error) {
    console.error('Error retrieving senders by userId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
