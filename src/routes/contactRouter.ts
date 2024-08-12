import { Router } from 'express';
import Contact from '../models/Contact';

const router = Router();

// Create a new contact
router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, birthday, phone, email, group, userId } = req.body;

    if (!firstname || !lastname || !phone || !email || !group || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = await Contact.create({ firstname, lastname, birthday, phone, email, group, userId });
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a contact by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error retrieving contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all contacts by userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const contacts = await Contact.findAll({ where: { userId } });

    if (contacts.length === 0) {
      return res.status(404).json({ error: 'No contacts found for this userId' });
    }

    res.json(contacts);
  } catch (error) {
    console.error('Error retrieving contacts by userId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a contact by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, birthday, phone, email, group, userId } = req.body;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await contact.update({ firstname, lastname, birthday, phone, email, group, userId });
    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await contact.destroy();
    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a group item in a contact
router.put('/:id/group', async (req, res) => {
  try {
    const { id } = req.params;
    const { oldGroupName, newGroupName } = req.body;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const groupIndex = contact.group.indexOf(oldGroupName);

    if (groupIndex !== -1) {
      contact.group[groupIndex] = newGroupName;
      await contact.save();
      res.json(contact);
    } else {
      res.status(404).json({ error: 'Group name not found' });
    }
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a group item from a contact
router.delete('/:id/group', async (req, res) => {
  try {
    const { id } = req.params;
    const { groupName } = req.body;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    const newGroup = contact.group.filter(group => group !== groupName);

    if (newGroup.length === contact.group.length) {
      return res.status(404).json({ error: 'Group name not found' });
    }

    contact.group = newGroup;
    await contact.save();
    res.json(contact);
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
