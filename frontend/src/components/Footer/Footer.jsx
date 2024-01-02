import React from 'react';
import './Footer.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {BsGithub,BsInstagram,BsLinkedin,BsYoutube} from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='footer'>
        <div>
            <Typography variant='h5'>About Me</Typography>
            <Typography>
                Hey, My name is Subhajit Bar. I am a <b>Full-Stack Developer</b> and a student of Computer Science and Engineering.
            </Typography>

            <Link to="/contact" className='footerContactBtn'>
                <Typography>Contact Us</Typography>
            </Link>
        </div>

        <div>
            <Typography variant="h6">Social Media</Typography>
            <a href="https://github.com/subhajitbar" target='blank'><BsGithub/></a>
            <a href="https://www.youtube.com/" target='blank'><BsYoutube/></a>
            <a href="https://www.linkedin.com/in/subhajit-bar-155a5b224/" target='blank'><BsLinkedin/></a>
            <a href="https://www.instagram.com/subhajit.bar.104/" target='blank'><BsInstagram/></a>
        </div>
    </div>
  )
}

export default Footer   