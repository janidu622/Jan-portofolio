import ProjectCard from './ProjectCard'
function App() {
  

  return (
    <>
      <header>
        <h1>Janidu Siriwardhana</h1>
        <p>Full-Stack Developer</p>
      </header>

      <main>
        <section>
          <h2>About</h2>
          <p>I develop and design sustainable digital solutions .</p>
        </section>

        <section>
          <h2>Projects</h2>
            <ProjectCard
              title="E-commerce platform"
              description="E-commerce platform using MERN"
              link="https://github.com/you/todo-app"
            />
            
            <ProjectCard
              title="Weather App"
              description="A weather dashboard using a public API"
              link="https://github.com/you/weather-app"
            />
            <ProjectCard
              title="Todo App"
              description="A simple task manager"
              link="https://github.com/you/todo-app"
            />
        </section>
      </main>

      <footer>
        <p>©2026 Janidu</p>
      </footer>
    </>
  )
}


export default App
