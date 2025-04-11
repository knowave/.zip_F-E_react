import React from "react";
import "tailwindcss/tailwind.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ApartmentListPage from "./pages/ApartmentListPage";
import ApartmentDetailPage from "./pages/ApartmentDetailPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        <Navbar />

        <main className="flex-1 bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign/*" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/apartments" element={<ApartmentListPage />} />
            <Route path="/apartments/:id" element={<ApartmentDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
