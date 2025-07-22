
<<<<<<< HEAD
# Excalidraw Clone

A real-time collaborative drawing application built with Next.js, Express.js, WebSocket, and PostgreSQL.

## Project Structure

- `apps/web` - Next.js frontend application
- `apps/http-server` - Express.js backend API server
- `apps/ws-server` - WebSocket server for real-time drawing
- `packages/db` - Prisma database schema and client
- `packages/common` - Shared utilities
- `packages/backend-common` - Backend utilities
- `packages/ui` - Reusable UI components

## Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database

## Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   Create `.env` files in each app directory with the following variables:
   
   **apps/http-server/.env:**
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/excalidraw"
   JWT_SECRET="your-secret-key"
   PORT=3001
   ```
   
   **apps/ws-server/.env:**
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/excalidraw"
   JWT_SECRET="your-secret-key"
   PORT=3002
   ```
   
   **apps/web/.env.local:**
   ```
   NEXT_PUBLIC_API_URL="http://localhost:3001"
   NEXT_PUBLIC_WS_URL="ws://localhost:3002"
   ```

3. **Set up the database:**
   ```bash
   cd packages/db
   pnpm prisma generate
   pnpm prisma db push
   ```

4. **Run the development servers:**
   ```bash
   pnpm dev
   ```

## Docker Development

Run the entire stack with Docker Compose:

```bash
docker-compose up --build
```

This will start:
- PostgreSQL database on port 5432
- HTTP server on port 3001
- WebSocket server on port 3002
- Web app on port 3000

## Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` - Your Railway HTTP server URL
   - `NEXT_PUBLIC_WS_URL` - Your Railway WebSocket server URL

#### Backend Services (Railway)
1. Create a new Railway project
2. Add PostgreSQL database service
3. Deploy HTTP server:
   - Connect your GitHub repository
   - Set root directory to `apps/http-server`
   - Add environment variables:
     - `DATABASE_URL` - Railway PostgreSQL URL
     - `JWT_SECRET` - Your secret key
     - `PORT` - 3001

4. Deploy WebSocket server:
   - Create another service in the same project
   - Set root directory to `apps/ws-server`
   - Add environment variables:
     - `DATABASE_URL` - Railway PostgreSQL URL
     - `JWT_SECRET` - Your secret key
     - `PORT` - 3002

### Option 2: Railway (All-in-one)

1. Create a new Railway project
2. Add PostgreSQL database service
3. Deploy all three services in the same project
4. Configure environment variables for each service

### Option 3: Render

1. Create a new Render account
2. Add PostgreSQL database
3. Deploy each service as a separate web service
4. Configure environment variables

### Option 4: DigitalOcean App Platform

1. Create a new DigitalOcean account
2. Create an App Platform project
3. Add PostgreSQL database
4. Deploy each service as a separate app
5. Configure environment variables

## Environment Variables

### HTTP Server
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 3001)

### WebSocket Server
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 3002)

### Web App
- `NEXT_PUBLIC_API_URL` - HTTP server URL
- `NEXT_PUBLIC_WS_URL` - WebSocket server URL

## Database Setup

The application uses Prisma with PostgreSQL. To set up the database:

1. Install Prisma CLI: `pnpm add -g prisma`
2. Generate Prisma client: `pnpm prisma generate`
3. Run migrations: `pnpm prisma db push`
=======
# DoodleFlow - An Excalidraw Clone

**DoodleFlow** is a web-base application that replicates the functionality of [Excalidraw](https://excalidraw.com). It enables users to create freehand diagrams collaboratively in real time with a sleek and intuitive UI.
>>>>>>> fa21edb1817b72db8a8f28b8c7c6dde2eb73703f

## Features

- Real-time collaborative drawing
- User authentication
- Room-based collaboration
- Drawing persistence
- Modern UI with Tailwind CSS

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Express.js, WebSocket
- **Database:** PostgreSQL with Prisma
- **Authentication:** JWT
- **Real-time:** WebSocket
- **Build Tool:** Turbo
- **Package Manager:** pnpm
