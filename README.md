# CS 394 Lab - useEffect

This project is part of the CS 394 course and focuses on using the `useEffect` React hook to interact with REST APIs. For detailed student instructions, refer to [Student Instructions](./student-readme.md).

## Setup

To get started with the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running:
   ```bash
   npm install
   ```

## Commands

The following commands are defined in the [`package.json`](#file:package.json):

- **`npm run dev`**: Starts the development server using Vite.
- **`npm run build`**: Builds the project for production using TypeScript and Vite.
- **`npm run serve`**: Previews the production build.
- **`npm test`**: Runs the test suite with a UI using Vitest.
- **`npm run test-no-ui`**: Runs the test suite without the UI.
- **`npm run lint:fix`**: Fixes linting issues in the source files.
- **`npm run lint:format`**: Formats the codebase using Prettier.
- **`npm run lint`**: Runs both linting and formatting commands.
- **`npm run grade`**: Builds the project and runs the test suite for grading.
- **`npm run type-check`**: Checks TypeScript types in the project.

## File Structure

The project is organized as follows:

### Root Files

None of these files should be modified

- **`README.md`**: This file, providing an overview of the project.
- **`student-readme.md`**: Detailed instructions for students working on the lab.
- **`package.json`**: Defines project dependencies and scripts.
- **`.gitignore`**: Specifies files and directories to ignore in Git.
- **`.prettierrc.cjs`**: Configuration for Prettier code formatting.
- **`.eslint.config.cjs`**: Configuration for ESLint linting rules.
- **`.lintstagedrc.json`**: Configuration for lint-staged to run linters on staged files.
- **`.husky/pre-commit`**: Pre-commit hook to run lint-staged.
- **`vite.config.ts`**: Configuration for Vite.
- **`tsconfig.json`**: TypeScript configuration for the project.
- **`tsconfig.node.json`**: TypeScript configuration for Node-specific files.
- **`vitest.setup.ts`**: Setup file for Vitest testing.

### `src` Folder

The `src` folder contains the main application code:

- **`App.tsx`**: The main application component that integrates the `TodoList` and `TodoDetail` components.
- **`App.css`**: Styles for the main application.
- **`main.tsx`**: Entry point for the React application. **do not modify**
- **`index.css`**: Global styles for the application.
- **`vite-env.d.ts`**: TypeScript definitions for Vite.
- **`components/`**: Contains React component skeletons:
  - **`todo-list.component.tsx`**: Displays a list of todos with filtering functionality.
  - **`todo-detail.component.tsx`**: Displays details of a single todo item.
- **`types/`**: Contains TypeScript type definitions:
  - **`todo-type.ts`**: Defines the `Todo` interface.
- **`tests/`**: Contains test files **do not modify**:
  - **`todo-list.test.tsx`**: Tests for the `TodoList` component.
  - **`todo-detail.test.tsx`**: Tests for the `TodoDetail` component.
- **`favicon/`**: Contains favicon assets for the application.

For more details on the file structure, refer to [#folder:src](#folder:src).

```

```
