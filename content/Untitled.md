# 🚀 Teste portátil — Markdown + HTML + CSS

Este ficheiro foi feito para testar **Obsidian** e **SiYuan** sem depender de um `<style>` dentro da nota.

> No Obsidian, o HTML abaixo usa apenas HTML real dentro dos blocos HTML e CSS inline com `style=""`.

---

## 1. Markdown normal

Isto é **negrito**.

Isto é *itálico*.

Isto é ~~riscado~~.

Isto é `código inline`.

> Esta é uma citação Markdown normal.

- Item A
- Item B
  - Subitem B.1
  - Subitem B.2

---

## 2. Hero HTML + CSS inline

<div style="
  padding: 32px;
  border-radius: 20px;
  background: linear-gradient(135deg, #6d28d9, #2563eb, #0891b2);
  color: white;
  text-align: center;
  box-shadow: 0 12px 35px rgba(0,0,0,0.25);
  margin: 24px 0;
">

  <h2 style="
    margin: 0 0 12px 0;
    font-size: 32px;
  ">
    🧪 Teste extremo
  </h2>

  <p style="
    margin: 8px 0;
    font-size: 18px;
  ">
    Este conteúdo inteiro está em <strong>HTML real</strong>.
  </p>

  <p style="
    margin: 8px 0 20px 0;
    opacity: 0.9;
  ">
    Se este texto estiver num bloco com gradiente, CSS inline está a funcionar.
  </p>

  <div style="
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  ">
    <span style="
      padding: 7px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.18);
      font-weight: 700;
    ">
      Markdown
    </span>

    <span style="
      padding: 7px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.18);
      font-weight: 700;
    ">
      HTML
    </span>

    <span style="
      padding: 7px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.18);
      font-weight: 700;
    ">
      CSS
    </span>
  </div>

</div>

---

## 3. HTML inline

<div style="
  padding: 18px;
  border: 1px solid rgba(128,128,128,0.35);
  border-radius: 14px;
  margin: 20px 0;
">

  <p>
    <strong style="font-size: 22px;">
      Texto HTML maior
    </strong>
  </p>

  <p>
    <span style="color: #ef4444;">Vermelho</span>
    ·
    <span style="color: #22c55e;">Verde</span>
    ·
    <span style="color: #3b82f6;">Azul</span>
  </p>

  <p>
    <mark style="
      padding: 3px 7px;
      border-radius: 5px;
    ">
      Texto marcado com HTML
    </mark>
  </p>

  <p>
    H<sub>2</sub>O ·
    x<sup>2</sup> + y<sup>2</sup>
  </p>

</div>

---

## 4. Cards

<div style="
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin: 24px 0;
">

  <div style="
    padding: 20px;
    border-radius: 16px;
    border: 1px solid rgba(128,128,128,0.3);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  ">
    <h3 style="margin-top: 0;">
      🎮 Projeto
    </h3>

    <p>
      <strong>Nome:</strong> Yoku
    </p>

    <p>
      <strong>Estado:</strong> Desenvolvimento
    </p>

    <span style="
      display: inline-block;
      padding: 5px 10px;
      border-radius: 999px;
      background: #22c55e;
      color: #07130a;
      font-weight: 700;
    ">
      Ativo
    </span>
  </div>

  <div style="
    padding: 20px;
    border-radius: 16px;
    border: 1px solid rgba(128,128,128,0.3);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  ">
    <h3 style="margin-top: 0;">
      🇯🇵 Japonês
    </h3>

    <p>
      <strong>Nível:</strong> N5
    </p>

    <p>
      Objetivo: ler sem depender de tradução.
    </p>
  </div>

  <div style="
    padding: 20px;
    border-radius: 16px;
    border: 1px solid rgba(128,128,128,0.3);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  ">
    <h3 style="margin-top: 0;">
      💻 Programação
    </h3>

    <ul style="margin-bottom: 0;">
      <li>Kotlin</li>
      <li>Rust</li>
      <li>Python</li>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </div>

</div>

---

## 5. Botão HTML

<div style="
  text-align: center;
  margin: 25px 0;
">

  <button style="
    padding: 12px 22px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #7c3aed, #2563eb);
    color: white;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  ">
    🚀 Botão de teste
  </button>

</div>

---

## 6. Details / Summary

<details style="
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(128,128,128,0.35);
  margin: 20px 0;
">

  <summary style="
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
  ">
    👀 Carrega aqui
  </summary>

  <div style="
    padding-top: 15px;
  ">

    <h3>
      Conteúdo escondido
    </h3>

    <p>
      Se isto expandiu corretamente,
      <code>&lt;details&gt;</code>
      e
      <code>&lt;summary&gt;</code>
      funcionam.
    </p>

    <ul>
      <li>Item secreto</li>
      <li>Outro item</li>
      <li><strong>Negrito HTML</strong></li>
    </ul>

  </div>

</details>

---

## 7. Barra de progresso

<div style="
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(128,128,128,0.35);
  margin: 20px 0;
