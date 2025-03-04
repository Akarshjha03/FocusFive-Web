# FocusFive Task Management App

FocusFive is a task management application designed to help users focus on their most important tasks. It features two main sections: "FocusFive" for up to 5 high-priority tasks, and "TheRest" for less important tasks with no limit.

## Features

- **FocusFive Section**: Limited to 5 high-priority tasks
- **TheRest Section**: Unlimited tasks for less important items
- **Task Management**: Add, complete, and move tasks between sections
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Neon-Tech UI**: Modern, dark-mode interface with neon accents

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Data Storage**: File-based JSON storage

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app`: Next.js App Router pages and layouts
- `/app/api`: API routes for task management
- `/components`: Reusable React components
- `/lib`: Utility functions and data handling
- `/types`: TypeScript type definitions
- `/data`: JSON file storage (created at runtime)

## API Endpoints

- `GET /api/tasks`: Get all tasks
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task (complete or move)
- `DELETE /api/tasks/:id`: Delete a task

## Testing

### Testing Responsiveness

Use Chrome DevTools (F12) to test different screen sizes:
- Phone: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px and above

### Testing API Endpoints

You can test the API endpoints using tools like Postman or curl:

```bash
# Get all tasks
curl -X GET http://localhost:3000/api/tasks

# Create a new task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","section":"focusFive"}'

# Update a task
curl -X PUT http://localhost:3000/api/tasks/[task-id] \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a task
curl -X DELETE http://localhost:3000/api/tasks/[task-id]
```

## Deployment

This Next.js application can be deployed on any platform that supports Next.js, such as Vercel, Netlify, or a custom server.

## License

This project is licensed under the MIT License.