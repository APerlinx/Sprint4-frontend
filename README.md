Trio - A Trello-Inspired Kanban Board App

Introduction

Trio is a pixel-perfect, end-to-end clone of Trello, a popular project and task management platform. Inspired by the functionality of Trello, Trio aims to provide a familiar and feature-rich experience for managing projects and tasks using a kanban board. This application offers a range of unique features in addition to Trello's core functionality, enhancing your project management experience.

Main Features
Create and Manage Boards: Use drag-and-drop functionality to effortlessly create, remove, and update lists and tasks on your boards.
Task Customization: Customize tasks to the deepest level with options such as labels, due dates, members, cover images, checklists, activity logs, copying, moving, and archiving.
Side Menu: Easily change the board's background using the Unsplash Photo API, filter tasks by members or labels, and access the general activity log.
Accessibility Features: We've implemented a Blind Color Mode to aid users with color blindness and a voice assistant that accepts vocal commands for effortless task management.
Technologies

Trio is built using the MERN stack:

MongoDB: A NoSQL database for storing data.
Express: A Node.js web application framework for building the server.
Vue: A JavaScript library for building the user interface.
Node.js: A runtime environment for executing server-side JavaScript.
WebSockets: Real-time board updates are achieved using WebSockets.
REST API: Communication between the frontend and backend is facilitated using RESTful API calls.
Getting Started

Follow these steps to get started with Trio on your local machine:

Clone the project repository:
shell
Copy code
git clone https://github.com/YourUsername/Trio.git
Navigate to the backend folder and install the required Node.js modules:
shell
Copy code
cd backend
npm install
Start the server:
shell
Copy code
npm start
You should see a console output indicating that the server is up and running on port 3030.
Go to the frontend folder and install the frontend dependencies:
shell
Copy code
cd frontend
npm install
Start the frontend application:
shell
Copy code
npm start
You should see a console output indicating that the frontend is running at localhost:3000.
That's it! The Trio app should open automatically in your web browser, allowing you to explore its features.

Showcase

Homepage
Homepage

The landing page provides options for user registration, login, or a quick start demo for users with limited time.

Workspace
Workspace

The workspace displays all of the user's boards, offering the ability to create new boards, switch between them, and use the built-in voice assistant for enhanced productivity.

Board
Board

Experience the full range of Trello-like functionality, including drag-and-drop tasks, live updates, task editing, side menus, and board member management.

Signup
Signup

Trio offers an end-to-end authentication flow, encrypting user details and supporting Google Login for convenience.

Task Details
Task Details

Edit task details and witness live updates as changes are made. Dynamic modals provide detailed information on task elements.

Side Menu
Side Menu

The side menu, accessible via the "Show menu" button, allows users to filter tasks by labels or names, change the board background with Unsplash images, view archived tasks, and track board activity.

Mobile Experience
Mobile Experience

Trio's responsive design ensures a seamless mobile experience, adapting to different screen sizes with the "mobile first" approach.

Authors

Shay Zigdon
Guy Dahan
Alone Perlin
Acknowledgments

We would like to express our gratitude to the Trello team for inspiring this project and to the developers of the third-party libraries that contributed to its feature set. Thank you for considering Trio for your project management needs!

Note: Replace the placeholder text and image links with actual content relevant to your project.
