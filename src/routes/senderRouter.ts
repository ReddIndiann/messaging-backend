// routes/senderRoutes.ts
import { Router } from 'express';
import Sender from '../models/Sender';

const router = Router();

// Route to create a new sender
router.post('/', async (req, res) => {
  try {
    const { name, userId, status } = req.body;

    // Validate request body
    if (!name || !userId || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new Sender
    const newSender = await Sender.create({ name, userId, status });

    res.status(201).json(newSender);
  } catch (error) {
    console.error('Error creating sender:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
