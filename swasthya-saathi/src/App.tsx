import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Import theme
import theme from './utils/theme';

// Import contexts
import { AuthProvider } from './contexts/AuthContext';

// Import components
import Layout from './components/common/Layout';

// Import Pages
import Login from './pages/Login';

// Initialize i18n (translation)
import './utils/i18n';

// Lazy load other pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Members = React.lazy(() => import('./pages/Members'));
const MemberAdd = React.lazy(() => import('./pages/MemberAdd'));
const Finance = React.lazy(() => import('./pages/Finance'));
const FinanceAdd = React.lazy(() => import('./pages/FinanceAdd'));
const Inventory = React.lazy(() => import('./pages/Inventory'));
const InventoryAdd = React.lazy(() => import('./pages/InventoryAdd'));
const Activities = React.lazy(() => import('./pages/Activities'));
const HealthEvents = React.lazy(() => import('./pages/HealthEvents'));
const HealthInsights = React.lazy(() => import('./pages/HealthInsights'));
const GovtSchemes = React.lazy(() => import('./pages/GovtSchemes'));
const Training = React.lazy(() => import('./pages/Training'));
const Marketplace = React.lazy(() => import('./pages/Marketplace'));
const Register = React.lazy(() => import('./pages/Register'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const ItemDetail = React.lazy(() => import('./pages/ItemDetail'));
const EventDetail = React.lazy(() => import('./pages/EventDetail'));
const EventAdd = React.lazy(() => import('./pages/EventAdd'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In a real app, you would check auth state here
  const isAuthenticated = true; // For demo, always authenticated
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/members" element={
                <ProtectedRoute>
                  <Layout>
                    <Members />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/members/add" element={
                <ProtectedRoute>
                  <Layout>
                    <MemberAdd />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/finance" element={
                <ProtectedRoute>
                  <Layout>
                    <Finance />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/finance/add" element={
                <ProtectedRoute>
                  <Layout>
                    <FinanceAdd />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/inventory" element={
                <ProtectedRoute>
                  <Layout>
                    <Inventory />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/inventory/add" element={
                <ProtectedRoute>
                  <Layout>
                    <InventoryAdd />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/activities" element={
                <ProtectedRoute>
                  <Layout>
                    <Activities />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/events" element={
                <ProtectedRoute>
                  <Layout>
                    <HealthEvents />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/insights" element={
                <ProtectedRoute>
                  <Layout>
                    <HealthInsights />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/schemes" element={
                <ProtectedRoute>
                  <Layout>
                    <GovtSchemes />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/training" element={
                <ProtectedRoute>
                  <Layout>
                    <Training />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/marketplace" element={
                <ProtectedRoute>
                  <Layout>
                    <Marketplace />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Dynamic Item Detail Routes */}
              <Route path="/inventory/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <ItemDetail />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/events/add" element={
                <ProtectedRoute>
                  <Layout>
                    <EventAdd />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/events/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <EventDetail />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/finance/reports/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <ItemDetail />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/schemes/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <ItemDetail />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Default and Error Routes */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
