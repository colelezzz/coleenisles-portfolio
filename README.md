<a id="readme-top"></a>

<div align="center">

  <h3>Coleen Isles — Personal Portfolio</h3>

  <p><em>Where structure meets creativity — built by someone who manages the plan and writes the code.</em></p>

  <a href="#-getting-started">Get Started</a> &nbsp;·&nbsp;
  <a href="#-features">Features</a> &nbsp;·&nbsp;
  <a href="#-contact">Contact</a>

</div>

---

## 👋 Hey there!

This is the source code for my **personal portfolio** — a place I built from scratch to show who I am, what I do, and how I think.

I'm **Marifiel Coleen L. Isles**, a 4th-year BS Information Technology student at **PUP Sto. Tomas Campus**, graduating 2026. I live at the intersection of **project management** and **front-end development** — I help teams stay organized *and* build the interfaces they ship.

This portfolio reflects exactly that: thoughtful structure, clean code, and just enough flair to make it memorable. ✨

---

## ✦ Features

- 🌌 **Animated particle mesh** background with glowing orbs — built on `<canvas>`
- 🌠 **Comet-trail cursor** with click burst effect *(desktop only)*
- ⚡ **Smooth section switching** — no page reloads, just clean fades
- 🗂 **Portfolio filter**, animated skill bars, and achievement counters
- 📬 **Working contact form** via EmailJS — no backend needed
- 📱 **Fully responsive** — bottom nav on mobile, top nav on desktop

---

## 🗂 Project Structure

```
portfolio/
├── index.html          ← All five sections live here (Home, About, Projects, Skills, Contact)
├── style.css           ← Dark theme, animations, responsive layout — all in one file
├── script.js           ← Canvas magic, nav logic, EmailJS, portfolio filter
└── assets/
    ├── images/
    │   ├── portfolioLogo.png   ← Tab icon + nav logo
    │   └── image1.png          ← Profile photo
    └── files/
        └── IslesCV.pdf         ← Downloadable CV
```

> **No frameworks. No build tools. No node_modules.** Just open `index.html` and go. 🚀

---

## 🚀 Getting Started

### 1 — Clone it

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

Then open `index.html` in your browser — or use **Live Server** in VS Code for hot reload.

### 2 — Set up the contact form

The form uses [EmailJS](https://www.emailjs.com/) so you receive messages without any server. Quick setup:

1. Sign up free at [emailjs.com](https://www.emailjs.com/)
2. Create an **Email Service** → grab the **Service ID**
3. Create an **Email Template** → grab the **Template ID**
4. Go to **Account → API Keys** → copy your **Public Key**
5. Open `script.js` and plug them in:

```js
const EMAILJS_PUBLIC_KEY  = 'your_key_here';
const EMAILJS_SERVICE_ID  = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
```

Done! 🎉

---

## 🛠 Built With

Intentionally **vanilla** — no React, no Tailwind, no bundlers. Just the fundamentals, done well.

| | Technology | Purpose |
|---|---|---|
| [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) | **HTML5** | Semantic structure, single-page architecture |
| [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) | **CSS3** | Custom properties, keyframe animations, responsive grid & flex |
| [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | **Vanilla JavaScript** | Canvas API, DOM manipulation, event-driven navigation |
| [![EmailJS](https://img.shields.io/badge/EmailJS-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](https://www.emailjs.com/) | **EmailJS** | Serverless contact form delivery |
| [![FontAwesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com/) | **Font Awesome 6** | Icons throughout the UI |
| [![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://fonts.google.com/) | **Google Fonts** | DM Serif Display + DM Sans |

---

## 📬 Contact

Got an opportunity, a project, or just want to say hi?

**Marifiel Coleen L. Isles**
📍 Tiaong, Quezon, Philippines
📧 islesleen@gmail.com

[![GitHub](https://img.shields.io/badge/GitHub-colelezzz-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/colelezzz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-coleen--isles-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/coleen-isles-17o4o611)
[![Facebook](https://img.shields.io/badge/Facebook-coleen.isles-1877F2?style=flat-square&logo=facebook&logoColor=white)](https://www.facebook.com/coleen.isles)
[![X / Twitter](https://img.shields.io/badge/X-coleenislesss-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/coleenislesss?s=21)

---

<div align="center">
  <sub>Designed & developed with 💜 by Coleen Isles · PUP STC · 2026</sub>
</div>

<p align="right"><a href="#readme-top">↑ back to top</a></p>