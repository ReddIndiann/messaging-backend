import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

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
    });

    // Create and assign JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err:any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
