# ML Club Admin Portal

A modern admin dashboard and content management portal for the ML Club, built with SvelteKit and MongoDB. It provides a secure backend for managing club members, projects, blogs, and dashboard data through a clean administrative interface.

## Overview

This application is designed for club administrators to manage the public-facing content of an ML Club website without needing to touch the frontend code directly. The portal supports authentication, protected admin routes, content CRUD operations, and media uploads for member profiles.

Live URL : mlclub-admin-portal.vercel.app
Test:
UserId : test@user.com
Password: 1234
## Key Features

- Secure admin authentication with JWT and password hashing
- Protected admin routes and logout flow
- Dashboard overview with counts for members, projects, and blogs
- Blog management with create, edit, and delete actions
- Member management with image upload support through Cloudinary
- Project management for club initiatives and showcases
- Responsive UI built with Svelte and Tailwind CSS
- MongoDB-backed persistence for all core data entities

## Tech Stack

- Frontend: SvelteKit
- Styling: Tailwind CSS
- Backend: Server-side load functions and actions in SvelteKit
- Database: MongoDB with Mongoose
- Authentication: JSON Web Tokens (JWT) and bcrypt
- Media Storage: Cloudinary
- Build Tool: Vite

## Project Structure

```text
src/
  lib/
    server/
      Auth.js
      cloudinary.js
      db.js
      models/
        Admin.js
        Blogs.js
        Dashboard.js
        Member.js
        Projects.js
  routes/
    admin/
      dashboard/
      blogs/
      members/
      projects/
    auth/
    logout/
```

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18+ installed
- npm or another package manager
- A running MongoDB instance
- A Cloudinary account for media uploads

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Then open your browser at:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev      # start development server
npm run build    # build for production
npm run preview  # preview production build locally
```

## Application Routes

- `/auth` — admin login page
- `/admin` — protected admin area
- `/admin/dashboard` — dashboard summary
- `/admin/blogs` — manage blog posts
- `/admin/members` — manage club members
- `/admin/projects` — manage projects
- `/logout` — logout admin session

## Authentication and Authorization

The application uses JWT-based authentication for admin access. Protected admin routes check for a valid token before allowing access. User passwords are hashed with bcrypt before storage.

## Database Model Overview

The application uses the following Mongoose models:

- `Admin` — administrator account data
- `Blog` — blog posts and content
- `Member` — club member profiles and images
- `Project` — project descriptions and metadata
- `Dashboard` — dashboard-related admin data

## Media Uploads

Member profile images and other media assets are uploaded using Cloudinary. This requires the Cloudinary credentials to be configured in your environment variables.

## Deployment

The project includes an adapter setup for deployment, and can be deployed to platforms that support SvelteKit apps such as Vercel. Make sure to set all environment variables in your deployment platform as well.

## Development Notes

- The project is currently structured around an admin portal workflow rather than a public-facing frontend.
- Server-side logic is placed in SvelteKit route server files and shared server utilities under `src/lib/server`.
- If you plan to expand this project, consider adding validation, role-based access control, and improved UI polish.

## License

This project does not currently declare a license. Add one if you plan to distribute or publish it publicly.

## Contributing

If you want to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a pull request with a clear summary

