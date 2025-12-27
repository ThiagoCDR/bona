import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClientDashboard from './pages/client/ClientDashboard';
import RentalDetails from './pages/RentalDetails';
import SearchResults from './pages/SearchResults';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ContactInfoSection from './components/ContactInfoSection';
import FeaturesSection from './components/FeaturesSection';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <FeaturesSection />
                  <Fleet showPrice={true} />
                  <ContactInfoSection />
                </>
              } />
              <Route path="/fleet" element={<Fleet showPrice={false} />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/rent/:id" element={<RentalDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/admin" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="/client" element={
                <ProtectedRoute role="client">
                  <ClientDashboard />
                </ProtectedRoute>
              } />
            </Routes>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
