# Task-do

TaskDo is a full-stack web application built with Next.js and Express.js. It aims to provide users with an intuitive and automated platform for managing and organizing their daily tasks. Featuring account creation and login, task management, and automated organization based on priority and duration, TaskDo simplifies task management for its users.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Contributing](#contributing)
6. [License](#license)

## Installation

### Backend

1. Navigate to the `backend` directory:
   ```sh
   cd Task-do/backend
   ```
2. Install the dependecies:
    ```sh
    npm install
    ```
3. Set up the Prisma database:
    ```sh
    npx prisma migrate dev
    ```
4. Start the backend server:
    ```sh
    npm run dev
    ```
    
### Frontend

1. Navigate to the `backend` directory:
    ```sh
    cd Task-do/my-app
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the frontend development server:
    ```sh
    npm run dev
    ```

## Usage

### Backend

The backend server will start and listen on the specified port (default: 3000). You can test the API endpoints using tools like Postman or Curl.

### Frontend

The frontend application will start and open in your default web browser at `http://localhost:3000`. You can interact with the TaskDo application to manage your tasks, schedules, and user profiles.

## Features

1. User authentication (account creation and login).
2. Task management (create, update, delete tasks).
3. Automated task organization based on priority and duration.
4. Schedule management (create and manage schedules).
5. Operational hours configuration.
6. Responsive UI built with Next.js.
7. Backend API built with Express.js and Prisma ORM.

## Contributing

We welcome contributions! Please follow these guidelines to contribute to the project:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project does not have a license yet.

