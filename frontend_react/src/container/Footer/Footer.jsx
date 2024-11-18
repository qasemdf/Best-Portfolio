import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';


import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';
import Validation from './Validation';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    name:'',
    email: '',
    message: ''
  })

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    setErrors(Validation(values))
  }

  const form = useRef();


  const sendEmail = (e) => {
    setLoading(true);
    e.preventDefault();

    emailjs
      .sendForm(process.env.REACT_APP_EMAILJS_SERVICE_KEY, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, {
        publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          setLoading(false);
          setIsFormSubmitted(true);
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };


  return (
    <>

      <h2 className="head-text">Take a coffee & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:qasemdean@gmail.com" className="p-text">qasemdean@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+1 (201) 450-0009" className="p-text">+1 (201) 450-0009</a>
        </div>
      </div>
      <form ref={form} className="app__footer-formEXP app__flex" >
        {!isFormSubmitted ? (
          <div className="app__footer-form app__flex">
            <div className="app__flex">
              <input className="p-text" type="text" placeholder="Your Name" name="name" value={username} onChange={handleChangeInput} />
            </div>
            <div className="app__flex">
              <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
            </div>
            <div>
              <textarea
                className="p-text"
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <button type="button" className="p-text" onClick={sendEmail} >{!loading ? 'Send Message' : 'Sending...'}</button>
          </div>
        ) : (
          <div>
            <h3 className="head-text">
              Thank you for getting in touch!
            </h3>
          </div>
        )}
      </form>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);           
