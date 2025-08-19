import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { courses, enrollments } from "./db";
import { validateEnrollment } from "./validators";
import { nowISO, uid } from "./utils";

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: false }));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    service: "matriculas-api",
    endpoints: ["/cursos (GET)", "/matricula (POST)"]
  });
});

app.get("/cursos", (_req: Request, res: Response) => {
  res.status(200).json(courses);
});

app.post("/matricula", (req: Request, res: Response) => {
  const result = validateEnrollment(req.body);
  if (!("ok" in result && result.ok)) {
    return res.status(400).json({ message: "Dados inválidos", errors: result.errors });
  }
  const { nomeCompleto, email, cursoId } = req.body;
  const enrollment = { id: uid(), nomeCompleto, email, cursoId, createdAt: nowISO() };
  enrollments.push(enrollment);
  return res.status(201).json({ message: "Matrícula criada", enrollment });
});

// ⚠️ Tipos explícitos aqui:
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Erro interno" });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
