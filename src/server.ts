import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import livroRoutes from "./routes/livroRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", livroRoutes);

app.listen(3001, () => {
  console.log("🚀 Server rodando na porta 3001");
});