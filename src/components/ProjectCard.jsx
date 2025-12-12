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
  return (
    <article className="card">
      <div className="thumb">
        <img 
          style={imageStyle} 
          loading="lazy" 
          src={image} 
          alt={title} 
        />
      </div>
      <div className="infos">
        <h2 className="title">
          {title}
          <span className="flag">
            <img loading="lazy" src="/media/online.png" alt="" />
          </span>
        </h2>
        <h3 className="date">{subtitle}</h3>
        <h3 className="seats">Technology Used: {techCount}</h3>
        <p className="txt">
          {techImages.map((tech, index) => (
            <img 
              key={index}
              loading="lazy" 
              src={tech.src} 
              alt={tech.alt} 
            />
          ))}
        </p>
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
