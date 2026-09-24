// ProjectCard.jsx
function Languages({ title, description, link }) {
  return (
    <div className="languages">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank">View my labguages and tools</a>
    </div>
  )
}

export default Languages