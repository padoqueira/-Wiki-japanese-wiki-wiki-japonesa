---
title: Apoiar a Wiki
---

<style>

/* =========================================================
   APOIAR — 日本語 WIKI
   CSS local desta página
   ========================================================= */

.jp-support-page {
  --support-red: #eb6a4d;
  --support-pink: #f3a6b7;
  --support-purple: #6366f1;
  --support-purple-2: #818cf8;
}

/* HERO */

.jp-support-hero {
  position: relative;
  overflow: hidden;

  margin: .5rem 0 1rem;
  padding: clamp(1.6rem, 4vw, 3rem);

  border: 1px solid rgba(235,106,77,.25);
  border-radius: 20px;

  background:
    radial-gradient(
      circle at 90% 10%,
      rgba(235,106,77,.16),
      transparent 34%
    ),
    radial-gradient(
      circle at 75% 110%,
      rgba(243,166,183,.13),
      transparent 32%
    ),
    var(--light);

  box-shadow:
    0 15px 35px rgba(0,0,0,.06);
}

.jp-support-hero::after {
  content: "♥";

  position: absolute;

  right: 5%;
  top: 50%;

  transform: translateY(-53%);

  color: rgba(235,106,77,.055);

  font-size: clamp(8rem,18vw,14rem);
  font-weight: 900;

  pointer-events: none;
  user-select: none;
}

.jp-support-badge {
  position: relative;
  z-index: 2;

  display: inline-block;

  margin-bottom: .75rem;
  padding: .28rem .62rem;

  border: 1px solid rgba(235,106,77,.25);
  border-radius: 999px;

  background: rgba(235,106,77,.08);

  color: var(--support-red);

  font-size: .68rem;
  font-weight: 800;

  letter-spacing: .1em;
}

.jp-support-title {
  position: relative;
  z-index: 2;

  margin: 0;

  color: var(--dark);

  font-family: "Noto Serif JP", serif;
  font-size: clamp(2.3rem,5vw,4.3rem);
  font-weight: 800;

  line-height: 1.05;
  letter-spacing: -.05em;
}

.jp-support-lead {
  position: relative;
  z-index: 2;

  max-width: 680px;

  margin: .9rem 0 .25rem;

  color: var(--dark);

  font-size: 1.08rem;
  line-height: 1.5;
}

.jp-support-description {
  position: relative;
  z-index: 2;

  max-width: 720px;

  margin: 0;

  color: var(--gray);

  font-size: .84rem;
  line-height: 1.65;
}


/* =========================================================
   VALORES
   ========================================================= */

.jp-support-section-label {
  margin: 1.25rem 0 .55rem;

  color: var(--gray);

  font-size: .67rem;
  font-weight: 800;

  letter-spacing: .11em;
}

.jp-amount-links {
  height: 0;
}

.jp-amount-links + p {
  display: grid;

  grid-template-columns:
    repeat(4,minmax(0,1fr));

  gap: .65rem;

  margin: 0 !important;
}

.jp-amount-links + p > a {
  position: relative;

  display: flex;

  flex-direction: column;

  align-items: flex-start;
  justify-content: center;

  min-height: 5.3rem;

  padding: .9rem 1rem;

  border: 1px solid var(--lightgray);
  border-radius: 14px;

  background: var(--light);

  color: var(--dark);

  font-size: 1.1rem;
  font-weight: 800;

  text-decoration: none !important;

  transition:
    transform .15s ease,
    border-color .15s ease,
    box-shadow .15s ease;
}

.jp-amount-links + p > a::after {
  display: block;

  margin-top: .12rem;

  color: var(--gray);

  font-size: .65rem;
  font-weight: 500;
}

.jp-amount-links + p > a:nth-child(1)::after {
  content: "Um pequeno apoio";
}

.jp-amount-links + p > a:nth-child(2)::after {
  content: "Ajuda a manter a wiki";
}

.jp-amount-links + p > a:nth-child(3)::after {
  content: "Ajuda a criar conteúdo";
}

.jp-amount-links + p > a:nth-child(4)::after {
  content: "Escolhe o teu valor";
}

.jp-amount-links + p > a:nth-child(2) {
  border-color: rgba(235,106,77,.35);

  background:
    linear-gradient(
      135deg,
      rgba(235,106,77,.08),
      rgba(243,166,183,.05)
    );
}

.jp-amount-links + p > a:hover {
  transform: translateY(-3px);

  border-color:
    rgba(235,106,77,.45);

  box-shadow:
    0 12px 26px rgba(0,0,0,.08);
}


/* =========================================================
   PARA ONDE VAI O APOIO
   ========================================================= */

.jp-use-grid {
  display: grid;

  grid-template-columns:
    repeat(3,minmax(0,1fr));

  gap: .65rem;

  margin-top: .65rem;
}

.jp-use-card {
  padding: .9rem;

  border: 1px solid var(--lightgray);
  border-radius: 13px;

  background: var(--light);
}

.jp-use-icon {
  display: grid;

  width: 2rem;
  height: 2rem;

  margin-bottom: .55rem;

  place-items: center;

  border-radius: 8px;

  color: white;

  background:
    linear-gradient(
      135deg,
      var(--support-purple),
      var(--support-purple-2)
    );

  font-size: .75rem;
  font-weight: 800;
}

.jp-use-card strong {
  display: block;

  color: var(--dark);

  font-size: .78rem;
}

