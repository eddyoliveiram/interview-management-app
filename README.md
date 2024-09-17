
# Job Vacancy Management System

This is a **job vacancy management system** built using **React/Next.js**, **Material-UI** and **MongoDB** . The system allows users to manage job openings by adding, editing, deleting, and listing vacancies. It also supports **pagination** and **file uploads** for resumes in **PDF/Word** formats.

## Features

- Add, edit, delete, and list job vacancies
- Pagination for better data management
- Upload files (PDF/Word) for resumes
- Data persistence with MongoDB
- API endpoints for job vacancy management
- UI built with **Material-UI (MUI)** for a modern and responsive interface

## Prerequisites

Before running the project, ensure that you have the following installed:

- Node.js
- MongoDB
- Yarn or npm

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/job-vacancy-management-system.git
cd job-vacancy-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory with the following content:

```
MONGODB_URI=mongodb://127.0.0.1:27017/gerenciamentoVagas
```

### 4. Run the application

To start the development server, run:

```bash
yarn dev
```

or

```bash
npm run dev
```

### 5. Running MongoDB Migrations

This system uses **migrate-mongo** for managing MongoDB migrations. Before running the migrations, make sure MongoDB is running locally.

To run the MongoDB migration, execute the following command:

```bash
migrate-mongo up
```

This command will:

- Drop the existing `gerenciamentoVagas` database (if it exists)
- Create the `vagas` collection with the appropriate index

To revert the migration, you can run:

```bash
migrate-mongo down
```

## API Endpoints

- `GET /api/vagas`: List all job vacancies with pagination.
- `POST /api/vagas`: Create a new job vacancy.
- `PUT /api/vagas/[id]`: Update an existing job vacancy.
- `DELETE /api/vagas/[id]`: Delete a job vacancy.

## License

This project is licensed under the MIT License.
