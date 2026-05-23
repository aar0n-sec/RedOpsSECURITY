# RedOps SECURITY

RedOps SECURITY is a modern, full-stack web application designed for a cybersecurity and red-teaming organization. It provides a comprehensive platform showcasing security services, methodologies, and industry-specific solutions, alongside a blog and a client assessment portal.

## Features

- **Marketing & Informational Pages:** Details on red-teaming services, methodologies, and supported industries.
- **Blog System:** Platform for publishing cybersecurity articles, research, and advisories.
- **Client Assessment Portal:** Interactive tools for security assessments and evaluations.
- **Authentication & Authorization:** Secure user login and registration powered by [Clerk](https://clerk.com/).
- **Admin Dashboard:** Interface for managing content, users, and platform data.
- **Interactive UI:** Engaging visual elements built with [Three.js](https://threejs.org/).

## Tech Stack

This project is built using a modern, scalable technology stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & Backend:** [Supabase](https://supabase.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Media & Asset Management:** [Cloudinary](https://cloudinary.com/)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Markdown Processing:** [React Markdown](https://github.com/remarkjs/react-markdown) & [Highlight.js](https://highlightjs.org/)

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your system.

### Environment Variables

Before running the application, you need to set up your environment variables. Copy the `.env.example` file to `.env.local` (or `.env`) and fill in the required keys:

```bash
cp .env.example .env.local
```

Required services include Supabase, Clerk, and Cloudinary.

### Installation & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint to check for code quality.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
