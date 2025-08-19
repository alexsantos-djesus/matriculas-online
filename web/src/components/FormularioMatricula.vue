<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "vue";

type Curso = { id: string; title: string; description: string; workloadHours: number };

const cursos = ref<Curso[]>([]);
const carregandoCursos = ref(true);
const erroCursos = ref("");

const form = reactive({ nomeCompleto: "", email: "", cursoId: "" });
const touched = reactive({ nomeCompleto: false, email: false, cursoId: false });
const enviando = ref(false);
const toast = reactive<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });

const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const erros = computed(() => {
  const e: Record<string, string> = {};
  if (touched.nomeCompleto && form.nomeCompleto.trim().length < 3) e.nomeCompleto = "Informe pelo menos 3 caracteres.";
  if (touched.email && !emailValido(form.email)) e.email = "E‑mail inválido.";
  if (touched.cursoId && !form.cursoId) e.cursoId = "Selecione um curso.";
  return e;
});

const podeEnviar = computed(() =>
  form.nomeCompleto.trim().length >= 3 && emailValido(form.email) && !!form.cursoId && !enviando.value
);

async function carregarCursos() {
  carregandoCursos.value = true;
  erroCursos.value = "";
  try {
    const res = await fetch("http://localhost:3333/cursos");
    if (!res.ok) throw new Error("Falha ao carregar cursos");
    cursos.value = await res.json();
  } catch (err: any) {
    erroCursos.value = err?.message || "Erro ao buscar cursos";
  } finally {
    carregandoCursos.value = false;
  }
}

function showToast(type: "success" | "error", msg: string) {
  toast.type = type;
  toast.msg = msg;
  setTimeout(() => (toast.type = null), 3500);
}

async function enviar() {
  touched.nomeCompleto = true;
  touched.email = true;
  touched.cursoId = true;

  if (!podeEnviar.value) return;

  enviando.value = true;
  try {
    const res = await fetch("http://localhost:3333/matricula", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data?.message || "Não foi possível enviar");

    showToast("success", `Matrícula concluída! Código: ${data.enrollment.id}`);
    form.nomeCompleto = "";
    form.email = "";
    form.cursoId = "";
    touched.nomeCompleto = touched.email = touched.cursoId = false;
  } catch (err: any) {
    showToast("error", err?.message || "Erro ao enviar");
  } finally {
    enviando.value = false;
  }
}

onMounted(carregarCursos);
</script>

<template>
  <!-- toast -->
  <transition name="slide-up">
    <div
      v-if="toast.type"
      class="fixed bottom-6 right-6 z-50 rounded-xl px-4 py-3 text-sm shadow-soft"
      :class="toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'"
      role="status"
      aria-live="polite"
    >
      {{ toast.msg }}
    </div>
  </transition>

  <form @submit.prevent="enviar" novalidate class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <label for="nome" class="form-label">Nome completo</label>
        <input
          id="nome"
          type="text"
          class="form-input"
          v-model.trim="form.nomeCompleto"
          @blur="touched.nomeCompleto = true"
          :aria-invalid="!!erros.nomeCompleto"
          :aria-describedby="erros.nomeCompleto ? 'err-nome' : undefined"
          placeholder="Ex.: Maria da Silva"
        />
        <p v-if="erros.nomeCompleto" id="err-nome" class="mt-1 text-xs text-rose-600">{{ erros.nomeCompleto }}</p>
      </div>

      <div>
        <label for="email" class="form-label">E‑mail</label>
        <input
          id="email"
          type="email"
          class="form-input"
          v-model.trim="form.email"
          @blur="touched.email = true"
          :aria-invalid="!!erros.email"
          :aria-describedby="erros.email ? 'err-email' : undefined"
          placeholder="voce@exemplo.com"
        />
        <p v-if="erros.email" id="err-email" class="mt-1 text-xs text-rose-600">{{ erros.email }}</p>
      </div>
    </div>

    <div>
      <label for="curso" class="form-label">Curso</label>
      <div v-if="carregandoCursos" class="h-10 skeleton"></div>
      <template v-else>
        <select
          id="curso"
          class="form-input"
          v-model="form.cursoId"
          @blur="touched.cursoId = true"
          :aria-invalid="!!erros.cursoId"
        >
          <option value="" disabled>Selecione…</option>
          <option v-for="c in cursos" :key="c.id" :value="c.id">
            {{ c.title }} — {{ c.workloadHours }}h
          </option>
        </select>
        <p v-if="erros.cursoId" class="mt-1 text-xs text-rose-600">{{ erros.cursoId }}</p>
        <p v-if="erroCursos" class="notice notice-error mt-2">{{ erroCursos }}</p>
      </template>
    </div>

    <div class="flex items-center gap-3">
      <button class="btn-primary" type="submit" :disabled="!podeEnviar">
        <svg v-if="enviando" class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
        <span>{{ enviando ? "Enviando…" : "Concluir matrícula" }}</span>
      </button>

      <span class="text-xs text-slate-500">Seus dados não serão compartilhados.</span>
    </div>
  </form>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active { transition: all .25s ease; }
.slide-up-enter-from,
.slide-up-leave-to { transform: translateY(8px); opacity: 0; }
</style>
