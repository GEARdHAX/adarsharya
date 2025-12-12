import React from 'react';
import ProjectCard from './ProjectCard.jsx';

const Projects = () => {
  const projectsData = [
    {
      image: '/media/netflix-logo.webp',
      imageStyle: { backgroundColor: 'black' },
      title: 'Netflix',
      subtitle: 'vanilla Code Clone',
      techCount: 4,
      techImages: [
        { src: '/media/html.png', alt: 'html' },
        { src: '/media/css.png', alt: 'css' },
        { src: '/media/js.png', alt: 'js' },
        { src: '/media/bootstrap.png', alt: 'bootstrap' }
      ],
      description: 'Unlimited Shows, Anytime',
      link: 'http://geardhax.github.io/Netflix/'
    },
    {
      image: '/media/beatbuddy.png',
      imageStyle: { backgroundColor: 'black', objectFit: 'contain' },
      title: 'Beat Buddy',
      subtitle: 'Music Player',
      techCount: 4,
      techImages: [
        { src: '/media/html.png', alt: 'html' },
        { src: '/media/css.png', alt: 'css' },
        { src: '/media/js.png', alt: 'js' },
        { src: '/media/chatgpt.png', alt: 'chatgpt' }
      ],
      description: 'Your Music Companion: Enjoy Every Beat',
      link: 'http://geardhax.github.io/beatbuddy/'
    },
    {
      image: '/media/Femprish.png',
      imageStyle: { objectFit: 'contain', backgroundColor: 'black' },
      title: 'Femprish',
      subtitle: 'Social Empowerment',
      techCount: 4,
      techImages: [
        { src: '/media/html.png', alt: 'html' },
        { src: '/media/css.png', alt: 'css' },
        { src: '/media/js.png', alt: 'js' },
        { src: '/media/bootstrap.png', alt: 'bootstrap' }
      ],
      description: 'Elevating Women Everywhere',
      link: 'http://geardhax.github.io/Femprish/'
    },
    {
      image: '/media/omdb.png',
      imageStyle: { objectFit: 'contain' },
      title: 'Omdb',
      subtitle: 'Movies Library',
      techCount: 3,
      techImages: [
        { src: '/media/html.png', alt: 'html' },
        { src: '/media/css.png', alt: 'css' },
        { src: '/media/js.png', alt: 'js' }
      ],
      description: 'Film Repository Vault Hub',
      link: 'http://geardhax.github.io/Omdb/'
    },
    {
      image: '/media/win11.webp',
      imageStyle: { objectFit: 'cover' },
      title: 'Windows 11',
      subtitle: 'Vanilla ui clone',
      techCount: 4,
      techImages: [
        { src: '/media/html.png', alt: 'html' },
        { src: '/media/css.png', alt: 'css' },
        { src: '/media/js.png', alt: 'js' },
        { src: '/media/chatgpt.png', alt: 'chatgpt' }
      ],
      description: 'Emulate Windows 11 Home',
      link: 'http://geardhax.github.io/win11/'
    },
    {
      image: '/media/google.jpg',
      imageStyle: { objectFit: 'cover' },
      title: 'Google',
      subtitle: 'Google UI clone',
      techCount: 3,
      techImages: [
        { src: '/media/html.png', alt: 'html' },
        { src: '/media/css.png', alt: 'css' },
        { src: '/media/js.png', alt: 'js' }
      ],
      description: 'Google UI Emulator with Search',
      link: 'http://geardhax.github.io/Google/'
    },
    {
      image: '/media/codepen.gif',
      imageStyle: { objectFit: 'cover' },
      title: 'Codepen',
      subtitle: 'All projects',
      techCount: 3,
      techImages: [
        { src: '/media/html.png', alt: 'html' },
        { src: '/media/css.png', alt: 'css' },
        { src: '/media/js.png', alt: 'js' }
      ],
      description: 'Every projects are hosted here!',
      link: 'https://codepen.io/gearhax_yt'
    }
  ];

  return (
    <>
      <center style={{ margin: '50px 0px', padding: '20px' }}>
        <h1 id="projects">Projects</h1>
      </center>
      <div className="logos">
        <div className="logos-slide">
          {projectsData.map((project, index) => (
            <ProjectCard key={`slide1-${index}`} {...project} />
          ))}
        </div>
        <div className="logos-slide">
          {projectsData.map((project, index) => (
            <ProjectCard key={`slide2-${index}`} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
