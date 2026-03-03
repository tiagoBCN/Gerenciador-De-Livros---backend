import { z } from "zod";

export const livroSchema = z.object({
  titulo: z
    .string()
    .min(3, "Título deve ter no mínimo 3 caracteres")
    .max(100, "Título muito longo"),

  autor: z
    .string()
    .min(3, "Autor deve ter no mínimo 3 caracteres")
    .max(100, "Autor muito longo"),

  ano: z.coerce
  .number()
  .min(1500, "Ano inválido")
  .max(new Date().getFullYear(), "Ano não pode ser no futuro"),

  lido: z.boolean().optional(),
});

export const livroUpdateSchema = livroSchema.partial();