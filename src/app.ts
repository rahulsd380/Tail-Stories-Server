import express from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import notFoundHandler from './app/middlewares/notFoundHandeler';
import globalErrorHabdeler from './app/middlewares/globalErrorHandeler';

const app = express();

// Enable cookie parsing
app.use(cookieParser());

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for handling CORS with credentials
app.use(cors({ origin: ['https://orbit-rides.vercel.app'], credentials: true }));

// Root route
app.get('/', (req, res) => {
  res.send("Welcome to bike rental");
});

// Application routes
app.use('/api', router);

// Catch-all route for handling 404 errors
app.use(notFoundHandler);

// Global error handling middleware
app.use(globalErrorHabdeler);

export default app;
