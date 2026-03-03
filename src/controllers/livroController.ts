import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middleware/auth.js";
import { livroSchema, livroUpdateSchema } from "../validations/livro-schema.js";

export const getLivros = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const [livros, total] = await Promise.all([
      prisma.livro.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.livro.count(),
    ]);

    const lastPage = Math.ceil(total / limit) || 1;

    return res.json({
      data: livros,
      meta: {
        total,
        perPage: limit,
        currentPage: page,
        lastPage,
        hasNextPage: page < lastPage,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar livros" });
  }
};

export const createLivro = async (
  req: AuthRequest,
  res: Response
) => {
  const result = livroSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: result.error.flatten(),
    });
  }

  try {
    const livro = await prisma.livro.create({
      data: {
        ...result.data,
        userId: req.userId!,
      },
    });

    return res.status(201).json(livro);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar livro" });
  }
};

export const updateLivro = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;

  const result = livroUpdateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: result.error.flatten(),
    });
  }

  try {
    const livro = await prisma.livro.update({
      where: { id: Number(id) },
      data: result.data,
    });

    return res.json(livro);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar livro" });
  }
};

export const deleteLivro = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;

  try {
    await prisma.livro.delete({
      where: { id: Number(id) },
    });

    return res.json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar livro" });
  }
};