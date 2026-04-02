import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Book from './pages/Book';

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

function AnimatedSection({ id, children }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
}

function Home() {
  return (
    <div>
      <AnimatedSection id="home">
        <Hero />
      </AnimatedSection>

      <AnimatedSection id="features">
        <Features />
      </AnimatedSection>

      <AnimatedSection id="pricing">
        <Pricing />
      </AnimatedSection>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/book" element={<Book />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;