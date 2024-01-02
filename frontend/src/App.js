import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUser, loadUser } from "./redux/action/user";
import { Toaster } from 'react-hot-toast';
import Loader from "./components/Loader/Loader";
import Timeline from "./components/Admin/Timeline";
import Youtube from "./components/Admin/Youtube";
import Project from "./components/Admin/Project";

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.login);
  const { loading, user } = useSelector(state => state.user);
  useEffect(() => {
    dispatch(getUser());
    dispatch(loadUser());
  }, [dispatch])


  return (
    <Router>
      {
        loading ? (<Loader />) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home timelines={user.timeline} youtubes={user.youtube} skills={user.skills} />} />
              <Route path="/about" element={<About about={user.about} />} />
              <Route path="/projects" element={<Projects projects={user.projects} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/account" element={isAuthenticated ? <Admin /> : <Login />} />
              <Route path="/admin/timeline" element={isAuthenticated ? <Timeline /> : <Login />} />
              <Route path="/admin/youtube" element={isAuthenticated ? <Youtube /> : <Login />} />
              <Route path="/admin/project" element={isAuthenticated ? <Project /> : <Login />} />
            </Routes>
            <Footer />
            <Toaster toastOptions={{ style: { fontFamily: "Ubuntu" } }} />
          </>
        )
      }

    </Router>
  );
}

export default App;
