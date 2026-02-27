import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  getLivros,
  createLivro,
  updateLivro,
  deleteLivro,
} from "../controllers/livroController.js";

const router = Router();

router.use(authMiddleware);

router.get("/livros", getLivros);
router.post("/livros", createLivro);
router.put("/livros/:id", updateLivro);
router.delete("/livros/:id", deleteLivro);

export default router;