import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Headers from './components/Headers';

export default function App() {
  return (
    <BrowserRouter>
    {/* Header */}
    <Headers />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
  );
}
