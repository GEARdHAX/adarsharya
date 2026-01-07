import React from 'react';

const ProjectCard = ({ 
  image, 
  imageStyle, 
  title, 
  subtitle, 
  techCount, 
  techImages, 
  description, 
  link 
}) => {
  // Define the base server URL for images
  const SERVER_URL = 'http://localhost:5000';

  // Helper function to format image sources
  const getFullImgPath = (path) => {
    if (!path) return '';
    // If the path is already a full URL (http:// or https://), return it as is
    if (path.startsWith('http')) return path;
    // Otherwise, prepend the server URL
    return `${SERVER_URL}${path}`;
  };

  return (
    <article className="card">
      <div className="thumb">
        <img 
          style={imageStyle} 
          loading="lazy" 
          src={getFullImgPath(image)} 
          alt={title} 
        />
      </div>
      <div className="infos">
        <h2 className="title">
          {title}
          <span className="flag">
            <img loading="lazy" src="/media/online.png" alt="Online" />
          </span>
        </h2>
        <h3 className="date">{subtitle}</h3>
        <h3 className="seats">Technology Used: {techCount}</h3>
        <div className="txt">
          {techImages && techImages.map((tech, index) => (
            <img 
              key={index}
              loading="lazy" 
              src={getFullImgPath(tech.src)} 
              alt={tech.alt} 
              title={tech.alt} // Shows name on hover
            />
          ))}
        </div>
        <p 
          className="site-description"
          style={{ 
            fontStyle: 'italic', 
            fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            textAlign: 'center'
          }}
        >
          {description}
        </p>
        <a 
          style={{ textDecoration: 'none' }} 
          className="details" 
          target="_blank" 
          rel="noopener noreferrer"
          href={link}
        >
          Visit Now
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;