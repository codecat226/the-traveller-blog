import express, { Request, RequestHandler, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { dev } from '../config';

export interface TokenInterface {
  id: string;
  iat: number;
  exp: number;
}

export interface CustomRequest extends Request {
  id: string;
}

export const isAuthorised: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //first check if there is a cookie available
    if (!req.headers.cookie) {
      return res.status(404).send({
        message: 'no cookie found'
      });
    }
    //get just the token from the cookie
    const token = req.headers.cookie.split('=')[1];
    if (!token) {
      return res.status(404).send({
        message: 'Token not found'
      });
    }

    // verify the token
    const privKey: Secret = dev.app.priv_key;
    jwt.verify(token, String(privKey), function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(400).send({
          message: 'Could not verify token'
        });
      }
      (req as CustomRequest).id = (decoded as TokenInterface).id;
      //set the id (which comes from payload when we SIGNED the token here so that it can be accessed in the user profile route request
      next();
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};
