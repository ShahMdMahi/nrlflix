import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-2'>
      <div className='flex items-center justify-center gap-4'>
      <Link to={"https://shahmdmahi.vercel.app"}>About</Link>
      <Link to={"mailto:shahmdmahi13@gmail.com"}>Contact</Link>
      </div>

      <p className='text-sm'>Created by Shah Md. Mahi</p>
    </footer>
  );
}

export default Footer;