import { useState } from "react";
import ProjectCard from "./ProjectCard";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const projects = [
  { title: "Weather App", description: "...", link: "..." },
  { title: "Todo App", description: "...", link: "..." },
  { title: "Portfolio Site", description: "...", link: "..." },
  ]

  return (
    <div className={darkMode ? "app dark" : "app light"}>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <header>
        <h1>Janidu Siriwardhana</h1>
        <p>Full-Stack Developer</p>
      </header>

      <main>
        <section>
          <h2>About</h2>
          <p>I develop and design sustainable digital solutions.</p>
        </section>

        <section>
          <h2>Projects</h2>
           {projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                link={project.link}
              />
            ))
           }
          
        </section>
      </main>

      <footer>
        <p>©2026 Janidu</p>
      </footer>

    </div>
  );
}

export default App;