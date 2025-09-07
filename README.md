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
