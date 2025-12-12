import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const images = [
    '/media/pfp2.jpg',
    '/media/pfp.jpg',
    '/media/pfp3.jpg'
  ];
  
  const [imageIndex, setImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [dynamicText, setDynamicText] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);
  
  const words = [' Developer', ' Programmer', ' Freelancer'];
  const colors = ['#37ff8b'];
  
  const charIndexRef = useRef(0);
  const wordIndexRef = useRef(0);
  const isErasingRef = useRef(false);
  const textColorRef = useRef(colors[0]);

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setImageOpacity(0);
      setTimeout(() => {
        setImageIndex((prev) => (prev + 1) % images.length);
        setImageOpacity(1);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  // Typing animation effect
  useEffect(() => {
    const getRandomTime = (min, max) => Math.random() * (max - min) + min;
    const erasingTime = getRandomTime(50, 50);
    const typingTime = getRandomTime(50, 50);
    const newWordTime = 1000;
    const finishedWordTime = 2000;

    const type = () => {
      const currentWord = words[wordIndexRef.current];
      
      if (isErasingRef.current) {
        // Erasing
        if (charIndexRef.current > 0) {
          setIsBlinking(false);
          charIndexRef.current--;
          setDynamicText(currentWord.substring(0, charIndexRef.current));
          setTimeout(type, erasingTime);
        } else {
          // Finished erasing, move to next word
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          isErasingRef.current = false;
          setIsBlinking(true);
          textColorRef.current = colors[Math.floor(Math.random() * colors.length)];
          setTimeout(type, newWordTime);
        }
      } else {
        // Typing
        const targetWord = words[wordIndexRef.current];
        if (charIndexRef.current < targetWord.length) {
          setIsBlinking(false);
          charIndexRef.current++;
          setDynamicText(targetWord.substring(0, charIndexRef.current));
          
          if (charIndexRef.current >= targetWord.length) {
            setIsBlinking(true);
            setTimeout(() => {
              isErasingRef.current = true;
              type();
            }, finishedWordTime);
          } else {
            setTimeout(type, typingTime);
          }
        }
      }
    };

    const timeout = setTimeout(type, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div id="home" className="content">
      <div id="centered-text" className="box">
        <h1>Hi, I'm Adarsh Arya &&nbsp; I'm A</h1>
        <span 
          id="dynamic-text" 
          className="span-text"
          style={{ color: textColorRef.current }}
        >
          {dynamicText}
        </span>
        <h1>
          <span className={`cursor ${isBlinking ? 'blinking' : ''}`}></span>
        </h1>
      </div>
      <div className="box">
        <div className="circle">
          <img 
            id="landing-pic" 
            src={images[imageIndex]} 
            alt="Adarsh Arya"
            style={{ opacity: imageOpacity, transition: 'opacity 0.5s ease-in-out' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
