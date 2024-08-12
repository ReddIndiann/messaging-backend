import { Router } from 'express';
import Group from '../models/Group';

const router = Router();

// Create a new group
router.post('/', async (req, res) => {
  try {
    const { groupname, members, userId } = req.body;

    if (!groupname || !members || !userId) {
      return res.status(400).json({ error: 'Group name, members, and userId are required' });
    }

    const newGroup = await Group.create({ groupname, members, userId });
    res.status(201).json(newGroup);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a group by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findByPk(id);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json(group);
  } catch (error) {
    console.error('Error retrieving group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch (error) {
    console.error('Error retrieving groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all groups by userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const groups = await Group.findAll({ where: { userId } });

    if (groups.length === 0) {
      return res.status(404).json({ error: 'No groups found for this userId' });
    }

    res.json(groups);
  } catch (error) {
    console.error('Error retrieving groups by userId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a group by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { groupname, members, userId } = req.body;

    const group = await Group.findByPk(id);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    await group.update({ groupname, members, userId });
    res.json(group);
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a group by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findByPk(id);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    await group.destroy();
    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a member to a group
router.put('/:id/members/add', async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId } = req.body;

    const group = await Group.findByPk(id);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (!group.members.includes(memberId)) {
      group.members.push(memberId);
      await group.save();
    }

    res.json(group);
  } catch (error) {
    console.error('Error adding member to group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove a member from a group
router.put('/:id/members/remove', async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId } = req.body;

    const group = await Group.findByPk(id);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    group.members = group.members.filter(member => member !== memberId);
    await group.save();

    res.json(group);
  } catch (error) {
    console.error('Error removing member from group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
