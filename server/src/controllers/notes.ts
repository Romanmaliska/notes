import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";
import { assertIsDefined } from "../utils/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    const notes = await NoteModel.find({ userId: authenticatedUserId }).exec();

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Note Id is not valid");
    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, "Note Id is not found");

    if (!note.userId.equals(authenticatedUserId))
      throw createHttpError(401, "You are not authorized to access this note");

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

type CreateNoteBody = {
  title?: string;
  text?: string;
};


export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);
    
    if (!title) throw createHttpError(400, "Note title is required");

    const newNote = await NoteModel.create({
      userId: authenticatedUserId,
      title,
      text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

type UpdateNoteParams = {
  noteId: string;
};

type UpdateNoteBody = {
  title?: string;
  text?: string;
};

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;
  const { title, text } = req.body;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Note Id is not valid");

    if (!title) throw createHttpError(400, "Note title is required");

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, "Note Id is not found");

    if (!note.userId.equals(authenticatedUserId))
      throw createHttpError(401, "You are not authorized to access this note");

    note.title = title;
    note.text = text;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Note Id is not valid");

    const note = await NoteModel.findById(noteId).exec();
    if (!note) throw createHttpError(404, "Note Id is not found");

    if (!note.userId.equals(authenticatedUserId))
      throw createHttpError(401, "You are not authorized to delete this note");

    await note.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
