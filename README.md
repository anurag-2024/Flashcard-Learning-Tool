# Flashcard Learning Tool

## Overview

This project is a flashcard learning tool built with React. It features an admin view where flashcards can be managed, including adding, editing, and deleting flashcards. The tool includes user authentication, and only users with admin privileges can manage the flashcards.

## Features

- **User Authentication**: Secure login for admin users.
- **Flashcard Management**: Admins can view, add, edit, and delete flashcards.
- **Responsive Design**: The app is designed to be responsive and user-friendly.

## Usage

1. **Login as Admin**:

    - **Email**: `admin@gmail.com`
    - **Password**: `admin@123`

    Navigate to the login page and use the above credentials to access the admin dashboard.

2. **Manage Flashcards**:

    - **Add Flashcard**: Click on "Add New FlashCard" to display a form where you can enter a question and answer.
    - **Edit Flashcard**: Click on the "Edit" button on the flashcard to update its question and answer.
    - **Delete Flashcard**: Click on the "Delete" button on the flashcard to remove it.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repository-url.git
    cd your-repository-folder
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following environment variable:

    ```env
    REACT_APP_API_URL=http://your-api-url
    ```

4. **Start the development server**:

    ```bash
    npm start
    ```

    This will start the app at `http://localhost:3000`.

## Project Structure

- `src/components`: Contains React components for the application.
- `src/pages`: Contains page components.
- `src/utils`: Contains utility functions and constants.
- `src/styles`: Contains SCSS files for styling.

## Styling

- The app uses SCSS for styling, with components styled in their respective `.scss` files.
- Responsive design is achieved using media queries.

## Contributing

1. **Fork the repository** and clone your fork.
2. **Create a new branch** for your changes.
3. **Commit your changes** and push to your fork.
4. **Open a pull request** to merge your changes into the main repository.


