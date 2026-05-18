# TaskFlow — Task Management (TaskManagement)

## Overview
A lightweight Task Management web app built with plain HTML, CSS, and JavaScript. It provides a kanban-style board to create, edit, move, and remove tasks with persistence using `localStorage`.

## Features
- Create tasks with title, description, due date, and priority (High / Medium / Low).
- Edit and delete existing tasks.
- Drag-and-drop tasks between columns: `To Do`, `In Progress`, and `Completed`.
- Filter tasks by priority and search by title.
- Task counts per column shown in the sidebar.
- Persistence using `localStorage` so tasks survive page reloads.

## Files
- `index.html` — Main UI and modal form.
- `script.js` — App logic: create/edit/delete, drag & drop, filtering, search, and persistence.
- `style.css` — Styles for the board and modal.

## Usage
1. Open `index.html` in your browser to run the app locally.

Or serve the folder with a simple HTTP server (recommended for some browsers):

```bash
# from the workspace root
cd JavaScript/TaskManagement
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Development
- Make UI or logic changes in `style.css` and `script.js`.
- The app stores tasks under the `tasks` key in `localStorage`.

## Known issues
- Minor UX: after editing a task, opening the "Create Task" modal may still show the "Edit Task" heading until the form is reset.

## Contribution
Feel free to open issues or send pull requests for improvements, bug fixes, or new features.

## License
Specify a license for this project (e.g., MIT) or remove this section.
