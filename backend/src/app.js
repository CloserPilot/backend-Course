import express from 'express';


const app = express(); //crete an express app
app.use(express.json());


import userRouter from './routes/user.route.js';
import postRouter from './routes/post.routes.js';
// routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

//example route http://localhost:4000/api/v1/users/register

export default app;