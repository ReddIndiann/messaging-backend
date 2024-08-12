import { Router } from 'express';
import Package from '../models/Package';

const router = Router();

// Create a new package
router.post('/', async (req, res) => {
  try {
    const { packagename, description, price, unitmessages, duration, packageexpiry } = req.body;

    if (!packagename || description === undefined || price === undefined || unitmessages === undefined || packageexpiry === undefined) {
      return res.status(400).json({ error: 'Packagename, description, price, unitmessages, and packageexpiry are required' });
    }

    // Handle default duration if packageexpiry is false
    const finalDuration = packageexpiry ? duration : 0; // 0 or any other value for unlimited

    const newPackage = await Package.create({ packagename, description, price, unitmessages, duration: finalDuration, packageexpiry });
    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a package by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const pkg = await Package.findByPk(id);

    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json(pkg);
  } catch (error) {
    console.error('Error retrieving package:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.json(packages);
  } catch (error) {
    console.error('Error retrieving packages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a package by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { packagename, description, price, unitmessages, duration, packageexpiry } = req.body;

    const pkg = await Package.findByPk(id);

    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Handle default duration if packageexpiry is false
    const finalDuration = packageexpiry ? duration : 0; // 0 or any other value for unlimited

    await pkg.update({ packagename, description, price, unitmessages, duration: finalDuration, packageexpiry });
    res.json(pkg);
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a package by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const pkg = await Package.findByPk(id);

    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }

    await pkg.destroy();
    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
