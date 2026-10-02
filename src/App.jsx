import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import Login from "./login";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // GitHub repos
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch GitHub repos when the page loads
  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(
          "https://api.github.com/users/janidu622/repos"
        );

        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Failed to fetch repositories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const projects = [
    {
      title: "Weather App",
      description: "...",
      link: "...",
    },
    {
      title: "Todo App",
      description: "...",
      link: "...",
    },
    {
      title: "Portfolio Site",
      description: "...",
      link: "...",
    },
  ];

  return (
   
    <div className={darkMode ? "app dark" : "app light"}>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <header>
        <Login/>
        <h1>Janidu Siriwardhana</h1>
        <p>Full-Stack Developer</p>
       
      </header>

      <main>
        <section>
          <h2>About</h2>
          <p>clean code practitioner and leet code addict</p>
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
          ))}
        </section>

        <section>
          <h2>My GitHub Projects</h2>

          {loading ? (
            <p>Loading GitHub projects...</p>
          ) : (
            <ul>
              {repos.map((repo) => (
                <li key={repo.id}>
                  <h3>{repo.name}</h3>

                  <p>
                    {repo.description || "No description available."}
                  </p>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer>
        <p>©2026 Janidu</p>
      </footer>
    </div>
  );
}

export default App;