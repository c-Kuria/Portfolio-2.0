import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

// Lazy load components
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const AnimatedBackground = lazy(() => import("./components/Background"));
const Portofolio = lazy(() => import("./Pages/Portofolio"));
const ContactPage = lazy(() => import("./Pages/Contact"));
const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const WelcomeScreen = lazy(() => import("./Pages/WelcomeScreen"));

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © 2025{" "}
                <a href="https://flowbite.com/" className="hover:underline">
                  Brian™
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

LandingPage.propTypes = {
  showWelcome: PropTypes.bool.isRequired,
  setShowWelcome: PropTypes.func.isRequired
};

LandingPage.displayName = 'LandingPage';

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Brian™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <AnimatePresence mode="wait">
                  {showWelcome && (
                    <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
                  )}
                </AnimatePresence>

                {!showWelcome && (
                  <>
                    <Navbar />
                    <AnimatedBackground />
                    <Home />
                    <About />
                    <Portofolio />
                    <ContactPage />
                    <footer>
                      <center>
                        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
                        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                          © 2025{" "}
                          <a href="https://flowbite.com/" className="hover:underline">
                            Brian™
                          </a>
                          . All Rights Reserved.
                        </span>
                      </center>
                    </footer>
                  </>
                )}
              </>
            } 
          />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

App.displayName = 'App';

export default App;