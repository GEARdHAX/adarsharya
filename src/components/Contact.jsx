import React from 'react';

const Contact = () => {
  return (
    <>
      <center style={{ margin: '50px 0px', padding: '20px' }}>
        <h1>Get in touch</h1>
      </center>
      <form id="contact" action="https://api.web3forms.com/submit" method="post">
        <div className="form__group field">
          <input type="hidden" name="access_key" value="acd7f95a-731a-4d7b-ae76-5d98a92a2ce7" />
          <input 
            type="input" 
            className="form__field" 
            placeholder="Name" 
            name="name" 
            id="name" 
            required 
          />
          <label htmlFor="name" className="form__label">Your Name</label>
        </div>
        <br />
        <div className="form__group field">
          <input 
            type="input" 
            className="form__field" 
            placeholder="email" 
            name="email" 
            id="email" 
            required 
          />
          <label htmlFor="email" className="form__label">Your E-mail</label>
        </div>
        <br />
        <div className="form__group field">
          <input 
            type="number" 
            className="form__field" 
            placeholder="number" 
            name="number" 
            id="number" 
            required 
            maxLength="10" 
          />
          <label htmlFor="number" className="form__label">Phone Number</label>
        </div>
        <br />
        <br />
        <textarea 
          required 
          name="comment" 
          id="comment" 
          placeholder="Your comment"
        ></textarea>
        <br />
        <br />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Contact;
