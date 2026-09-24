function Tools({ title, description, link }) {
  return (
    <div className="tools">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank">View my tools</a>
    </div>
  )
}

export default Tools