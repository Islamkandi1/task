
# Framework Choice
=====================================================================
* React.js: Chosen for its popularity and ease of use.
* Provides high flexibility in building reusable components.
* Strong community and ecosystem → faster development & problem-solving.

# State Managemen
==========================================================================
- Used React Context API as the state manager.
- Reason: Medium-scale project → no need for heavy solutions like Redux.
- Context makes sharing data (tasks, categories, actions) across components simple and clean.

# Core Features Implemented
=========================================================

1- Task List View:

- Display all tasks in card format.
- Show (title, description, image, status, category).
- Fallback image when task image is missing or fails.

2- Add Task

- Form with Title & Category as required fields.
- Optional fields: Priority, Due Date, Description.
- Form validation with clear error messages.

3 Task Details View

- Full task information page.
- Edit and Delete functionality.
- Toggle completion status (Completed / In Progress).

4- Category Integration

- Each task is linked to a category (name + color + icon).
- Category colors used for visual distinction.

5- Update & Delete Tasks

- Edit existing task details.
- Delete with confirmation dialog.

# UI/UX & Styling
===========================================================================

Tailwind CSS for fast and responsive design.
1- Responsive Layouts:

- Desktop → Full layout with sidebar.
- Tablet → Collapsible elements.
- Mobile → Single-column, touch-friendly UI.
  2- Loading states (spinners/skeletons).
- Empty states with clear CTAs.
- Error states with retry options.
- Success feedback after actions.

# Architecture Overview
=============================================================================

1- Components:
* TaskCard → Renders each task.
* TaskForm → Add/Edit task form.
* TaskDetails → Detailed task view.
* CategoryFilter → Filter tasks by category.
* Context Provider → Manages tasks & categories globally.

2- Pages:
* Home → Task list.
* TaskDetails → Task details view.











