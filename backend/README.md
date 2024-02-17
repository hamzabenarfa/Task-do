# TaskDo

TaskDo is a Node.js backend application designed for smart task management. It streamlines the process of managing tasks through an intelligent and user-friendly interface, allowing users to efficiently organize and prioritize their workload.

## Features

- **Task Management**: Create, update, and delete tasks with ease.
- **Prioritization**: Automatically prioritize tasks based on deadlines and importance.
- **Notifications**: Receive updates on task deadlines and changes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js

## Installation 

To set up TaskDo on your local machine, follow these steps:

1. **Clone the repository to your local machine:**

    ```bash
    git clone https://github.com/hamzabenarfa/Task-do

    ```

2. **Install the required dependencies:**

    ```bash
    npm install
    ```

## Usage

To run the TaskDo backend application, use the following commands:

- **Development Server:** Start the development server. This is useful for development and testing.

    ```bash
    npm run dev
    ```

- **Algorithm Mode:** Run the application in algorithm mode to utilize advanced task sorting and management features.

    ```bash
    npm run dev:algo
    ```

## Prisma Usage

To manage your database schema and models with Prisma, follow these steps after installing the required dependencies:

1. **Generate Prisma Client:**

    Generate the Prisma Client to interact with your database programmatically.

    ```bash
    npx prisma generate
    ```

2. **Push Schema Changes to Database:**

    Apply your Prisma schema changes to the database. This command is useful for updating your database schema during development.

    ```bash
    npx prisma db push
    ```

3. **Open Prisma Studio:**

    Launch Prisma Studio, a visual editor for your database. This tool helps you view and manipulate data with ease.

    ```bash
    npx prisma studio
    ```
