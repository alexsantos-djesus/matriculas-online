export interface Course {
  id: string;
  title: string;
  description: string;
  workloadHours: number;
}

export interface EnrollmentRequest {
  nomeCompleto: string;
  email: string;
  cursoId: string;
}

export interface Enrollment extends EnrollmentRequest {
  id: string;
  createdAt: string;
}