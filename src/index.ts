// import express from 'express';
// import sequelize from './config/database';
// import User from './models/User';  
// // import router from './routes/authRoutes';
// const authRoutes = require('./routes/authRoutes')
// const app = express();

// app.use(express.json());

// sequelize.sync({ alter: true }) // This creates the table if it doesn't exist and alters it if necessary
// .then(() => {
//   console.log('Database & tables created/synced!');
// })
// .catch((err:string) => {
//   console.error('Error syncing database:', err);
// });
// const router = express.Router()

// router.use('/auth',authRoutes)
// app.use('/api',router)
// // Example route
// app.get('/', async (req, res) => {
//   const data = await User.findAll();
//   res.json('data');
// });

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });


import express from 'express';
import cors from 'cors';
import http from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import sequelize from './config/database';


const app = express();
app.use(cors({
  credentials:true
}));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server =http.createServer(app)
 

server.listen(8080,()=>{
  console.log('Server running on port 8080')
})



