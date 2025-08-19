import type { Course, Enrollment } from "./types";

export const courses: Course[] = [
  { 
    id: "vue-artesao", 
    title: "Vue.js Artesão de Interfaces",
    description: "Aprenda a esculpir interfaces modernas com Vue 3, roteamento dinâmico e estado global.",
    workloadHours: 28 
  },
  { 
    id: "node-backbone", 
    title: "Node.js Estrutura de Aço",
    description: "Construa APIs sólidas com Express + TypeScript, aplicando padrões e práticas de mercado.",
    workloadHours: 22 
  },
  { 
    id: "ux-lab", 
    title: "Laboratório UX/UI",
    description: "Experiência prática em design de interfaces, usabilidade e protótipos que encantam.",
    workloadHours: 18 
  }
];

export const enrollments: Enrollment[] = [];
