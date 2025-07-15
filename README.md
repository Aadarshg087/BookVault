# 📚 BookNote – Your Personal Book Notes Organizer

BookNote is a full-stack web application that allows users to add books, write and edit rich notes for each book, and view them later in a clean and minimal UI.

---

## 🛠️ Tech Stack

### Frontend:

- ⚛️ React
- 🎨 Tailwind CSS
- 📝 TinyMCE Editor
- 🔄 Axios for API communication

### Backend:

- 🚀 Node.js + Express.js
- 🛢 MongoDB (Mongoose)
- 🔐 JWT Authentication
- 🛡️ CORS & Middleware Handling

---

## ✨ Features

- ✅ User Authentication (JWT-based)
- 📖 Add, edit, delete books
- 📝 Write notes using rich-text editor (TinyMCE)
- 💾 Save and update notes per book
- 🚀 Smooth page transitions and UI animations
- 🧠 Notes are saved as HTML and rendered beautifully

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Aadarshg087/BookVault
cd BookVault
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd Backend
npm install
```

### 3. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
sample_backend.env file is provided for the reference
```

### 4. Start the Backend Server

```bash
cd Backend
npm run dev
```

The backend server will run on `http://localhost:3000`

### 5. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd Frontend
npm install
```

### 6. Start the Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## Note

- Postman API Testing file is provided in the root directory
- The project is deployed on Vercel - [BookVault.com](https://book-vault-frontend-ashen.vercel.app/)
- Make sure to verify the CORS in the backend

**TinyMCE Editor Not Loading**

- Verify TinyMCE API key is correctly configured
- Check browser console for JavaScript errors

**JWT Authentication Issues**

- Verify JWT_SECRET is set in environment variables
- Check token expiration settings
- Clear browser localStorage/cookies

---

## 📧 Contact

For questions or support, please open an issue on GitHub or contact [aadarshg087@gmail.com](aadarshg087@example.com).

**Happy Note-Taking! 📖✨**
