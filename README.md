# Digilib - Library Management System (Frontend)

Digilib is a library management system built for college libraries. It provides a user-friendly interface for students, faculty, and library staff to manage library resources efficiently. This repository contains the frontend code for Digilib, built using React and Material-UI, and it communicates with the backend server built with FastAPI.

## Features

- **User Authentication**: Digilib has three main user roles - Admin, Issuer, and User (students and faculty). Each user can register and login to access their specific functionalities.

- **Book Reservation**: Users can reserve a book in advance, even if it is currently out of stock. The system maintains a priority queue for each reserved book, and when the book becomes available, it is automatically issued to the top priority user in the queue.

- **Admin Privileges**: Admin users have special privileges, such as managing books, users, and issuers. They can add new books, update book details, view book borrowing history, and perform other administrative tasks.

- **Book Management**: Users can search for books, view book details, and check their availability status.

- **User Profile**: Users can view their profiles, including personal information and borrowing history.

## Tech Stack

- **React**: The frontend of Digilib is built using React, a popular JavaScript library for building user interfaces.

- **Material-UI**: Material-UI is used as the UI framework to provide a consistent and modern look and feel to the application.


## Live Demo

A live demo of the application is hosted on [Vercel](https://www.vercel.com/). You can access it [digilib-seven.vercel.app](https://digilib-seven.vercel.app/).
## Installation and Setup

1. Clone this repository to your local machine.

```bash
git clone https://github.com/anandukch/DigiLib-Frontend.git
cd DigiLib-Frontend
```

2. Install the dependencies.

```bash
npm install
```

3. Start the development server.

```bash
npm start
```

4. Open [http://localhost:5173](http://localhost:5173) to view the app in the browser.

## Environment Variables

The following environment variables are required to run the application:

- **VITE_CLOUDINARY_UPLOAD_PRESENT**: The upload variable preset of your Cloudinary account.
- **VITE_CLOUDINARY_CLOUD_NAME**: The cloud name of your Cloudinary account.
- **VITE_API_URL**: The hosted URL of the backend server.
- **VITE_LOCAL_API_URL**: The local URL of the backend server.
- **VITE_ENV**: The environment of the application. Set to `production` for production builds.









