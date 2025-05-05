# 🎬 Movie Ticket Cart

An interactive movie ticket booking application built with HTML, CSS, JavaScript, and jQuery. This project allows users to browse a catalog of hardcoded movies, view detailed information in modals, and manage a shopping cart with full functionality using localStorage.

## 🛠 Features

- 💳 Add movie tickets to cart with "BOOK TICKET" button
- 🗂 View detailed movie information in modals
- 🔄 Increase, decrease, or remove tickets from the cart
- 📦 Cart state is saved using `localStorage` for persistence
- 📊 Real-time cart summary including item count and total cost
- 🖼 Dynamic UI updates with jQuery

## 📁 Project Structure

```
index.html          # Main HTML layout
style.css           # Optional styling file
script.js           # All application logic
/images             # Movie poster images
```

## 📸 UI Overview

- Bootstrap cards for movies
- Modal popups for detailed movie info
- Table layout for cart with item control buttons

## 🔍 Sample Movie Data

```javascript
{
  id: 1,
  name: "Spiderman",
  director: "Sam Raimi",
  runtime: "2h 1m",
  release_year: 2002,
  price: 20,
  inCart: 0
}
```

## 🧩 Technologies Used

- HTML5, CSS3
- JavaScript (ES6)
- jQuery
- Bootstrap 5
- Font Awesome for icons
- `localStorage` for state management

## 🚀 Getting Started

1. Clone the repo
2. Open `index.html` in your browser
3. Browse movies and book tickets!

## 📄 License

This project is licensed under the MIT License.

---

Enjoy your movie night! 🍿
