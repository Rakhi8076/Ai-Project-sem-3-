# Simple To-Do List App

## Project Overview

This project is a lightweight, client‑side **To‑Do List** web application. Users can add new tasks, mark them as completed, and delete tasks they no longer need. All tasks are stored locally in the browser using **`localStorage`**, ensuring that the list persists across page reloads and browser sessions without any server‑side component.

## Tech Stack

- **HTML** – Structure of the application (`index.html`).
- **CSS** – Styling for a clean, responsive UI (`styles.css` and `css/style.css`).
- **JavaScript** – Core functionality such as adding, completing, deleting tasks and persisting data (`app.js`).

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Open the application**
   - Simply open `index.html` in your favourite web browser (no build step, server, or package manager required).
   - The app will load and be ready to use immediately.

## Usage Guide

- **Add a task**: Type a task description into the input field at the top and press **Enter** or click the **Add** button.
- **Mark as completed**: Click the checkbox next to a task. Completed tasks are visually distinguished (e.g., strikethrough text).
- **Delete a task**: Click the delete (✖) button that appears next to each task.
- **Persistence**: All tasks are saved to `localStorage`. Closing the browser or refreshing the page will retain the current list.

## Folder Structure

```
├── index.html          # Main HTML page
├── app.js              # JavaScript logic for task management
├── styles.css          # Global stylesheet (optional, may be overridden)
├── css/
│   └── style.css       # Primary CSS styling for the app
└── README.md           # Project documentation (this file)
```

- **`index.html`** – Contains the markup for the input field, task list, and includes the CSS and JavaScript files.
- **`app.js`** – Implements functionality: handling user input, updating the DOM, and interacting with `localStorage`.
- **`styles.css`** – Basic styling (may be a placeholder or legacy file).
- **`css/style.css`** – Main stylesheet that defines the visual appearance of the app.

## License

[Insert license information here – e.g., MIT License]
