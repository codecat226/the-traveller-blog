import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { securePassword, decryptPassword } from '../helpers/hashPassword';
import { errorRes, successRes } from '../helpers/resHelper';
import User, { UserDocument } from '../models/User';
import { dev } from '../config';
import { CustomRequest, TokenInterface } from '../middlewares/authorise';
import { sendEmail } from '../utils/sendEmail';
import { createToken } from '../utils/createToken';
import { sendPasswordEmail } from '../utils/sendResetPasswordEmail';

export interface VerifyTokenInterface {
  name: string;
  email: string;
  hashPW: string;
  phone: string;
}

// login user (POST)
export const loginAdmin: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const foundAdmin = await User.findOne({ email: email });
    if (!foundAdmin) {
      return errorRes(res, 404, 'Admin with this email does not exist');
    }
    //check if isAdmin
    if (foundAdmin.isAdmin !== true) {
      return errorRes(res, 401, 'Not an admin, please use user login');
    }
    const isPW = await decryptPassword(password, foundAdmin.password);
    if (!isPW) {
      return errorRes(res, 406, 'email or password does not match');
    }
    // clear previous cookies if exists
    if (req.cookies[`${(foundAdmin as UserDocument)._id}`]) {
      req.cookies[`${(foundAdmin as UserDocument)._id}`] = '';
    }
    //create payload and import private key:
    const privKey: Secret = dev.app.priv_key;

    // create the token
    const token = jwt.sign({ id: foundAdmin._id }, String(privKey), {
      expiresIn: '3m'
    });

    // create cookie to send the token inside
    res.cookie(String(foundAdmin._id), token, {
      // cookies sent to clients can be set for a specific path, if necessary
      path: '/',
      // remember to make expiration LESS than the token expiration
      expires: new Date(Date.now() + 1000 * 170),
      // Setting httpOnly prevents client-side scripts from accessing data
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    //send the token to the frontend
    return res.status(200).send({ message: 'login success', token: token });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};

// GET method /dashboard
export const showDashboard: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundUsers = User.find({ isAdmin: false });
    if (!foundUsers) {
      return errorRes(res, 404, 'Could not find users');
    } else {
      return res.status(200).send({ message: 'success', users: foundUsers });
    }
  } catch (error) {
    res.status(500).send({
      message: 'server error'
    });
  }
};
