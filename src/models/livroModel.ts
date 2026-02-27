import db from "../config/db.js";

export type Livro = {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  lido: boolean;
};

export const LivroModel = {
  async findAll(): Promise<Livro[]> {
    const rows = await db<Livro[]>`SELECT * FROM livros`;
    return rows;
  },

  async findById(id: number): Promise<Livro | undefined> {
    const rows = await db<Livro[]>`
    SELECT * FROM livros WHERE id = ${id}
  `;
    return rows[0];
  },

  async create(data: Omit<Livro, "id">): Promise<{ id: number }> {
    const { titulo, autor, ano, lido } = data;

    const result = await db<{ id: number }[]>`
    INSERT INTO livros (titulo, autor, ano, lido)
    VALUES (${titulo}, ${autor}, ${ano}, ${lido})
    RETURNING id
  `;

    return { id: result[0].id };
  },

  async update(id: number, data: Omit<Livro, "id">): Promise<void> {
    const { titulo, autor, ano, lido } = data;

    await db`
      UPDATE livros
      SET titulo = ${titulo},
          autor = ${autor},
          ano = ${ano},
          lido = ${lido}
      WHERE id = ${id}
    `;
  },

  async remove(id: number): Promise<void> {
    await db`DELETE FROM livros WHERE id = ${id}`;
  },
};
