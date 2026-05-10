import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 
import AiChatbot from "./components/AiChatbot";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css"; 

function App() { 
  return ( 
    <BrowserRouter> 
      <div className="min-h-screen bg-background text-foreground flex flex-col"> 
        <Navbar /> 
        <main className="flex-1"> 
          <Routes> 
            <Route path="/" element={<Home />} /> 
            <Route path="/explore" element={<Explore />} /> 
            <Route path="/product/:id" element={<ProductDetails />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/about" element={<About />} /> 
            <Route path="/contact" element={<Contact />} /> 
          </Routes> 
        </main> 
        <Footer />
        <AiChatbot />
      </div> 
    </BrowserRouter> 
  ); 
} 
export default App;
