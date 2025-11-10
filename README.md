# FULL STACK WEB DEVELOPER INTERN - TECHNICAL TASK


Build a small full-stack web app that allows users to:
1. Register & Login
2. View a list of available templates
3. Mark templates as "Favorite"
4. See their favorited templates in a "My Favorites" section
   
## 🛠️ Tech Stack

Here is the full stack of technologies used in this project:

* **Frontend:** React.js (Vite), TailwindCSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **ORM / Query Builder:** Mongoose
* **Version Control:** Git & GitHub

---

#Template Favorites App

This is a full-stack web application built for a technical task. It allows users to register, log in, browse a list of templates, and manage their own "favorites" list.

🌍 Live Demo
Frontend (Netlify): [https://your-app-name.netlify.app/](https://sanjay-full-stack-intern.netlify.app/templates)

Backend (Render): [https://your-api-name.onrender.com/](https://fullstack-intern-task-zat0.onrender.com)

Note: The backend link is the live API. Accessing it directly in a browser may just show a "Cannot GET /" message, which is normal. The frontend application is configured to make requests to this URL.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You must have the following software installed on your computer:

* [Node.js](https://nodejs.org/) (which includes npm)
* [Git](https://git-scm.com/)
* A running MongoDB instance (you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud database or install it locally)

### Setup & Installation

1.  **Clone the public GitHub repository:**
    ```bash
    git clone [[https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)]
    cd [your-repo-name]
    ```

2.  **Set up the Backend:**

    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Install all required npm packages:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `/backend` directory. You can copy the `.env.example` file if you have one. It must contain your database connection string and port:
        ```env
        # /backend/.env
        PORT=5001
        DATABASE_URL="your_mongodb_connection_string_here"
        ```
    * Start the backend server:
        ```bash
        npm run dev 
        ```
    * The server should now be running on `http://localhost:5001` (or the port you specified).

3.  **Set up the Frontend:**

    * Open a **new terminal** and navigate to the frontend directory:
        ```bash
        cd frontend
        ```
    * Install all required npm packages:
        ```bash
        npm install
        ```
    * Start the frontend (Vite) development server:
        ```bash
        npm run dev
        ```
    * Open your browser and navigate to `http://localhost:5173` (Vite's default port) to see the application running.

---

## 📬 Contact

* **Name:** [Sanjay M]
* **Email:** [sivasankar.ccc@gmail.com]
* **GitHub:** [https://github.com/sanjayrushee]
* **LinkedIn:** [https://linkedin.com/in/sanjay-rushee]
