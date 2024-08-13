import express from 'express';
import cors from 'cors'; // Import the cors middleware
import sequelize from './config/database';
import User from './models/User';
import Sender from './models/Sender';
import Contact from './models/Contact';
import Group from './models/Group';
import Package from './models/Package';
import authRoutes from './routes/authRoutes';
import senderRoutes from './routes/senderRouter';
import contactRoutes from './routes/contactRouter';
import groupRoutes from './routes/groupRouter';
import packageRoutes from './routes/packageRouter';
import messageTemplateRoutes from './routes/messageTemplateRoutes';
import apiKeyRoutes from './routes/apiKeyRouter';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


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
router.use('/senders', senderRoutes);
router.use('/contacts', contactRoutes);
router.use('/groups', groupRoutes);
router.use('/packages', packageRoutes); 
router.use('/message-templates', messageTemplateRoutes); 
router.use('/apikeys', apiKeyRoutes); 
app.use('/api', router);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
