import express, { Request, RequestHandler, Response } from 'express';
import { securePassword } from '../helpers/hashPassword';
import { errorRes, successRes } from '../helpers/resHelper';
import User from '../models/User';

export const registerUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return errorRes(res, 400, 'must provide all fields');
    }
    if (password.length < 8) {
      return errorRes(res, 400, 'password must be at least 8 characters long');
    }
    // if correct format input provided then move on:
    const hashPW = await securePassword(password);
    const newUser = new User({
      name: name,
      email: email,
      password: hashPW,
      phone: phone
    });
    if (newUser) {
      newUser.save();
      return successRes(res, 201, 'new user created', newUser);
    } else {
      return errorRes(res, 404, 'could not create user');
    }
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};
