import { Router } from 'express';
import { createPost, getPost, updatePost, deletePost } from '../controllers/post.controller.js'

const postRouter = Router();

postRouter.route('/create').post(createPost);
postRouter.route('/getPost').get(getPost);
postRouter.route('/update/:id').patch(updatePost);
postRouter.route('/delete/:id').delete(deletePost);

export default postRouter;