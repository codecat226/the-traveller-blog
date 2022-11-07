import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { v4 } from 'uuid';

import { securePassword, decryptPassword } from '../helpers/hashPassword';
import { errorRes, successRes } from '../helpers/resHelper';
import User, { UserDocument } from '../models/User';
import { dev } from '../config';
import { CustomRequest, TokenInterface } from '../middlewares/authorise';
import { sendVerifyEmail } from '../utils/sendVerificationEmail';
import { createToken } from '../utils/createToken';
import { sendPasswordEmail } from '../utils/sendResetPasswordEmail';

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
    //check if email already registered:
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return errorRes(res, 400, 'User with this email address already exists');
    }
    // if correct format input provided then move on:
    const hashPW = await securePassword(password);
    const newUser = new User({
      id: v4(),
      name: name,
      email: email,
      password: hashPW,
      phone: phone,
      isVerified: false,
      isAdmin: false
    });
    const userData = await newUser.save();
    if (userData) {
      const { name, email, id } = userData;
      sendVerifyEmail(name, email, id, 'Verification Email');
      return successRes(res, 201, 'new user created, please verify email');
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
      return errorRes(res, 404, 'User with this email does not exist');
    }
    const isPW = await decryptPassword(password, foundUser.password);
    if (!isPW) {
      return errorRes(res, 406, 'email or password does not match');
    }
    if (foundUser.isVerified) {
      // clear previous cookies if exists
      if (req.cookies[`${(foundUser as UserDocument)._id}`]) {
        req.cookies[`${(foundUser as UserDocument)._id}`] = '';
      }

      // if all goes well create jwt
      //create payload and import private key:
      // const payload: JwtPayload = { id: foundUser._id };
      const privKey: Secret = dev.app.priv_key;

      // create the token
      const token = jwt.sign({ id: foundUser._id }, String(privKey), {
        expiresIn: '40s'
      });

      // create cookie to send the token inside
      res.cookie(String(foundUser._id), token, {
        // cookies sent to clients can be set for a specific path, if necessary
        path: '/',
        // remember to make expiration LESS than the token expiration
        expires: new Date(Date.now() + 1000 * 38),
        // Setting httpOnly prevents client-side scripts from accessing data
        httpOnly: true
      });
      //send the token to the frontend
      return res.status(200).send({ message: 'login success', token: token });
    } else {
      return errorRes(res, 400, 'Please verify email first');
    }
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
    const foundUser = await User.findOne({ _id: (req as CustomRequest).id }, { password: 0 });
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
          message: 'Could not verify token'
        });
      }
      //clear cookies
      req.cookies[`${(decoded as TokenInterface).id}`] = '';
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

// /refresh (GET)
export const createRefreshToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if there is a cookie (check if user is already logged in)
    if (!req.headers.cookie) {
      return res.status(404).send({
        message: 'no cookie found'
      });
    }
    //get token out of the cookie
    const oldToken = req.headers.cookie.split('=')[1];
    if (!oldToken) {
      return res.status(404).send({
        message: 'No token found'
      });
    }

    //verify the old token
    const privKey: Secret = dev.app.priv_key;
    jwt.verify(oldToken, String(privKey), function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(400).send({
          message: 'Could not verify token'
        });
      }
      console.log('old token :', oldToken);
      //if the token IS verified --> reset OLD cookies in res and req header
      req.cookies[`${(decoded as TokenInterface).id}`] = '';
      res.clearCookie(`${(decoded as TokenInterface).id}`);

      //generate the NEW token:
      // const payload: JwtPayload = { id: (decoded as TokenInterface).id };
      const newToken = jwt.sign({ id: (decoded as TokenInterface).id }, String(privKey), {
        expiresIn: '36s'
      });

      console.log('new token:', newToken);
      // send the NEW token inside cookie
      res.cookie(String((decoded as TokenInterface).id), newToken, {
        //Cookies sent to clients can be set for a specific path, not just a domain.
        path: '/',
        expires: new Date(Date.now() + 1000 * 34),
        httpOnly: true
      });
      // set the id (which comes from payload when we SIGNED the token here so that it can be accessed in the user profile route request
      (req as CustomRequest).id = (decoded as TokenInterface).id;
      // go next since it is middleware
      next();
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};

// GET method /verify
export const verifyUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id;

    const userUpdated = await User.updateOne(
      { id: id },
      {
        $set: {
          isVerified: true
        }
      }
    );
    if (userUpdated) {
      return res
        .status(200)
        .json({ message: 'user verification successful, please close this tab and login again' });
    } else {
      return errorRes(res, 404, 'user verification unsuccessful');
    }
  } catch (error) {
    res.status(500).send({
      message: 'server error'
    });
  }
};

// POST method /resend-verify
export const resendVerifyUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //try to find user with id passed in url query
    const { email } = req.body;

    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      if (foundUser.isVerified) {
        return successRes(res, 200, 'User already verified.');
      } else {
        const { name, email, id } = foundUser;
        sendVerifyEmail(name, email, id, 'Verification Email');
        return successRes(res, 200, 'Verification link sent to your email address.');
      }
    } else {
      return errorRes(res, 400, 'No user associated with this email address.');
    }
  } catch (error) {
    res.status(500).send({
      message: 'server error'
    });
  }
};

// POST method /forgot-password
export const forgotPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email: email });
    if (userData) {
      if (userData.isVerified) {
        const newToken = createToken();
        const updatedToken = await User.updateOne(
          { email: email },
          {
            $set: {
              token: newToken
            }
          }
        );
        if (updatedToken) {
          const { id, name, email } = userData;
          sendPasswordEmail(id, name, email, 'Reset Password', newToken, 'users');
          return successRes(res, 200, 'password reset email sent.');
        }
      } else {
        return errorRes(res, 400, 'Please verify your email first');
      }
    } else {
      return errorRes(res, 404, 'Failed to find user with email.');
    }
  } catch (error) {
    res.status(500).send({
      message: 'server error'
    });
  }
};

// POST method /reset-password
export const resetPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //try to find user with token passed in url params
    const { token } = req.params;
    const userData = await User.findOne({ token: token });
    if (userData) {
      const { password } = req.body;
      console.log(password);
      const hashPW = await securePassword(password);
      await User.findOneAndUpdate(
        { token: userData.token },
        {
          $set: {
            password: hashPW,
            token: ''
          }
        }
      );
      return successRes(res, 201, 'password successfully changed!');
    } else {
      errorRes(res, 404, 'Could not find user');
    }
  } catch (error) {
    res.status(500).send({
      message: 'server error'
    });
  }
};
