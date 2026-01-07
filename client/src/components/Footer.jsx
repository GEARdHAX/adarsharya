import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div style={{ margin: '50px 0px', padding: '20px' }} id="about" className="aboutme">
        <h1>About Me</h1>
        <br />
        <hr />
        <br />
        <p>
          Hey there! I'm Adarsh Arya, a tech enthusiast studying Electronics and Communication Engineering at DSCE
          Bangalore. Passionate about learning new skills and communicating with diverse individuals, I'm dedicated to
          pushing boundaries and embracing opportunities for innovation. Join me on this journey through technology and
          creativity. Thanks for visiting!
        </p>
        <br />
        <ul>
          <li>🔭 I'm currently working on self-improvement</li>
          <li>🌱 I'm currently learning React JS, Next JS, Auth JS, UI/UX</li>
          <li>
            👨‍💻 All of my projects are available at{' '}
            <a 
              style={{ textDecoration: 'none', color: '#37ff8b' }} 
              target="_blank" 
              rel="noopener noreferrer"
              href="https://codepen.io/gearhax_yt"
            >
              codepen.io/gearhax_yt
            </a>
          </li>
          <li>💬 Ask me about Designing</li>
          <li>
            📫 How to reach me{' '}
            <a 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline', color: '#37ff8b' }} 
              href="mailto:adarsharya2911@gmail.com"
            >
              adarsharya2911@gmail.com
            </a>
          </li>
        </ul>
      </div>
      <div className="socials">
        <h1>Follow Me</h1>
        <ul>
          {/* <li>
            <a 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'white' }} 
              href="https://discord.gg/RG2uWDTV"
            >
              <i className="fab fa-"></i>
            </a>
          </li> */}
          <li>
            <a 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'white' }} 
              href="https://www.instagram.com/gearhax_yt/"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'white' }} 
              href="https://codepen.io/gearhax_yt"
            >
              <i className="fa-brands fa-codepen"></i>
            </a>
          </li>
          <li>
            <a 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'white' }} 
              href="https://github.com/GEARdHAX"
            >
              <i className="fab fa-github"></i>
            </a>
          </li>
        </ul>
        <div className="location">
          <i className="fa-solid fa-house"></i>
          <span>
            <h4>
              Shavige Malleshwara Hills, 91st Main Rd, 1st Stage, Kumaraswamy Layout, Bengaluru, Karnataka 560078
            </h4>
          </span>
          <i className="fa-solid fa-phone"></i>
          <span>
            <h4>N/A</h4>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
