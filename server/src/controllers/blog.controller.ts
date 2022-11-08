import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import { v4 } from 'uuid';
import { errorRes, successRes } from '../helpers/resHelper';
import Blog from '../models/Blog';

// / (GET)
export const getAllBlogs: RequestHandler = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    if (blogs) {
      return successRes(res, 200, 'found all blogs', blogs);
    } else {
      return errorRes(res, 400, 'could not get blogs');
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: 'server error'
    });
  }
};

// /:id (GET)
export const getBlogById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ id: id });
    if (blog) {
      return successRes(res, 200, 'found blog', blog);
    } else {
      return errorRes(res, 400, 'blog with id does not exist');
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: 'server error'
    });
  }
};

// /create (POST)
export const createBlog: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author, publishDate, body } = req.body;
    const blog = new Blog({
      id: v4(),
      title: title,
      author: author,
      publishDate: publishDate,
      body: body
    });
    const newBlog = await blog.save();
    if (newBlog) {
      successRes(res, 201, 'blog successfully created', newBlog);
    }
  } catch (error: any) {
    res.status(500).send({
      message: 'server error'
    });
  }
};

// /:id (POST)
export const updateBlog: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author, publishDate, body } = req.body;
    const { id } = req.params;
    const blog = await Blog.findOne({ id: id });
    if (blog) {
      const updatedBlog = await Blog.updateOne(
        { id: id },
        {
          $set: {
            title,
            author,
            publishDate,
            body
          }
        },
        {
          new: true
        }
      );
      if (updatedBlog) {
        successRes(res, 201, 'blog successfully updated', updatedBlog);
      } else {
        return errorRes(res, 400, 'could not update blog');
      }
    } else {
      return errorRes(res, 400, 'could not find blog with id');
    }
  } catch (error: any) {
    res.status(500).send({
      message: 'server error'
    });
  }
};

// /:id (DELETE)
export const deleteBlogById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ id: id });
    if (blog) {
      await Blog.deleteOne({ id: id });
      return successRes(res, 200, 'blog deleted', blog);
    } else {
      return errorRes(res, 400, 'blog with id does not exist');
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: 'server error'
    });
  }
};
