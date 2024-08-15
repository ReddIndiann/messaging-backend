import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authController = {
  register: async (req: Request, res: Response) => {
    const { username, email, password, number } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash password and create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        username,
        email,
        password: hashedPassword,
        number,
      });

      // Create and assign JWT
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h',
      });

      // Respond with user data and token
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          number: user.number,
          role: user.role,
          walletbalance: user.walletbalance,
          creditbalance: user.creditbalance,
        },
      });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  signin: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Create and assign JWT
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h',
      });

      // Send user details and token in the response
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          number: user.number,
          role: user.role,
          walletbalance: user.walletbalance,
          creditbalance: user.creditbalance,
        },
      });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, password, number, walletbalance, creditbalance, role } = req.body;
  
    try {
      // Find the user by ID
      let user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Update the user's information
      if (username) user.username = username;
      if (email) user.email = email;
      if (number) user.number = number;
      if (role) user.role = role; // Add this line to handle role updates
      if (walletbalance !== undefined) user.walletbalance = walletbalance;
      if (creditbalance !== undefined) user.creditbalance = creditbalance;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
  
      // Respond with updated user data
      res.json({
        msg: 'User updated successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          number: user.number,
          role: user.role,
          walletbalance: user.walletbalance,
          creditbalance: user.creditbalance,
        },
      });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  
  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      // Find the user by ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Delete the user
      await user.destroy();

      // Respond with a success message
      res.json({ msg: 'User deleted successfully' });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

};


