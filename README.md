# Dev.to Clone Challenge

This repository contains the implementation of a functional clone of the [dev.to](https://dev.to) website as part of a React module challenge. The goal is to recreate key features such as user registration, login, viewing posts, post details, and post creation, while connecting to a backend API for handling users and posts.

## Features

- User registration and login with API integration.
- Display a list of posts fetched from the API.
- View post details, including comments and reactions.
- Create new posts and interact with the API for post creation.
- Fully responsive UI using Tailwind CSS and clsx for conditional styles.

## Installation Instructions

1. Clone this repository:

```
 git clone git@github.com:morwen44/devtofinal.git
```

2. Navigate into the project directory:

```
   cd devtofinal
```

3. Install the dependencies:

```
   npm install
```

4. Create an `.env` file at the root of the project and add your environment variables (e.g., API base URL):

```
   NEXT_PUBLIC_API_URL=https://blog-restful.onrender.com
```

## Running the Project Locally

1. Start the development server:

```
   npm run dev
```

2. Open your browser and navigate to http://localhost:3000.

## Tools Used

- Next.js: Framework for React with server-side rendering and static site generation.
- React Hook Form: Managing forms with ease, including validation.
- Tailwind CSS: Utility-first CSS framework for styling.
- clsx: Utility for conditionally applying class names.
- Fetch API: For making API calls to the backend.
- LocalStorage: For storing authentication tokens.

## API Used

The backend API is hosted on Render, and you can find the repository for it here:

```
API Repository: https://github.com/morwen44/blog-restful
```

## Live Project

The project is deployed on Vercel. Check it out live:

```
Live Version: https://devtofinal.vercel.app
```

## Deployment

The backend API is deployed on Render:

```
API Deployment: https://blog-restful.onrender.com
```
