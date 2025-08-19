<script setup lang="ts">
import FormularioMatricula from "./components/FormularioMatricula.vue";
</script>

<template>
  <div class="min-h-dvh bg-gradient-to-b from-white to-slate-50">
    <header class="border-b bg-white/70 backdrop-blur">
      <div class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">M</span>
          <div>
            <h1 class="text-lg font-semibold leading-tight">Matrículas On‑line</h1>
            <p class="text-xs text-slate-500">Protótipo Vue 3 + Express/TS</p>
          </div>
        </div>
        <span class="badge">
          <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
          API: http://localhost:3333
        </span>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-10">
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Card principal -->
        <section class="rounded-2xl border bg-white p-6 shadow-soft">
          <h2 class="text-xl font-bold mb-1">Realize sua matrícula</h2>
          <p class="text-sm text-slate-600 mb-6">Preencha seus dados e selecione um curso disponível.</p>
          <FormularioMatricula />
        </section>

        <!-- Card lateral com informações -->
        <aside class="rounded-2xl border bg-white p-6 shadow-soft">
          <h3 class="text-base font-semibold mb-3">Como funciona</h3>
          <ol class="space-y-3 text-sm text-slate-700">
            <li>1. Escolha um curso da lista.</li>
            <li>2. Informe seu nome e e‑mail.</li>
            <li>3. Envie e receba o código de matrícula.</li>
          </ol>

          <div class="mt-6">
            <h4 class="text-sm font-semibold mb-2">Boas práticas</h4>
            <ul class="list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li>Validações imediatas e mensagens claras</li>
              <li>Acessibilidade com rótulos e aria‑attrs</li>
              <li>Feedback visual de carregamento/sucesso</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>

    <footer class="mt-10 border-t bg-white">
      <div class="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-500">
        Feito com Vue 3 + Tailwind • Protótipo acadêmico
      </div>
    </footer>
  </div>
</template>
