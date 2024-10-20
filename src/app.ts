import express from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import notFoundHandler from './app/middlewares/notFoundHandeler';
import globalErrorHandler from './app/middlewares/globalErrorHandeler';

const app = express();

// Enable cookie parsing
app.use(cookieParser());

// Middleware for parsing JSON bodies
app.use(express.json());

// app.use(express.static("./uploads"));

// Middleware for handling CORS with credentials
app.use(cors({ origin: ['https://tail-stories.vercel.app'], credentials: true }));
// app.use(cors({ origin: ['http://localhost:3000', 'https://tail-stories.vercel.app/'], credentials: true }));

// Root route
app.get('/', (req, res) => {
  res.send("Welcome to Tail Stories");
});

// Application routes
app.use('/api/v1', router);

// Catch-all route for handling 404 errors
app.use(notFoundHandler);

// Global error handling middleware
app.use(globalErrorHandler);

export default app;
