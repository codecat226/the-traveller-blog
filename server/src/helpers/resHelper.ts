import express, { Response } from 'express';

export const errorRes = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).send({
    success: false,
    message: message
  });
};

export const successRes = (
  res: Response,
  statusCode: number,
  message: string,
  data?: object | string
) => {
  return res.status(statusCode).send({
    success: true,
    message: message,
    data: data
  });
};
