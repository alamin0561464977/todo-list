# TaskFlow

TaskFlow is a lightweight, installable daily planner for organizing tasks and building consistent routines. It runs in a modern browser without a build step or third-party JavaScript dependencies.

## Features

- Create, edit, complete, and delete tasks.
- Set a priority when creating a task. Tasks are ordered **High → Medium → Low**; tasks with the same priority keep their existing order.
- Mark activities as all-day or assign them a time.
- Filter the list to show all, active, or completed tasks.
- Add common routines from Quick activities.
- View daily mountain-style progress, a day-by-day weekly bar chart, and a monthly progress chart.
- Switch between light and dark themes.
- Download a JSON backup of tasks, progress history, and theme settings.
- Install the app on supported devices and use its cached app shell offline.
- Use a responsive interface on desktop and mobile.

## Getting started

TaskFlow is a static website. No package installation or compilation is needed.

1. Clone the repository:

   ```sh
   git clone https://github.com/alamin0561464977/todo-list.git
   cd todo-list
   ```

2. Start a local static web server from the project directory. For example, with Python:

   ```sh
   python -m http.server 8000
   ```

   On Windows, `py -m http.server 8000` may be used if the Python launcher is installed.

3. Open [http://localhost:8000](http://localhost:8000) in a modern browser.

You can also serve the project with a static hosting service or a development server such as the VS Code Live Server extension. A web server is required for the service worker; opening `index.html` directly as a `file://` URL will not enable offline installation.

The **Install app** button requires TaskFlow to be opened over HTTPS or `localhost` in a supported browser. **Download backup** works from the local page and saves a JSON file that includes tasks, progress history, and theme preference.

## Using TaskFlow

1. Enter a task, choose a priority, and optionally set a time or mark it as an all-day activity.
2. Select **Add** or press Enter. Higher-priority tasks appear first.
3. Use the checkbox to mark a task complete. Edit or delete it with the task action buttons.
4. Use **All**, **Active**, and **Done** to filter the list. **Clear completed** removes completed tasks from the list.
5. Select a Quick activity to add it as a task.
6. Use the navigation bar to jump between Tasks, Progress, and Quick activities.

## Progress tracking

Progress is stored locally in the browser. The weekly view shows each day's completion percentage, and the monthly view summarizes progress by week. Weeks start on Monday.

TaskFlow cannot reconstruct dates that were not saved previously. Existing tasks without tracking dates begin tracking when the app first loads them; older activity is not invented. Progress and task state are not synchronized across browsers or devices.

## Privacy and offline use

- Tasks, progress history, and theme preference are saved in the browser's `localStorage`.
- The app does not require an account or send task data to a backend.
- Clearing this site's browser data will remove locally saved tasks and progress.
- The service worker caches the app files so the app shell can load offline after the app has been visited online. Some browser features, including installation and service workers, require `localhost` or HTTPS.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | App markup and task, filter, theme, and progress logic |
| `styles.css` | Responsive layout, charts, themes, and component styles |
| `manifest.json` | Installable app name, icon, and display settings |
| `sw.js` | Service worker and offline app-shell cache |
| `app-icon.svg` | App icon and favicon |
