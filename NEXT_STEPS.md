# Task Manager — Next Steps

## 1. Define your Task type
Create a TypeScript `interface` for a Task. Think about what properties a task needs: an `id`, a `title`, maybe a `completed` status. Keep it simple — you can always add more later.

## 2. Build the task list display
Create a component that takes an array of tasks and renders them. Start with hardcoded mock data in `App.tsx` using `useState`. Get the list showing on screen before anything else.

## 3. Add "create task" functionality
Add an input field and a button. When submitted, add a new task to your state array. Think about how to generate unique IDs (hint: `Date.now()` or `crypto.randomUUID()`).

## 4. Add "delete task" functionality
Add a delete button to each task item. Filter the task out of state when clicked.

## 5. Add "edit task" functionality
This is the trickiest of the three. Think about how to track *which* task is being edited (an "editing" state). You could inline-edit or use a modal — your choice.

## 6. Add the Express.js backend (the learning goal)
Once the frontend works with local state, create a `server/` folder and:
- Initialize a separate `package.json` there with `npm init`
- Install `express` and `@types/express`
- Create an Express server with REST API routes: `GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`
- Store tasks in-memory (a plain array) to start — no database needed yet
- Connect your React frontend to the API using `fetch`

## Things to consider as you build
- **One feature at a time** — get create working before tackling edit
- **TypeScript** — define your types first, let the compiler guide you
- **Component structure** — break the UI into small components (TaskList, TaskItem, TaskForm)
- **State management** — plain `useState` is enough for this project
- **API design** — when you get to Express, think about what HTTP methods map to what operations (GET = read, POST = create, PUT = update, DELETE = delete)