.jp-use-card p {
  margin: .15rem 0 0 !important;

  color: var(--gray);

  font-size: .67rem;
  line-height: 1.45;
}


/* =========================================================
   APOIOS GRANDES / PARCERIAS
   ========================================================= */

.jp-partnership {
  display: grid;

  grid-template-columns:
    auto minmax(0,1fr);

  align-items: center;

  gap: .9rem;

  margin-top: 1rem;
  padding: 1rem;

  border: 1px solid rgba(99,102,241,.23);
  border-radius: 14px;

  background:
    radial-gradient(
      circle at 95% 0%,
      rgba(99,102,241,.11),
      transparent 40%
    ),
    var(--light);
}

.jp-partnership-icon {
  display: grid;

  width: 2.6rem;
  height: 2.6rem;

  place-items: center;

  border-radius: 10px;

  color: white;

  background:
    linear-gradient(
      135deg,
      var(--support-purple),
      var(--support-purple-2)
    );

  font-weight: 800;
}

.jp-partnership-label {
  display: block;

  color: var(--support-purple);

  font-size: .63rem;
  font-weight: 800;

  letter-spacing: .09em;
}

.jp-partnership-title {
  display: block;

  color: var(--dark);

  font-size: .85rem;
  font-weight: 750;
}

.jp-partnership-text {
  margin-top: .12rem;

  color: var(--gray);

  font-size: .68rem;
  line-height: 1.45;
}

.jp-contact-link {
  height: 0;
}

.jp-contact-link + p {
  margin: .55rem 0 1rem !important;
}

.jp-contact-link + p > a {
  display: inline-flex;

  align-items: center;

  padding: .55rem .9rem;

  border: 1px solid rgba(99,102,241,.27);
  border-radius: 9px;

  background: rgba(99,102,241,.07);

  color: var(--dark);

  font-size: .74rem;
  font-weight: 750;

  text-decoration: none !important;

  transition:
    transform .15s ease,
    border-color .15s ease;
}

.jp-contact-link + p > a:hover {
  transform: translateY(-2px);

  border-color:
    rgba(99,102,241,.5);
}


/* =========================================================
   GRATUITA
   ========================================================= */

.jp-free {
  margin-top: .4rem;
  padding: .9rem 1rem;

  border-top: 1px solid var(--lightgray);
  border-bottom: 1px solid var(--lightgray);

  color: var(--gray);

  font-size: .72rem;
  line-height: 1.55;
}

.jp-free strong {
  color: var(--dark);
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 760px) {

  .jp-support-hero {
    padding: 1.4rem 1.1rem;
  }

  .jp-support-hero::after {
    right: -1rem;
  }

  .jp-amount-links + p {
    grid-template-columns:
      repeat(2,minmax(0,1fr));
  }

  .jp-use-grid {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 430px) {

  .jp-amount-links + p {
    grid-template-columns: 1fr;
  }

}

</style>

<div class="jp-support-hero">

<span class="jp-support-badge">
APOIA A 日本語 WIKI
</span>

<div class="jp-support-title">
Ajuda a wiki a crescer.
</div>

<p class="jp-support-lead">
A 日本語 Wiki é gratuita e a ideia é que <strong>continue assim.</strong>
</p>

<p class="jp-support-description">
Se o projeto te ajudou, podes contribuir para manter a infraestrutura,
melhorar páginas existentes e permitir que cada vez mais conteúdo
sobre japonês seja documentado em português.
</p>

</div>


<div class="jp-support-section-label">
ESCOLHE UM APOIO
</div>

<div class="jp-amount-links"></div>

[€3](https://example.com/apoio-3) [€5](https://example.com/apoio-5) [€10](https://example.com/apoio-10) [Outro valor](https://example.com/apoio-outro)


<div class="jp-support-section-label">
PARA ONDE VAI O APOIO?
</div>

<div class="jp-use-grid">

<div class="jp-use-card">

<div class="jp-use-icon">維</div>

<strong>Infraestrutura</strong>

<p>
Domínio, hospedagem, ferramentas e tudo o que mantém a wiki online.
</p>

</div>

<div class="jp-use-card">

<div class="jp-use-icon">改</div>

<strong>Revisão e melhoria</strong>

<p>
Corrigir páginas, melhorar explicações, verificar informações e expandir conteúdo.
</p>

</div>

<div class="jp-use-card">

<div class="jp-use-icon">新</div>

<strong>Conteúdo novo</strong>

<p>
Novas unidades, palavras, estruturas, kanji, exemplos e futuros recursos.
</p>

</div>

</div>


<div class="jp-partnership">

<div class="jp-partnership-icon">
✦
</div>

<div>

<span class="jp-partnership-label">
APOIOS MAIORES E PARCERIAS
</span>

<span class="jp-partnership-title">
Queres contribuir de outra forma?
</span>

<div class="jp-partnership-text">
Para apoios de valor elevado, patrocínios, parcerias ou propostas profissionais,
entra em contacto diretamente.
</div>

</div>

</div>

<div class="jp-contact-link"></div>

[Entrar em contacto →](mailto:juliofilhowork@gmail.com)


<div class="jp-free">

<strong>Apoiar é completamente opcional.</strong>

Todo o conteúdo principal da wiki continuará disponível gratuitamente.
Não precisas pagar para aprender, consultar páginas ou contribuir com o projeto.

</div>


[[index|← Voltar para a página inicial]]