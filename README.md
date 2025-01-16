# CookBook

This is my final project for the [CS50x](https://cs50.harvard.edu/x/2025/) course from Harvard.

## Overview

CookBook is a web application designed to let users create, share and search new recipes. Users can create an account, their favorite recipes and explore new ones shared by the users.

## Features

- User authentication
- Add, edit, and delete recipes
- Search and filter recipes by titles and ingredients
- See recipes from other users

## Technologies Used

- Next.js for the frontend
- Prisma for the database ORM
- Tailwind CSS for styling
- SQLite for the database

## Setup and Installation

1. Clone the repository:

```sh
git clone https://github.com/gabu322/cs50-final-project.git
cd cookbook
```

1. Install dependencies:

```sh
npm install
```

1. Set up the database:

```sh
npx prisma migrate dev --name init
```

1. Run the development server:

```sh
npm run dev
```

1. Open your browser on `http://localhost:3000`

## License

This project is licensed under the MIT License.
