import { Response } from "express";
import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middleware/auth.js";

export const getLivros = async (
  req: AuthRequest,
  res: Response
) => {
  const livros = await prisma.livro.findMany({
    where: { userId: req.userId },
  });

  res.json(livros);
};

export const createLivro = async (
  req: AuthRequest,
  res: Response
) => {
  const livro = await prisma.livro.create({
    data: {
      ...req.body,
      userId: req.userId!,
    },
  });

  res.json(livro);
};

export const updateLivro = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;

  const livro = await prisma.livro.update({
    where: { id: Number(id) },
    data: req.body,
  });

  res.json(livro);
};

export const deleteLivro = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;

  await prisma.livro.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Livro deletado" });
};