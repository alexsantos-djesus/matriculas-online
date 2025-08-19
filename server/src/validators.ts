import { courses } from "./db";
import type { EnrollmentRequest } from "./types";
import { isEmail } from "./utils";

export function validateEnrollment(body: any): { ok: true } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== "object") {
    return { ok: false, errors: { geral: "Payload inválido" } };
  }

  const { nomeCompleto, email, cursoId } = body as EnrollmentRequest;

  if (!nomeCompleto || typeof nomeCompleto !== "string" || nomeCompleto.trim().length < 3) {
    errors.nomeCompleto = "Informe um nome válido (mín. 3 caracteres).";
  }

  if (!email || typeof email !== "string" || !isEmail(email)) {
    errors.email = "E-mail inválido.";
  }

  if (!cursoId || typeof cursoId !== "string") {
    errors.cursoId = "Selecione um curso.";
  } else if (!courses.some(c => c.id === cursoId)) {
    errors.cursoId = "Curso não encontrado.";
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true };
}