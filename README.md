# 🌐 DEV-CONNECT 🔥

_Where Developers Meet, Explore, and Build Connections!_

"A digital space where every developer finds a voice, a connection, and a community."

---

## 🚀 Overview

DEV-CONNECT is a social networking platform built for developers — to connect, collaborate, and share ideas.
Whether you're a beginner exploring your first project or a senior developer shaping digital ecosystems,
DEV-CONNECT brings the developer community together to grow, learn, and connect.

---

## 🧠 Tech Stack

Full MERN Stack – blending flexibility, power, and scalability.

- 🟢 **MongoDB** – Database for user data & feed storage
- ⚙️ **Express.js** – Backend framework
- ⚛️ **React.js (Vite)** – Frontend with fast development setup
- 🧩 **Node.js** – Runtime for backend logic

---

## 🧱 Architecture

DEV-CONNECT follows a **microservice architecture**, separated into two core services:

- 🖥️ **Backend (server)** – Handles authentication, API logic, and data management
- 💻 **Frontend (devConnect-frontend)** – React-based client, offering a seamless and interactive user experience

---

## 💫 Frontend (Vite + React)

### Folder Structure:

```
devConnect-frontend/
└── src/
    ├── components/      # Reusable UI components (UserCard, Navbar, etc.)
    ├── config/          # API base URLs, environment setup
    ├── constants/       # App constants and global variables
    ├── hooks/           # Custom hooks (useAuth, useFetch, etc.)
    ├── layouts/         # Layout wrappers for routes
    ├── pages/           # All pages (Login, Register, Feed, etc.)
    ├── redux-toolkit/   # State management (slices, actions, store)
    └── main.jsx         # Entry point
```

### Frontend Features:

- 🔐 **Authentication** – Login / Register using JWT (combined in one component!)
- 🚪 **Logout** – Secure logout functionality
- 📰 **Feed Page** – Explore posts with UserCards, send connection requests or ignore
- 🤝 **Connections** – View all your developer connections
- 📩 **Requests** – See all incoming and outgoing connection requests
- 👤 **Profile** – View your complete profile
- 🛠️ **Edit Profile** – Update details and see live changes reflected instantly in UserCard

### Frontend Styling & Tools:

- 🎨 **TailwindCSS + DaisyUI** – Elegant UI components
- 📱 **Fully Responsive** – Works smoothly on mobile, tablet, and desktop
- 🎞️ **Framer Motion** – Smooth animations and transitions
- 💡 **Lucide React** – Modern icons for a clean look
- ⚙️ **Redux Toolkit** – Predictable state management

---

## ⚙️ Backend (Node.js + Express)

### Folder Structure:

```
server/
└── src/
    ├── db/              # MongoDB connection setup
    ├── models/          # Mongoose schemas (User, Request, etc.)
    ├── routes/          # Route handlers for APIs
    ├── middleware/      # Auth middleware, error handling
    ├── utils/           # Helper functions (token generation, validation)
    └── app.js           # Main express app entry

Other files: package.json, .env
```

### Backend Highlights:

- 🧰 **JWT Authentication** – Secure and stateless login
- 🔒 **bcrypt** – Encrypted password storage
- 🧼 **Validators** – Input validation for safety and consistency
- 🏗️ **Modular structure** – Easy to scale and maintain

---

## ☁️ Deployment & Hosting

- ☁️ Hosted on **AWS EC2 instances** – separate for backend & frontend
- 🔄 **Nginx Reverse Proxy** – managing requests & serving React build
- 🌍 Public EC2 address currently in use (domain setup coming soon)

---

## 📸 Features Implemented

✅ Login / Register Screens  
✅ Feed Page with Posts  
✅ Connections Page  
✅ Requests Page  
✅ Profile Page  
✅ Live Edit Profile with UserCard Preview

---

## 📦 Installation & Setup (Local)

**1. Clone the repository**

```bash
git clone https://github.com/your-username/dev-connect.git
```

**2. Backend Setup**

```bash
cd server
npm install
```

Create `.env` file with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
```

**3. Frontend Setup**

```bash
cd devConnect-frontend
npm install
```

Create `.env` file with:

```
VITE_API_URL=http://localhost:5173/api
```

**4. Run Both Services**

```bash
# In server directory
npm start

# In devConnect-frontend directory (separate terminal)
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:5000`

---

## 🧭 Summary

✅ Full MERN Stack App  
✅ Modular Microservices (Frontend + Backend)  
✅ AWS EC2 + Nginx Deployment  
✅ Real-time UX with Modern UI Libraries  
✅ Built to Connect, Collaborate, and Inspire Developers

---

## 📧 Contact

**GitHub**: [Your GitHub Profile]  
**Live App**: [EC2 Public Address]

---

**Built with ❤️ for developers, by developers**
