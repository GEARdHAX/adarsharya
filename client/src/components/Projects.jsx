import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard.jsx';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL+'/api/projects');
        const data = await response.json();
        setProjectsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading Projects...</div>;
  }

  return (
    <>
      <center style={{ margin: '50px 0px', padding: '20px' }}>
        <h1 id="projects">Projects</h1>
      </center>
      
      {/* Keep existing structure. 
         Note: If you have few projects, the infinite scroll CSS might look odd.
         Ensure your CSS handles empty space or repeat the map as you did before.
      */}
      <div className="logos">
        <div className="logos-slide">
          {projectsData.map((project, index) => (
            <ProjectCard key={`slide1-${project._id || index}`} {...project} />
          ))}
        </div>
        <div className="logos-slide">
          {projectsData.map((project, index) => (
            <ProjectCard key={`slide2-${project._id || index}`} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;