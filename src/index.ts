import express from 'express';
import sequelize from './config/database';
import User from './models/User';
import Sender from './models/Sender';
import Contact from './models/Contact';
import Group from './models/Group';
import Package from './models/Package'; // Import the Package model
import authRoutes from './routes/authRoutes';
import senderRoutes from './routes/senderRouter';
import contactRoutes from './routes/contactRouter';
import groupRoutes from './routes/groupRouter';
import packageRoutes from './routes/packageRouter'; // Import Package routes
import messageTemplateRoutes from './routes/messageTemplateRoutes'; // Import MessageTemplate routes


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
router.use('/senders', senderRoutes);
router.use('/contacts', contactRoutes);
router.use('/groups', groupRoutes);
router.use('/packages', packageRoutes); // Use Package routes
router.use('/message-templates', messageTemplateRoutes); 
app.use('/api', router);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
