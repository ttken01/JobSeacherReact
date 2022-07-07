import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import ScrollToTop from "react-scroll-to-top";

function Footer() {
  return (
    <footer className="footer">
      <ScrollToTop smooth color="#1976d2" />
      <div className="footer__container">
      <Typography variant="h1" className="company" gutterBottom component="h1">
         Job Searcher
      </Typography>

      </div>
    </footer>
  );
}

export default Footer;
