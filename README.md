# Minimal Notes

Simplify your note-taking routine with this clean and minimalist application. @e offer an uncomplicated and streamlined approach to creating, editing, and organizing your notes. Experience simplicity at its best.

[![NextJS](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/) [![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/) [![Vitest](https://img.shields.io/badge/VITEST-6E9F18?style=for-the-badge&logo=vitest&logoColor=FDB515)](https://vitest.dev/) [![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0&logoColor=FFFFFF&link=https://auth0.com/)](https://auth0.com/) [![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/) [![PNPM](https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/) [![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/) [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en) [![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/) [![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Tests](#tests)
- [License](#license)

## Introduction

_Minimal Notes_ is a web application that allows users to take notes in a simple and minimalist way, just open the app and start to type. This project was created to showcase my skills in full-stack development and to provide a useful tool for the people who just need to have a simple record of their though, save important texts as soon as possible, or just take notes without any distraction.

## Features

- CRUD operations for managing notes.
- Responsive design for a seamless experience on multiple devices.

## Technologies Used

- **Frontend:**

  - NextJs
  - Shadcn/ui
  - Tailwind
  - Typescript
  - Auth0
  - pnpm

- **Backend:**

  - Node.js
  - Express
  - MySQL
  - Typescript
  - pnpm

- **Deployment:**
  - Vercel
  - Render.com
  - Clever-cloud

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MrSzasz/FullStack_Notes-app.git
cd notes-app
```

Open the console on the root folder to start the server and the client.

```bash
cd server
pnpm dev
cd ..
cd client
pnpm dev
```

## Usage

Open your browser and navigate to `http://localhost:3000` to access the app.
Click on the `+` button to create a new note, then save it.
Now, you can edit and delete the note by clicking on the note itself. If you want to edit, just modify the text and save it. If you want to delete it, click on `Delete note`.
You can find your note by typing some text inside the search bar.

## API Endpoints

| Method | Endpoint      | Description         | Request                                          | Response                                                                        |
| ------ | ------------- | ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------- |
| GET    | \`api/notes\` | Get all notes       |                                                  | `[ { title: string, content: string, id: string } ]`                            |
| POST   | \`api/notes\` | Create a new note   | `{ title: string, content: string }`             | `[ { message: string, note: { title: string, content: string, id: string } } ]` |
| PUT    | \`api/notes\` | Edit a note by ID   | `{ title: string, content: string, id: string }` | `[ { message: string, note: { title: string, content: string, id: string } ]`   |
| DELETE | \`api/notes\` | Delete a note by ID | `{ id: string }`                                 | `[ { message: string, note: { title: string, content: string, id: string } ]`   |

## Tests

This app utilizes Vitest for both the backend and the frontend, along with Cypress for end-to-end testing in the frontend.

### Prerequisites

Before running the tests, make sure you have the following dependencies installed:

- Node.js: [Download Node.js](https://nodejs.org/)

### Installing Dependencies

```bash
# Install project dependencies
pnpm install
```

### Running tests

```bash
# Run unit tests with Vitest
npm test

# Run end-to-end tests with Cypress
npm run cypress:open
```

## License

This project is licensed under the MIT License.
