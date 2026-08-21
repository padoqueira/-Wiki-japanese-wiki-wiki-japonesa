---
title: 日本語テスト
publish: true
---

<style>

/* =========================================================
   HOME
   ========================================================= */

.jp-hero {
  position: relative;
  overflow: hidden;

  margin: .5rem 0 1rem;
  padding: 2.4rem 2.2rem;

  border: 1px solid var(--lightgray);
  border-radius: 20px;

  background:
    radial-gradient(circle at 90% 10%, rgba(99,102,241,.18), transparent 34%),
    radial-gradient(circle at 80% 110%, rgba(243,166,183,.12), transparent 34%),
    var(--light);

  box-shadow: 0 15px 35px rgba(0,0,0,.06);
}

.jp-hero::after {
  content: "日";

  position: absolute;
  right: 3%;
  top: 50%;

  transform: translateY(-52%);

  color: rgba(99,102,241,.06);

  font-family: "Noto Serif JP", serif;
  font-size: clamp(8rem,18vw,15rem);
  font-weight: 800;
  line-height: 1;

  pointer-events: none;
}

.jp-badge {
  position: relative;
  z-index: 2;

  display: inline-block;

  padding: .28rem .62rem;
  margin-bottom: .8rem;

  border: 1px solid rgba(99,102,241,.25);
  border-radius: 999px;

  background: rgba(99,102,241,.08);
  color: var(--secondary);

  font-size: .68rem;
  font-weight: 800;
  letter-spacing: .1em;
}

.jp-title {
  position: relative;
  z-index: 2;

  margin: 0;

  color: var(--dark);

  font-family: "Noto Serif JP", serif;
  font-size: clamp(3.2rem,7vw,5.5rem);
  font-weight: 800;

  line-height: 1;
  letter-spacing: -.06em;
}

.jp-title rt {
  color: var(--gray);
  font-size: .17em;
  letter-spacing: .1em;
}

.jp-lead {
  position: relative;
  z-index: 2;

  max-width: 680px;

  margin: 1rem 0 .25rem;

  color: var(--dark);

  font-size: 1.2rem;
  line-height: 1.45;
}

.jp-description {
  position: relative;
  z-index: 2;

  max-width: 710px;

  margin: 0;

  color: var(--gray);

  font-size: .88rem;
  line-height: 1.65;
}


/* =========================================================
   BOTÕES MARKDOWN
   ========================================================= */

.jp-main-links {
  height: 0;
}

.jp-main-links + p {
  display: flex;
  flex-wrap: wrap;

  gap: .6rem;

  margin: 0 0 1rem !important;
}

.jp-main-links + p > a {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-height: 2.65rem;

  padding: .58rem 1rem;

  border: 1px solid var(--lightgray);
  border-radius: 10px;

  background: var(--light);
  color: var(--dark);

  font-size: .8rem;
  font-weight: 750;

  text-decoration: none !important;

  transition:
    transform .15s ease,
    box-shadow .15s ease,
    border-color .15s ease;
}

.jp-main-links + p > a:first-child {
  color: white !important;
  border-color: transparent;

  background:
    linear-gradient(
      135deg,
      #6366f1,
      #818cf8
    );

  box-shadow:
    0 9px 22px rgba(99,102,241,.24);
}

.jp-main-links + p > a:hover {
  transform: translateY(-2px);
  border-color: rgba(99,102,241,.4);
}


/* =========================================================
   DUOLINGO
   ========================================================= */

.jp-duolingo {
  display: grid;

  grid-template-columns: auto minmax(0,1fr);

  align-items: center;

  gap: .9rem;

  padding: 1rem;

  border: 1px solid rgba(88,204,2,.25);
  border-radius: 15px;

  background:
    radial-gradient(
      circle at 100% 0,
      rgba(88,204,2,.11),
      transparent 40%
    ),
    var(--light);
}

.jp-duolingo-icon {
  display: grid;

  width: 2.7rem;
  height: 2.7rem;

  place-items: center;

  border-radius: 11px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #58cc02,
      #75dd22
    );

  font-size: 1.05rem;
  font-weight: 900;

  box-shadow:
    0 8px 18px rgba(88,204,2,.20);
}

