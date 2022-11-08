import express from 'express';
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlogById
} from '../controllers/blog.controller';
import { isAuthorised } from '../middlewares/authorise';
import { blogValidaton } from '../validators/validators';

const router = express.Router();

// all routes start with /api/blogs
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/create', blogValidaton, createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlogById);

export default router;
