# Packing Cost Calculator Frontend

A React-based web application for calculating packing costs, managing projects, models, and parts with destination-specific calculations.

## 🚀 Features

- **Project Management**: Create, edit, and manage projects with implementation periods and destination codes
- **Model Management**: Handle automotive models with destination-specific data and parts
- **Parts Management**: Manage parts catalog with supplier information and dimensions
- **Packing Cost Calculation**: Calculate CPS (Cost Per Set), DPI, and packing costs
- **Destination Management**: Auto-populate country information based on destination codes
- **Comparison Tools**: Compare multiple parts and models
- **Authentication**: Secure login system
- **Responsive Design**: Built with AdminLTE for a professional interface

## 🛠 Tech Stack

- **Frontend**: React 18.2.0 + Vite
- **Routing**: React Router DOM 6.14.1
- **Charts**: Chart.js with React integration
- **UI Framework**: AdminLTE 3.2 + Bootstrap 4.6
- **Icons**: Font Awesome 6.4.0
- **Testing**: Cucumber.js + Playwright
- **Build Tool**: Vite 5.0.8

## 📋 Prerequisites

Make sure you have the following installed:

- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher (comes with Node.js)
- **Git**: For version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ari-fikri/packing-cost-fe.git
cd packing-cost-fe
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Login Credentials

Use the following credentials to access the application:
- **Username**: `admin` (or any username)
- **Password**: `password` (or any password)

*Note: This is a demo application with simplified authentication*

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server with hot-reload |
| `npm run build` | Builds the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm start` | Build and serve the app (production mode) |

## 🧪 Testing

### End-to-End Testing with Cucumber

The project includes Cucumber.js tests with Playwright for E2E testing:

```bash
# Install test dependencies (if not already installed)
npm install

# Run Cucumber tests
npx cucumber-js

# Run specific feature
npx cucumber-js features/login.feature

# Run tests with specific tags
npx cucumber-js --tags @smoke
```

### Test Features Available

- **Login Authentication**: `features/login.feature`
- **Basic Functionality**: `features/simple.feature`

### Test Reports

Test reports are generated in the `reports/` directory:
- `cucumber-report.json`: JSON format test results
- Coverage reports available in `coverage/` directory

## 📁 Project Structure

```
packing-cost-fe/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── NewProjectModal.jsx
│   │   ├── NewModelModal.jsx
│   │   └── ...
│   ├── pages/              # Application pages
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   ├── Models.jsx
│   │   ├── Parts.jsx
│   │   └── packing/
│   ├── data/               # Static data files
│   │   ├── destinations.js
│   │   ├── models.json
│   │   ├── projects.json
│   │   └── parts.js
│   ├── auth.jsx            # Authentication context
│   ├── app.jsx             # Main app component
│   ├── main.jsx            # Application entry point
│   └── styles.css          # Global styles
├── features/               # Cucumber test features
├── reports/                # Test reports
├── coverage/               # Test coverage reports
├── public/                 # Static assets
├── package.json
├── vite.config.js
└── cucumber.config.js
```

## 🌍 Key Application Modules

### 1. Projects Management
- Create and manage CFC/PJT projects
- Implementation period tracking
- Destination-specific configurations
- Model associations

### 2. Models Management
- Automotive model catalog
- Destination code auto-population
- Parts association and management
- Implementation timeline tracking

### 3. Parts Management
- Comprehensive parts catalog
- Supplier information management
- Dimensional data (L×W×H)
- Weight and quantity calculations

### 4. Packing Cost Calculator
- **CPS (Cost Per Set)**: Calculate costs per set of parts
- **DPI**: Destination-specific calculations
- **Packing Cost**: Comprehensive cost analysis
- Multi-part comparison tools

### 5. Destination Management
Auto-populated destination information:
- **Destination Codes**: 807B, 722C, 301B, etc.
- **Country Codes**: TMMIN, TMT, TAR, etc.
- **Countries**: Indonesia, Thailand, Argentina, etc.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific settings:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=Packing Cost Calculator
```

### Destination Data

Destination codes and country mappings are configured in:
- `src/data/destinations.js`

### Default Data

Sample data is provided in:
- `src/data/models.json`: Model catalog
- `src/data/projects.json`: Project examples
- `src/data/parts.js`: Parts catalog

## 🚀 Deployment

### Production Build

```bash
npm run build
```

This creates a `dist/` folder with the production build.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Hosting Platform

The built files in `dist/` can be deployed to any static hosting service like:
- Railway
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   ```

2. **Node modules issues**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**:
   ```bash
   npm run lint
   npm run build
   ```

### Performance Tips

- Use the production build for deployment
- Enable gzip compression on your server
- Consider code splitting for large applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is private and proprietary.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Happy Coding! 🎉**
