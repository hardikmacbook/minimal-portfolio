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
      <main className="pt-32 flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {sections.map((section) => (
          <section
            id={section.id}
            key={section.id}
            className="w-full max-w-2xl min-h-[60vh] flex flex-col justify-center items-center my-16 px-4 text-white text-center scroll-mt-32"
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