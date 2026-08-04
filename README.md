# 🍽️ RecipeFinder (React)

<p align="center">
  <a href="https://recipes-finder-webapp.netlify.app"><img src="https://img.shields.io/badge/Live_Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI" />
  <img src="https://img.shields.io/badge/Spoonacular_API-4CAF50?style=for-the-badge&logo=buffer&logoColor=white" alt="Spoonacular API" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/sachin-codes01/Recipe-Finder?style=flat-square&color=0f172a" alt="Last commit" />
  <img src="https://img.shields.io/github/languages/top/sachin-codes01/Recipe-Finder?style=flat-square&color=f7df1e" alt="Top language" />
  <img src="https://img.shields.io/github/repo-size/sachin-codes01/Recipe-Finder?style=flat-square&color=38bdf8" alt="Repo size" />
</p>

A modern and responsive **Recipe Finder App** built using **React** and the **Spoonacular API**.  
This project demonstrates **API integration, dynamic search, recipe detail pages, dark mode, skeleton loading states, and component-based architecture** in a real-world React application.

---

🌐 **Live Demo:** [recipes-finder-webapp.netlify.app](https://recipes-finder-webapp.netlify.app/)

---

## 📸 Screenshot

![RecipeFinder Screenshot](public/Recipies.png)

---

## 🚀 Features

* 🔍 **Smart Search** — Debounced live search across thousands of recipes
* 🏠 **Landing Home Page** — Hero grid, feature cards, cuisine filters, quick picks, testimonials, and footer
* 📋 **Recipe Dashboard** — Grid of recipe cards with health scores, cost in INR, cook time, and dietary tags
* 📄 **Recipe Detail Page** — Full ingredient list, nutrition scores, dietary tags, and source links
* 🌙 **Dark Mode** — Persistent dark/light toggle via the navbar menu
* ⏳ **Loading & Error States** — Spinner while fetching, graceful error and empty-state handling
* 💸 **Price in INR** — Price-per-serving auto-converted from USD to ₹
* 🏷️ **Dietary Tags** — Gluten Free, Dairy Free, Vegan, Vegetarian, Very Healthy, Budget
* 📱 **Fully Responsive** — Works across mobile, tablet, and desktop

---

## 🛠️ Technologies Used

* React
* JavaScript (ES6+)
* Tailwind CSS
* HTML5
* Spoonacular API (`spoonacular.com`)
* Vite (build tool)

---

## 📂 Project Structure

```
RecipeFinder/
│
├── public/
│   └── Recipies.png
│   └── chicken.jpg
│   └── pasta.jpg
│   └── salad.jpg
│   └── desert.JPG
│   └── soup.jpg
│   └── vegan.jpg
│   └── pizza.jpg
│
├── src/
│   ├── components/
│   │   ├── Api.jsx           ← Spoonacular API fetching logic
│   │   ├── Dashboard.jsx     ← Recipe search results grid
│   │   ├── Food_Page.jsx     ← Individual recipe detail view
│   │   └── Home.jsx          ← Landing page + Navbar
│   │
│   ├── App.jsx               ← Root component & routing state
│   └── main.jsx
│
├── .env
├── index.html
└── package.json
```

---

## ▶️ Run the Project

```bash
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the root of your project and add your Spoonacular API key:

```
VITE_SPOONACULAR_API_KEY=your_api_key_here
```

Get your free API key at [https://spoonacular.com/food-api](https://spoonacular.com/food-api)

---

## 💡 Key Concepts Used

* React Hooks (**useState, useEffect, useRef, useCallback**)
* Async/Await & Fetch API
* Environment Variables with **Vite (`import.meta.env`)**
* Debounced Search Input
* Conditional Rendering & Error Handling
* Component-based Architecture
* Dark Mode Toggle via State
* Responsive Grid Layouts with Tailwind CSS
* `dangerouslySetInnerHTML` for API-provided HTML summaries

---

## 🧩 Component Overview

| Component | Responsibility |
|-----------|---------------|
| `App.jsx` | Global state (search, selected food, dark mode), renders correct view |
| `Api.jsx` | Fetches recipes from Spoonacular on search change, handles errors |
| `Home.jsx` + `Navbar` | Landing page with hero grid, filters, cuisines, reviews, footer |
| `Dashboard.jsx` | Displays search results as a responsive card grid |
| `Food_Page.jsx` | Full recipe detail: image, stats, ingredients, source links |

---

## 👨‍💻 Author

**Sachin**  
[https://github.com/sachin-codes01](https://github.com/sachin-codes01)