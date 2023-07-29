import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import UserModel from "../models/user";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    const user = await UserModel.findById(authenticatedUserId)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

type SignUpBody = {
  name?: string;
  email?: string;
  password?: string;
};

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password)
      throw createHttpError(
        400,
        "Parameters name, email and password are required"
      );

    const takenName = await UserModel.findOne({ name }).exec();
    if (takenName)
      throw createHttpError(409, "User name is taken. Please try another one");

    const takenEmail = await UserModel.findOne({ email }).exec();
    if (takenEmail)
      throw createHttpError(
        409,
        "User with email already exists. Please login."
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

type LoginBody = {
  name?: string;
  password?: string;
};

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { name, password } = req.body;

  try {
    if (!name || !password)
      throw createHttpError(400, "Parameters are required");

    const user = await UserModel.findOne({ name })
      .select("+password +email")
      .exec();
    if (!user) throw createHttpError(401, "Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw createHttpError(401, "Invalid credentials");

    req.session.userId = user._id;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (error) next(error);
      res.status(204).end();
    });
  } catch (error) {
    next(error);
  }
};
