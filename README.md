# Taishin AI Hackathon Dashboard

Taishin AI Hackathon Dashboard is a React-based web application built with Vite. It provides a modern and interactive platform for data visualization and prediction using tools like Chart.js and AWS SDK.

## Features

- **React 19**: Built with the latest version of React for modern UI development.
- **Vite**: Lightning-fast development environment with HMR (Hot Module Replacement).
- **Tailwind CSS**: Utility-first CSS framework for rapid UI styling.
- **Chart.js**: Interactive and customizable charts for data visualization.
- **AWS SDK**: Integration with AWS S3 for cloud storage.
- **React Router**: Client-side routing for seamless navigation.
- **D3-DSV**: Parsing and working with CSV data.

## Project Structure

```
.env
.gitignore
eslint.config.js
index.html
package.json
postcss.config.cjs
README.md
tailwind.config.cjs
vite.config.js
public/
  risk.csv
  vite.svg
src/
  App.css
  App.jsx
  index.css
  main.jsx
  assets/
    react.svg
  component/
    Sidebar/
      Sidebar.jsx
  page/
    Dashboard/
      Dashboard.jsx
      index.css
      DrawerContent/
        DrawerContent.jsx
        index.css
    Predict/
      Predict.jsx
```

### Key Directories

- **`src/component/Sidebar`**: Contains the `Sidebar` component for navigation.
- **`src/page/Dashboard`**: Implements the dashboard page, including drawer content.
- **`src/page/Predict`**: Implements the prediction page.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd taishin-ai-hackathon-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following fields:

   ```properties
   VITE_AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
   VITE_AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
   VITE_AWS_DEFAULT_REGION=<your-aws-region>
   ```

   Replace `<your-aws-access-key-id>`, `<your-aws-secret-access-key>`, and `<your-aws-region>` with your AWS credentials.

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Build

To create a production build:

```bash
npm run build
```

### Preview

To preview the production build:

```bash
npm run preview
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality.

## Dependencies

- **React**: ^19.0.0
- **React DOM**: ^19.0.0
- **React Router DOM**: ^7.5.2
- **Chart.js**: ^4.4.9
- **D3-DSV**: ^3.0.1
- **AWS SDK (S3)**: ^3.797.0
- **React Modern Drawer**: ^1.4.0
- **React Responsive Pagination**: ^2.10.5

## DevDependencies

- **Vite**: Development environment.
- **ESLint**: Linting for code quality.
- **Tailwind CSS**: Styling framework.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)
