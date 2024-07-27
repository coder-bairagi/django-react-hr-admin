import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import MainLayout from './MainLayout'
import Dashboard from './scenes/hr/dashboard'
import Departments from './scenes/hr/departments'
import JobPositions from './scenes/hr/jobPositions'
import Employees from './scenes/hr/employees'
import AuthLayout from './AuthLayout'
import ProtectedRoutes from './components/ProtectedRoutes'
import TokenRefresher from './components/TokenRefresher'
import SignIn from './scenes/auth/signin'
import SignUp from './scenes/auth/signup'
import ForgotPassword from './scenes/auth/forgotPassword'
import Logout from './scenes/auth/logout.jsx'
import { useSelector } from 'react-redux'

function App() {
  const [theme, colorMode] = useMode();
  const user = useSelector(state => state.user)
  // Handling sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    const mobileView = window.innerWidth < 768;
    setIsMobile(mobileView);
    setIsCollapsed(mobileView);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {user.name && <TokenRefresher />}
          <Routes>
            {/* Auth related paths */}
            <Route path="/sign-in" element={
              <AuthLayout>
                <SignIn />
              </AuthLayout>
            } />
            <Route path="/sign-up" element={
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            } />
            <Route path="/forgot-password" element={
              <AuthLayout>
                <ForgotPassword />
              </AuthLayout>
            } />
            {/* Redirect base path to sign-in */}
            <Route path="/" element={<Navigate to="/sign-in" />} />
            {/* Dashboard related paths */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/*" element={
                <MainLayout isMobile={isMobile} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="departments" element={<Departments />} />
                    <Route path="job-positions" element={<JobPositions />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="logout" element={<Logout />} />
                  </Routes>
                </MainLayout>
              } />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
