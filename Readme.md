# TechNotes - Computer Repair Shop Ticket System

A full-stack MERN web application designed to replace a manual sticky-note tracking system for a small computer repair shop. This application provides a secure platform for managing technical repair tickets, customer notes, and employee task assignments.

This project was built following the [MERN Stack Full Tutorial by Dave Gray](https://www.youtube.com/watch?v=CvCiNeLnZ00).

## 📚 Learning Outcomes

* **Scalable Architecture Design:** Organized the codebase for growth using the **MVC (Model-View-Controller)** pattern on the backend to separate logic from routing, and a **Feature-Based** directory structure on the frontend to group Redux logic and components by domain (e.g., Auth, Users, Notes).
* **Advanced Authentication & Authorization:** Implemented a robust security flow using **JSON Web Tokens (JWT)**. This includes issuing short-lived access tokens for authorization and managing persistent sessions via secure, HTTP-only cookies for refresh tokens, along with role-based route protection (Admin vs. Employee).
* **Efficient State Management:** Replaced traditional `useEffect` data fetching with **Redux Toolkit Query (RTK Query)**. This optimizes performance by caching API responses, automating background refetching, and reducing the need for manual state management code.
* **Relational Data Modeling in NoSQL:** Designed strict **Mongoose schemas** to model relationships between data entities, specifically linking `User` documents to specific `Note` tickets, enabling efficient querying and assignment tracking within a MongoDB environment.

## 🚀 Features

* **Role-Based Access Control:** Distinct dashboards and permissions for Employees, Managers, and Admins.
* **Ticket Management:** Complete CRUD (Create, Read, Update, Delete) capabilities for repair notes.
* **Ticket Tracking:** Automated ticket numbering and status tracking (Open/Completed).
* **User Management:** Admin-only tools to add, edit, or deactivate employee accounts.
* **Secure Authentication:** Implements JWT (JSON Web Tokens) with Access and Refresh tokens for secure, persistent sessions.
* **Efficient Data Fetching:** Utilizes Redux Toolkit and RTK Query for state management and caching.
* **Responsive Design:** Fully responsive interface adaptable to desktop and mobile devices.

## 🛠️ Tech Stack

**Frontend:**
* React.js
* Redux Toolkit & RTK Query
* React Router
* CSS Modules (for styling)

**Backend:**
* Node.js
* Express.js
* MongoDB (Mongoose ODM)
* JWT (Authentication)

## 👏 Credits

* Tutorial by [Dave Gray](https://www.youtube.com/@DaveGrayTeachesCode).