">

  <h3 style="margin-top: 0;">
    Progresso do projeto
  </h3>

  <div style="
    width: 100%;
    height: 22px;
    border-radius: 999px;
    background: rgba(128,128,128,0.25);
    overflow: hidden;
  ">

    <div style="
      width: 72%;
      height: 100%;
      background: linear-gradient(90deg, #22c55e, #06b6d4);
      border-radius: 999px;
    ">
    </div>

  </div>

  <p style="
    margin-bottom: 0;
    font-weight: 700;
  ">
    72% concluído
  </p>

</div>

---

## 8. Tabela HTML

<div style="
  overflow-x: auto;
  margin: 20px 0;
">

  <table style="
    width: 100%;
    border-collapse: collapse;
  ">

    <thead>
      <tr>
        <th style="
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid rgba(128,128,128,0.45);
        ">
          Projeto
        </th>

        <th style="
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid rgba(128,128,128,0.45);
        ">
          Estado
        </th>

        <th style="
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid rgba(128,128,128,0.45);
        ">
          Prioridade
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td style="
          padding: 12px;
          border-bottom: 1px solid rgba(128,128,128,0.25);
        ">
          Yoku
        </td>

        <td style="
          padding: 12px;
          border-bottom: 1px solid rgba(128,128,128,0.25);
        ">
          Em desenvolvimento
        </td>

        <td style="
          padding: 12px;
          border-bottom: 1px solid rgba(128,128,128,0.25);
        ">
          Alta
        </td>
      </tr>

      <tr>
        <td style="padding: 12px;">
          Servidor Minecraft
        </td>

        <td style="padding: 12px;">
          Ativo
        </td>

        <td style="padding: 12px;">
          Média
        </td>
      </tr>
    </tbody>

  </table>

</div>

---

## 9. Citação personalizada

<blockquote style="
  margin: 24px 0;
  padding: 18px 22px;
  border-left: 5px solid #8b5cf6;
  border-radius: 8px;
  background: rgba(139,92,246,0.1);
">

  <strong>
    💡 Ideia
  </strong>

  <p style="margin-bottom: 0;">
    Um bom sistema de notas deve permitir organizar ideias sem transformar sincronização numa profissão paralela.
  </p>

</blockquote>

---

## 10. Teclas

<div style="
  padding: 18px;
  border-radius: 14px;
  border: 1px solid rgba(128,128,128,0.3);
">

  Atalho:

  <kbd style="
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid rgba(128,128,128,0.55);
    box-shadow: 0 2px 0 rgba(128,128,128,0.35);
    font-family: monospace;
  ">
    Ctrl
  </kbd>

  +

  <kbd style="
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid rgba(128,128,128,0.55);
    box-shadow: 0 2px 0 rgba(128,128,128,0.35);
    font-family: monospace;
  ">
    Shift
  </kbd>

  +

  <kbd style="
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid rgba(128,128,128,0.55);
    box-shadow: 0 2px 0 rgba(128,128,128,0.35);
    font-family: monospace;
  ">
    P
  </kbd>

</div>

---

## 11. Ruby / furigana

<div style="
  text-align: center;
  padding: 28px;
  font-size: 32px;
">

  <ruby>
    日本語
    <rt style="font-size: 0.45em;">
      にほんご
    </rt>
  </ruby>

</div>

---

## 12. Fieldset

<fieldset style="
  padding: 20px;
  border-radius: 16px;
  border: 2px solid #6366f1;
  margin: 20px 0;
">

  <legend style="
    padding: 0 10px;
    font-weight: 700;
  ">
    🧪 Teste Fieldset
  </legend>

  <p>
    Se aparecer uma caixa com legenda, o HTML está a ser renderizado.
  </p>

</fieldset>

---

## 13. CSS inline em imagem falsa / bloco visual

<div style="
  width: 100%;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background:
    radial-gradient(circle at 20% 20%, rgba(168,85,247,0.9), transparent 35%),
    radial-gradient(circle at 80% 30%, rgba(59,130,246,0.9), transparent 35%),
    radial-gradient(circle at 50% 90%, rgba(6,182,212,0.8), transparent 40%),
    #111827;
  color: white;
  box-shadow: inset 0 0 80px rgba(0,0,0,0.35);
  margin: 24px 0;
">

  <div style="
    text-align: center;
    padding: 30px;
  ">

    <div style="
      font-size: 48px;
      margin-bottom: 8px;
    ">
      🎨
    </div>

    <strong style="
      font-size: 28px;
    ">
      HTML + CSS
    </strong>

    <p style="
      margin-bottom: 0;
      opacity: 0.8;
    ">
      Bloco visual sem imagem externa
    </p>

  </div>

</div>

---

## ✅ Checklist

- [ ] Markdown normal
- [ ] HTML inline
- [ ] `style=""` aplicado
- [ ] Gradiente
- [ ] Grid de cards
- [ ] `<details>`
- [ ] `<summary>`
- [ ] `<button>`
- [ ] `<table>`
- [ ] `<ruby>`
- [ ] `<fieldset>`
- [ ] `<kbd>`
- [ ] `<sub>`
- [ ] `<sup>`
- [ ] Funciona no Obsidian Live Preview
- [ ] Funciona no Obsidian Reading View
- [ ] Funciona/importa no SiYuan
- [ ] Exportação para Markdown preserva o conteúdo