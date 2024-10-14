import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Configurando CORS para permitir o frontend hospedado no Vercel
const allowedOrigins = [
  "http://localhost:5173",
  "https://auth-project1-ip57-8xpcdta2h-pastuchenko73s-projects.vercel.app"
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json()); // permite analisar o corpo das requisições
app.use(cookieParser()); // permite analisar cookies

app.use("/api/auth", authRoutes);

// Servir o frontend em produção
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