.jp-green-label {
  display: block;

  color: #58a700;

  font-size: .64rem;
  font-weight: 800;

  letter-spacing: .09em;
}

.jp-duolingo-title {
  color: var(--dark);

  font-size: .94rem;
  font-weight: 750;
}

.jp-duolingo-text {
  margin-top: .15rem;

  color: var(--gray);

  font-size: .7rem;
}


/* =========================================================
   BOTÕES DO DUOLINGO
   ========================================================= */

.jp-duolingo-links {
  height: 0;
}

.jp-duolingo-links + p {
  display: flex;
  flex-wrap: wrap;

  gap: .55rem;

  margin: .6rem 0 1rem !important;
}

.jp-duolingo-links + p > a {
  display: inline-flex;

  align-items: center;

  padding: .52rem .85rem;

  border: 1px solid var(--lightgray);
  border-radius: 9px;

  background: var(--light);
  color: var(--dark);

  font-size: .75rem;
  font-weight: 750;

  text-decoration: none !important;

  transition:
    transform .15s ease,
    border-color .15s ease;
}

.jp-duolingo-links + p > a:first-child {
  border-color: rgba(88,204,2,.3);
  background: rgba(88,204,2,.07);
}

.jp-duolingo-links + p > a:hover {
  transform: translateY(-2px);
}


/* =========================================================
   EXPLORAR
   ========================================================= */

.jp-explore-title {
  margin: 1.2rem 0 .55rem;

  color: var(--gray);

  font-size: .67rem;
  font-weight: 800;

  letter-spacing: .1em;
}

.jp-explore-links {
  height: 0;
}

.jp-explore-links + p {
  display: grid;

  grid-template-columns:
    repeat(3,minmax(0,1fr));

  gap: .65rem;

  margin: 0 0 1rem !important;
}

.jp-explore-links + p > a {
  position: relative;

  display: flex;

  align-items: center;

  min-height: 4.7rem;

  padding: .85rem .9rem .85rem 3.75rem;

  border: 1px solid var(--lightgray);
  border-radius: 14px;

  background: var(--light);
  color: var(--dark);

  font-size: .82rem;
  font-weight: 750;

  text-decoration: none !important;

  transition:
    transform .15s ease,
    border-color .15s ease,
    box-shadow .15s ease;
}

.jp-explore-links + p > a::before {
  position: absolute;

  left: .85rem;
  top: 50%;

  display: grid;

  width: 2.25rem;
  height: 2.25rem;

  place-items: center;

  transform: translateY(-50%);

  border-radius: 9px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #6366f1,
      #818cf8
    );

  font-family: "Noto Serif JP", serif;
}

.jp-explore-links + p > a:nth-child(1)::before {
  content: "文";
}

.jp-explore-links + p > a:nth-child(2)::before {
  content: "語";
}

.jp-explore-links + p > a:nth-child(3)::before {
  content: "字";
}

.jp-explore-links + p > a:hover {
  transform: translateY(-3px);

  border-color: rgba(99,102,241,.35);

  box-shadow:
    0 10px 24px rgba(0,0,0,.07);
}


/* =========================================================
   APOIO
   ========================================================= */

.jp-support {
  display: grid;

  grid-template-columns: auto minmax(0,1fr);

  align-items: center;

  gap: .9rem;

  padding: 1rem;

  border: 1px solid rgba(235,106,77,.27);
  border-radius: 15px;

  background:
    radial-gradient(
      circle at 95% 0%,
      rgba(235,106,77,.15),
      transparent 40%
    ),
    var(--light);
}

.jp-support-icon {
  display: grid;

  width: 2.7rem;
  height: 2.7rem;

  place-items: center;

  border-radius: 11px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #eb6a4d,
      #f3a6b7
    );

  box-shadow:
    0 9px 20px rgba(235,106,77,.22);
}

.jp-red-label {
  display: block;

  color: #eb6a4d;

  font-size: .64rem;
  font-weight: 800;

  letter-spacing: .09em;
}

.jp-support-title {
  color: var(--dark);

  font-size: .9rem;
  font-weight: 750;
}

