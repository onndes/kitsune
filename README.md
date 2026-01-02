# 🦊 Kitsune

Kitsune is an **unfinished, non-commercial side project** that I worked on in the past while learning and experimenting with modern frontend development.

The project was developed **too quickly and with partial understanding**, so it should be treated as a **work in progress and learning artifact**, not a production-ready application.

I plan to return to this project later, review the codebase, refactor key parts, and continue development more consciously.

---

## 🧩 Project Overview

Kitsune consists of **two separate applications**:

### 1. Client / Website
- Rewritten using **Next.js**
- Intended to be a public-facing storefront or product website

### 2. Admin Panel
- Built with **React**
- Intended for managing products, orders, and internal data

Both parts were developed at different stages and with different levels of experience.

---

## 🚧 Current Status

This project is **not finished** and **not actively maintained** at the moment.

Current state:
- Project structure is in place
- Core pages and components exist
- Firebase configuration and authentication logic were partially implemented
- One of the last implemented features was **shipping provider selection**, including city and branch selection for **Nova Poshta (Ukraine)**
- Planned features such as **payment integration**, full checkout flow, and data validation were never completed
- The exact state of some features is currently unknown and will require review when development resumes

This repository exists mainly for **reference and future continuation**.

---

## 🛠️ Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Firebase** (Authentication / Database / Configuration)
- Basic state management experiments (Context / Redux)
- ESLint and Prettier (partially configured)

The stack reflects the learning process rather than final architectural decisions.

---

## ▶️ Running the Project (Optional)

> ⚠️ The project may require additional configuration and cleanup to run correctly.

### Installation

```bash
git clone https://github.com/onndes/kitsune.git
cd kitsune
npm install
# or
yarn install