import express from 'express';
import sequelize from './config/database';
import User from './models/User';
import Sender from './models/Sender';
import authRoutes from './routes/authRoutes';
import senderRoutes from './routes/senderRouter'; // Import Sender routes

const app = express();

app.use(express.json());

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created/synced!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/senders', senderRoutes); // Use Sender routes
app.use('/api', router);

// Example route
app.get('/', async (req, res) => {
  const data = await User.findAll();
  res.json(data);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
