# Personal Task Manager

A comprehensive personal task management application built with ReactJS, featuring user authentication, task management, and modern UI/UX design.

## 🚀 Features

### 🔐 User Authentication
- **User Registration**: Create new accounts with email and password
- **User Login**: Authenticate users with registered credentials
- **Logout**: Secure session termination
- **Protected Routes**: Only authenticated users can access protected pages

### 📋 Task Management
- **Add New Tasks**: Create tasks with title, description, priority, and due date
- **Edit Tasks**: Update existing task information
- **Delete Tasks**: Remove unnecessary tasks with confirmation
- **Mark Complete**: Toggle task completion status
- **Status Display**: Distinguish between completed, pending, and overdue tasks

### 🔍 Search and Filter
- **Keyword Search**: Find tasks by title or description
- **Status Filtering**: Display all, completed, or pending tasks
- **Smart Sorting**: Highlight overdue and today's tasks with special badges

### 👤 Profile Management
- **Personal Information**: Display user profile details
- **Usage Statistics**: Join date and usage time tracking

## 🛠️ Technologies Used

- **ReactJS 18**: Main framework with Class Components
- **React Router DOM**: Routing and navigation management
- **Bootstrap 5**: Responsive CSS framework
- **Font Awesome**: Icon library
- **localStorage**: Client-side data storage for users and tasks

## 📁 Project Structure

```
src/
├── components/           # UI Components
│   ├── common/          # Reusable components
│   │   ├── Alert.js     # Alert notifications
│   │   ├── Button.js    # Custom button component
│   │   └── FormField.js # Form field wrapper
│   ├── login/           # Login components
│   │   ├── LoginFields.js
│   │   └── LoginForm.js
│   ├── register/        # Registration components
│   │   ├── RegisterFields.js
│   │   └── RegisterForm.js
│   ├── tasks/           # Task management components
│   │   ├── TaskList.js  # Task list and management
│   │   ├── TaskItem.js  # Individual task display
│   │   ├── TaskForm.js  # Add/edit task form
│   │   └── TaskFilter.js # Search and filter
│   └── Navbar.js        # Navigation bar
├── pages/               # Main pages
│   ├── Home.js          # Main dashboard - task management
│   ├── Login.js         # Login page
│   ├── Register.js      # Registration page
│   └── Profile.js       # User profile page
├── router/              # Routing management
│   └── AppRoutes.js     # Route definitions and protection
├── services/            # Business logic services
│   └── authService.js   # Authentication service
├── utils/               # Utilities and helpers
│   └── storage.js       # localStorage management
├── styles/              # CSS files
│   ├── auth/            # Authentication styles
│   │   ├── Login.css
│   │   └── Register.css
│   ├── tasks/           # Task component styles
│   │   ├── TaskList.css
│   │   ├── TaskForm.css
│   │   ├── TaskItem.css
│   │   └── TaskFilter.css
│   ├── components.css   # Common component styles
│   ├── Home.css         # Home page styles
│   └── Profile.css      # Profile page styles
├── App.js               # Main application component
├── App.css              # App-level styles
├── index.js             # Application entry point
└── index.css            # Global styles
```

## 🎨 UI/UX Design

### 🎯 Design Principles
- **Responsive Design**: Compatible with all devices
- **Modern UI**: Contemporary interface with Bootstrap 5
- **Smooth Animations**: Professional and fluid effects
- **Intuitive UX**: User-friendly experience

### 🎨 Component Styling
- **TaskList**: Task list display with fadeIn animations
- **TaskForm**: Add/edit forms with validation and feedback
- **TaskItem**: Task cards with hover effects
- **TaskFilter**: Filter components with focus animations

## 🚀 Installation and Setup

### System Requirements
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd personal-task-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Access the application**
Open your browser and navigate to: `http://localhost:3000`

### Alternative Port (if 3000 is busy)
If port 3000 is already in use, the application will automatically suggest using another port (usually 3001).

## 📖 User Guide

### Registration
1. Navigate to the registration page
2. Fill in all required information: Full Name, Email, Password
3. Confirm your password
4. Select your gender
5. Accept the terms and conditions
6. Click "Register"

### Login
1. Navigate to the login page
2. Enter your registered Email and Password
3. Click "Login"

### Task Management
1. **Add New Task**: Click "Add a new task..." and fill in the details
2. **Edit Task**: Click the edit icon on any task
3. **Delete Task**: Click the delete icon and confirm
4. **Mark Complete**: Click the checkbox on the left of any task
5. **Search**: Use the search box to find specific tasks
6. **Filter**: Select status from the dropdown menu

## 💾 Data Storage

### localStorage Structure
```javascript
// Users array
'users': [
  {
    id: number,
    name: string,
    email: string,
    password: string,
    gender: string,
    createdAt: string
  }
]

// Current logged-in user
'currentUser': {
  id: number,
  name: string,
  email: string,
  password: string,
  gender: string,
  createdAt: string
}

// Tasks for each user
'tasks_${userId}': [
  {
    id: number,
    title: string,
    description: string,
    priority: string,
    dueDate: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string
  }
]
```

## 🔧 Key Features

### ✅ Comprehensive Validation
- Email format validation
- Password minimum 6 characters
- Password confirmation matching
- Task form validation

### 🎨 Professional UI/UX
- Loading states with spinners
- Error handling with alerts
- Success feedback messages
- Smooth transitions and animations

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

### 🔒 Security Features
- Protected routes
- Session management
- Data validation and sanitization

## 🚀 Future Enhancements

### 📊 Potential Features
- **Statistics Dashboard**: Task completion charts and analytics
- **Task Categories**: Organize tasks by categories
- **Priority Levels**: High, medium, low priority management
- **Reminders**: Deadline notifications and alerts
- **Export/Import**: Data backup and restore functionality
- **Dark Mode**: Light/dark theme toggle
- **Offline Support**: PWA capabilities for offline usage
- **Real-time Sync**: Multi-device synchronization

### 🔧 Technical Improvements
- **Backend API**: Server-side implementation
- **Database**: PostgreSQL/MongoDB integration
- **Authentication**: JWT token-based auth
- **State Management**: Redux or Context API
- **Testing**: Unit tests and E2E testing
- **PWA**: Progressive Web App features

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   - Solution: Choose 'Y' when prompted to use another port
   - Or manually kill the process: `npx kill-port 3000`

2. **Dependencies installation fails**
   - Solution: Clear npm cache: `npm cache clean --force`
   - Then reinstall: `npm install`

3. **Application not loading**
   - Check if Node.js version is 14 or higher
   - Ensure all dependencies are installed
   - Check browser console for errors

### Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (not recommended)
npm run eject
```

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please:
1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 🤝 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all dependencies are properly installed
4. Verify Node.js version compatibility

---

**Personal Task Manager** - Efficient personal task management made simple! 🚀
