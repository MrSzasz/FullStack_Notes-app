# Minimal Notes

Simplify your note-taking routine with this clean and minimalist application. Utilizing a local database, we offer an uncomplicated and streamlined approach to creating, editing, and organizing your notes. Experience simplicity at its best.

![NextJS](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![Vitest](https://img.shields.io/badge/VITEST-6E9F18?style=for-the-badge&logo=vitest&logoColor=FDB515) ![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white) ![PNPM](https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white) ![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![LowDB](https://img.shields.io/badge/LowDB-gray?style=for-the-badge)

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
- Responsive design for a seamless experience on different devices

## Technologies Used

- **Frontend:**

  - NextJs
  - Shadcn/ui
  - Tailwind
  - Typescript
  - pnpm

- **Backend:**

  - Node.js
  - Express
  - LowDB
  - Typescript
  - pnpm

- **Deployment:**
  - Vercel
  - Render.com

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
Click on the + button to create a new note, then save it.
Now you can edit and delete the note clicking the note itself, if you want to edit just edit the text and save it, if you want to delete it just click on _Delete note_.
You can find your note typing some text inside it on the search bar.

## API Endpoints

| Method | Endpoint      | Description         | Request                                          | Response                                                                        |
| ------ | ------------- | ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------- |
| GET    | \`api/notes\` | Get all notes       |                                                  | `[ { title: string, content: string, id: string } ]`                            |
| POST   | \`api/notes\` | Create a new note   | `{ title: string, content: string }`             | `[ { message: string, note: { title: string, content: string, id: string } } ]` |
| PUT    | \`api/notes\` | Edit a note by ID   | `{ title: string, content: string, id: string }` | `[ { message: string, note: { title: string, content: string, id: string } ]`   |
| DELETE | \`api/notes\` | Delete a note by ID | `{ id: string }`                                 | `[ { message: string, note: { title: string, content: string, id: string } ]`   |

## Tests

This app uses Vitest for the Backend and the Frontend, and Cypress for E2E in the Frontend.

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