.jp-support-text {
  margin-top: .15rem;

  color: var(--gray);

  font-size: .7rem;
}


/* botão apoio */

.jp-support-link {
  height: 0;
}

.jp-support-link + p {
  margin: .6rem 0 1rem !important;
}

.jp-support-link + p > a {
  display: inline-flex;

  align-items: center;

  padding: .55rem .9rem;

  border-radius: 9px;

  color: white !important;

  background:
    linear-gradient(
      135deg,
      #eb6a4d,
      #ef8291
    );

  font-size: .75rem;
  font-weight: 800;

  text-decoration: none !important;

  box-shadow:
    0 8px 18px rgba(235,106,77,.19);

  transition:
    transform .15s ease;
}

.jp-support-link + p > a:hover {
  transform: translateY(-2px);
}


/* =========================================================
   COMUNIDADE
   ========================================================= */

.jp-community {
  padding: .8rem .15rem .15rem;

  border-top: 1px solid var(--lightgray);

  color: var(--gray);

  font-size: .72rem;
}

.jp-community strong {
  color: var(--dark);
}

.jp-community-links {
  height: 0;
}

.jp-community-links + p {
  margin: .4rem 0 0 !important;

  font-size: .72rem;
}

.jp-community-links + p > a {
  font-weight: 750;
  text-decoration: none !important;
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 760px) {

  .jp-hero {
    padding: 1.4rem 1.1rem;
  }

  .jp-hero::after {
    right: -1rem;
  }

  .jp-main-links + p {
    display: grid;
  }

  .jp-main-links + p > a {
    width: 100%;
  }

  .jp-explore-links + p {
    grid-template-columns: 1fr;
  }

  .jp-duolingo-links + p {
    display: grid;
  }

}

</style>


<div class="jp-hero">
  <div class="jp-badge">日本語 WIKI</div>

  <div class="jp-title">
    <ruby>日本語<rt>にほんご</rt></ruby>
  </div>

  <p class="jp-lead">
    Aprende japonês e <strong>entende o que estás a aprender.</strong>
  </p>

  <p class="jp-description">
    Uma wiki gratuita, colaborativa e em constante evolução,
    criada para acompanhar o japonês do Duolingo e aprofundar
    cada conceito muito além de uma simples tradução.
  </p>
</div>

<div class="jp-main-links"></div>

[Começar pelo Duolingo →](https://japanese-wiki.juliofilhowork.workers.dev/duolingo/) [[duolingo/セッション1 ユニット7|Continuar a estudar]]


<div class="jp-duolingo">
  <div class="jp-duolingo-icon">学</div>

  <div>
    <span class="jp-green-label">PERCURSO DUOLINGO</span>
    <div class="jp-duolingo-title">セッション1 ユニット7</div>

    <div class="jp-duolingo-text">
      Cada unidade registra apenas o conteúdo novo.
      O que já foi aprendido não é repetido.
    </div>
  </div>
</div>

<div class="jp-duolingo-links"></div>

[Ver percurso completo →](https://japanese-wiki.juliofilhowork.workers.dev/duolingo/) [[duolingo/セッション1 ユニット7|Abrir ユニット7 →]]


<div class="jp-explore-title">EXPLORAR</div>

<div class="jp-explore-links"></div>

[[Gramática]] [[Vocabulário]] [[Kanji]]


<div class="jp-support">
  <div class="jp-support-icon">♥</div>

  <div>
    <span class="jp-red-label">APOIA A WIKI</span>
    <div class="jp-support-title">Ajuda este projeto a crescer</div>

    <div class="jp-support-text">
      A wiki continuará gratuita. O teu apoio ajuda a manter
      o projeto, rever conteúdo e documentar cada vez mais japonês.
    </div>
  </div>
</div>

<div class="jp-support-link"></div>

[Apoiar o projeto →](https://japanese-wiki.juliofilhowork.workers.dev/)


<div class="jp-community">
  <strong>Uma wiki viva.</strong>
  Encontraste um erro, algo em falta ou uma explicação que pode ser melhor?
</div>

<div class="jp-community-links"></div>

[[Contribuir]] · [[Reportar|Reportar erro]]

