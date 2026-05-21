# 📌 Idea Vault

A full-stack web application where users can create, explore, and interact with startup ideas. Built using Next.js, Node.js, Express, and MongoDB.

---

## 🚀 Features

- Create and share startup ideas
- Search ideas by title (case-insensitive)
- Filter ideas by category
- Filter by date range
- Comment system on ideas
- View user interactions (My Interactions page)
- Delete comments
- Idea details page with comments
- Authentication support

---

## 🛠️ Tech Stack

Frontend:
- Next.js (App Router)
- React
- Tailwind CSS
- Hero UI

Backend:
- Node.js
- Express.js

Database:
- MongoDB (Atlas)

---

## 📂 Project Structure
```bash
/frontend
  app
  components
  lib

/backend
  index.js
  routes
  db
```
---

## ⚙️ Installation

### Clone repository
```bash
git clone https://github.com/kabir31416/idea-vault.git
cd idea-vault
```
---

### Backend setup
```bash
cd backend
npm install
```
Create .env file:
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```
Run backend:
```bash
nodemon index.js
```
---

### Frontend setup
```bash
cd frontend
npm install
npm run dev
```
---

## 🌐 API Endpoints

Ideas:
```bash
GET    /ideas
POST   /ideas
GET    /ideas/:id
GET    /ideas/trending
GET    /my-ideas/:email
```
Comments:
```bash
POST   /comments
GET    /comments/:ideaId
PUT    /comments/:id
DELETE /comments/:id
```
My Interactions:
```bash
GET    /my-interactions/:email
```
---

## 🔍 Search & Filter

Example:
```bash
GET /ideas?search=ai&category=Tech&startDate=2026-01-01&endDate=2026-12-31
```
Features:
- Title search (case-insensitive)
- Category filter
- Optional date range filter

---

## 💬 Comment System

Each comment contains:
- userName
- userEmail
- userImage
- text
- createdAt

---

## 🧠 Core Logic

- MongoDB aggregation for My Interactions
- ObjectId relationship between ideas and comments
- Server-side filtering using query params
- REST API with Express

---

## 🐛 Fixed Issues

- Session undefined crash fixed
- ObjectId mismatch fixed
- Filter not working fixed
- Aggregation lookup fixed
- CORS and JSON parsing handled

---

## 🚀 Future Improvements

- Pagination system
- Infinite scroll
- Real-time comments (Socket.io)
- Like system for ideas
- Notification system
- Admin dashboard

---

## 👨‍💻 Author

Sahariar Kabir  
Full Stack Developer

---

## 📄 License

Free to use for learning and personal projects.
