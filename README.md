# TaskNest

TaskNest is a full-stack task management app with user authentication, task CRUD operations, filtering, responsive UI, and light/dark theme support.

## Features

- User registration and login with JWT authentication
- Protected task routes for authenticated users
- Create, update, delete, and view tasks
- Task statuses: pending, in progress, completed
- Priority levels and due dates
- Task filtering and dashboard stats with visual status and priority charts
- Responsive layout for desktop and mobile
- Light and dark mode support with persisted theme preference

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios, React Hot Toast
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

## Project Structure

TaskNest/
├── LICENSE
├── README.md
├── Backend/
│   ├── .env
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── Frontend/
	├── .env
	├── .gitignore
	├── dist/
	├── eslint.config.js
	├── index.html
	├── package.json
	├── package-lock.json
	├── postcss.config.js
	├── public/
	├── src/
	│   ├── App.css
	│   ├── App.js
	│   ├── App.jsx
	│   ├── assets/
	│   ├── components/
	│   │   ├── Navbar.jsx
	│   │   ├── TaskCard.jsx
	│   │   └── TaskModal.jsx
	│   ├── contexts/
	│   │   ├── AuthContext.jsx
	│   │   ├── AuthProvider.jsx
	│   │   ├── ThemeContext.jsx
	│   │   ├── ThemeProvider.jsx
	│   │   ├── useAuth.js
	│   │   └── useTheme.js
	│   ├── index.css
	│   ├── main.jsx
	│   ├── pages/
	│   │   ├── Dashboard.jsx
	│   │   ├── Login.jsx
	│   │   └── Register.jsx
	│   └── services/
	│       └── api.js
	├── tailwind.config.js
	└── vite.config.js



## Setup Instructions

### Prerequisites

- Node.js 18 or newer
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd TaskNest
```

### 2. Configure the backend

Create a .env file inside Backend with the following values:

```env
MONGODB_URI=mongodb://localhost:27017/tasknest
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

### 3. Install backend dependencies

```bash
cd Backend
npm install
```

### 4. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

### 5. Configure the frontend API URL if needed

The frontend uses /api by default. If your frontend runs separately from the backend, create a .env file in Frontend and set:

```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Start the backend server

```bash
cd Backend
npm run dev
```

If no dev script is defined, start the server with:

```bash
node server.js
```

### 7. Start the frontend app

```bash
cd Frontend
npm run dev
```

## Available Scripts

### Backend

- npm install: install backend dependencies
- npm run dev: start the backend in development mode if a nodemon script is configured
- node server.js: run the backend server directly

### Frontend

- npm install: install frontend dependencies
- npm run dev: start the Vite development server
- npm run build: create a production build
- npm run lint: run ESLint checks
- npm run preview: preview the production build locally

## API Endpoints

### Auth

- POST /api/auth/register: create a new account
- POST /api/auth/login: sign in and receive a token
- GET /api/auth/me: get the current authenticated user

### Tasks

- GET /api/tasks: get all tasks for the authenticated user
- POST /api/tasks: create a new task
- PUT /api/tasks/:id: update a task
- DELETE /api/tasks/:id: delete a task

## Notes

- The frontend stores the JWT token in localStorage and attaches it to API requests automatically.
- Light and dark theme preference is persisted in the browser.
- The task routes are protected, so a valid token is required for task operations.
- The dashboard includes summary stats plus status and priority bar charts beneath the task list.

## License

This project is licensed under the terms of the included LICENSE file.
