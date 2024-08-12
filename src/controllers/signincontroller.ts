import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signin = async (req: Request, res: Response) => {
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
        role: user.role, // Include role in the payload
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
        // Add other user details you want to include
      },
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
