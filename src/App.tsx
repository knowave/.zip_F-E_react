import React from "react";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ApartmentListPage from "./pages/ApartmentListPage";
import ApartmentDetailPage from "./pages/ApartmentDetailPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white font-sans"> */}
        <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white font-sans transition-colors duration-500">
          <Navbar />

          <main className="flex-1 bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account/*" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<ProfileEditPage />} />
              <Route path="/apartments" element={<ApartmentListPage />} />
              <Route path="/apartment" element={<ApartmentDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
