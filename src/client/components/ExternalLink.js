import React from 'react';
import { Link } from '@mui/material';
import ExternalLinkIcon from '@mui/icons-material/OpenInNew';

const ExternalLink = ({ children, ...props }) => (
  <Link target="_blank" rel="noreferer" {...props}>
    {children}
    <ExternalLinkIcon sx={{ ml: 0.5, fontSize: '1rem' }} />
  </Link>
);

export default ExternalLink;
