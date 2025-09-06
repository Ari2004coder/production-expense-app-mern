# Expense Management System

This is a full-stack web application for managing personal expenses. It allows users to track their income and expenses, view reports, and analyze their spending habits.

## Features

*   User registration and login
*   Add, edit, and delete transactions (income and expenses)
*   View a list of all transactions
*   Filter transactions by date range and type (income/expense)
*   View a summary of total income, total expense, and net amount
*   Dashboard with analytics of your expenses and incomes
*   Responsive design for use on different devices

## Tech Stack

### Frontend

*   React
*   Vite
*   React Router for routing
*   Axios for HTTP requests
*   Tailwind CSS for styling
*   Ant Design for UI components
*   Recharts for charts

### Backend

*   Node.js
*   Express
*   MongoDB with Mongoose


## Getting Started

### Prerequisites

*   Node.js and npm installed
*   MongoDB installed and running

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Ari2004coder/Expense-Management-System-v.1 .git
    cd expense-management-system
    ```

2.  **Install server dependencies:**

    ```bash
    npm install
    ```

3.  **Install client dependencies:**

    ```bash
    cd client
    npm install
    ```

4.  **Create a `.env` file in the root directory and add the following:**

    ```
    MONGO_URL=<your_mongodb_connection_string>
    ```

5.  **Start the development server:**

    ```bash
    npm run dev
    ```

    This will start both the backend server and the frontend development server concurrently. The application will be available at `http://localhost:5173`.

## API Endpoints

### User Endpoints

*   `POST /api/v1/users/register`: Register a new user.
*   `POST /api/v1/users/login`: Log in a user.
*   `POST /api/v1/users/update-user`: Update user profile.

### Transaction Endpoints

*   `POST /api/v1/transactions/add-transaction`: Add a new transaction.
*   `POST /api/v1/transactions/get-transaction`: Get all transactions for a user.
*   `POST /api/v1/transactions/get-transactionmonth`: Get all transactions for a specific month.
*   `POST /api/v1/transactions/get-transactionyearly`: Get all transactions for a specific year.
*   `DELETE /api/v1/transactions/delete/:id`: Delete a transaction by ID.
*   `PUT /api/v1/transactions/update/:id`: Update a transaction by ID.

## Folder Structure

```
.
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # React pages
│   │   └── ...
│   └── ...
├── config/               # Database configuration
├── controllers/          # Express controllers
├── models/               # Mongoose models
├── routes/               # Express routes
├── server.js             # Express server entry point
└── ...
```
