import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middleware/auth.js";

export const getLivros = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const [livros, total] = await Promise.all([
      prisma.livro.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.livro.count()
    ]);

    const lastPage = Math.ceil(total / limit);

    return res.json({
      data: livros,
      meta: {
        total,
        perPage: limit,
        currentPage: page,
        lastPage,
        hasNextPage: page < lastPage,
        hasPreviousPage: page > 1
      }
    });

  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar livros" });
  }
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