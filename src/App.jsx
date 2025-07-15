import React from 'react'
import Navbar from './components/Navbar'

const sections = [
  { id: 'home', label: 'Home', content: 'Welcome to my portfolio!' },
  { id: 'about', label: 'About', content: 'About me section.' },
  { id: 'projects', label: 'Projects', content: 'Some of my projects.' },
  { id: 'contact', label: 'Contact', content: 'Contact me here.' },
];

const App = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <section
          id="home"
          className="w-full max-w-3xl min-h-[70vh] flex flex-col justify-center items-center mt-20 mb-16 px-4 text-white text-center scroll-mt-20"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 drop-shadow-lg">Welcome to my portfolio!</h1>
          <p className="text-xl sm:text-2xl opacity-90 mb-8">I am a passionate developer. Explore my work below.</p>
          {/* Add a call-to-action or hero image here if desired */}
        </section>
        {sections.slice(1).map((section) => (
          <section
            id={section.id}
            key={section.id}
            className="w-full max-w-2xl min-h-[60vh] flex flex-col justify-center items-center my-16 px-4 text-white text-center scroll-mt-20"
          >
            <h2 className="text-3xl font-bold mb-4">{section.label}</h2>
            <p className="text-lg opacity-80">{section.content}</p>
          </section>
        ))}
      </main>
    </>
  )
}

export default App