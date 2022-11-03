import express, { Request, RequestHandler, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

import { securePassword, decryptPassword } from '../helpers/hashPassword';
import { errorRes, successRes } from '../helpers/resHelper';
import User from '../models/User';
import { dev } from '../config';
import { CustomRequest, TokenInterface } from '../middlewares/authorise';

// registerUser (POST)
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

// login user (POST)
export const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorRes(res, 400, 'must provide email and password');
    }
    // if correct format input provided then move on:
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return errorRes(res, 404, 'User does not exist');
    }
    const isPW = await decryptPassword(password, foundUser.password);
    if (!isPW) {
      return errorRes(res, 406, 'email or password does not match');
    }
    // if all goes well create jwt
    //create payload and import private key:
    const payload: JwtPayload = { id: foundUser._id };
    const privKey: Secret = dev.app.priv_key;

    // create the token
    const token = jwt.sign(payload, String(privKey), {
      expiresIn: '40s'
    });

    // send the token inside cookie
    res.cookie(String(foundUser._id), token, {
      //Cookies sent to clients can be set for a specific path, not just a domain.
      path: '/',
      expires: new Date(Date.now() + 1000 * 38),
      httpOnly: true
    });
    console.log('user controller, login,', token);
    return res.status(200).send({ message: 'login success', token: token });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};

// /profile (GET)
export const showProfile: RequestHandler = async (req: Request, res: Response) => {
  try {
    // use projection to not send password data to frontend
    const foundUser = await User.findOne({ id: (req as CustomRequest).id }, { password: 0 });
    if (!foundUser) {
      return errorRes(res, 404, 'User does not exist');
    }
    res.status(200).json({
      message: 'user found',
      foundUser
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};

// /logout (POST)
export const logoutUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    if (!req.headers.cookie) {
      return res.status(404).send({
        message: 'no cookie found'
      });
    }
    const token = req.headers.cookie.split('=')[1];
    if (!token) {
      return res.status(404).send({
        message: 'Token not found'
      });
    }

    // verify token
    const privKey: Secret = dev.app.priv_key;
    jwt.verify(token, String(privKey), function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(400).send({
          message: 'Could nto verify token'
        });
      }
      // console.log(decoded);
      res.clearCookie(`${(decoded as TokenInterface).id}`);
    });
    res.status(200).json({
      message: 'user logged out'
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};
