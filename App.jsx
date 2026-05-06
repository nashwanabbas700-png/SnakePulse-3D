import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Stats from './components/Stats'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  return (
    <>
      <Loader />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Stats />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

export default App
