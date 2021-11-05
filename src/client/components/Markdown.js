import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, Typography } from '@mui/material';

const H1 = (props) => (
  <Typography variant="h3" component="h1" mb={2} {...props} />
);

const H2 = (props) => (
  <Typography variant="h4" component="h2" mb={2} {...props} />
);

const H3 = (props) => (
  <Typography variant="h5" component="h3" mb={2} {...props} />
);

const H4 = (props) => (
  <Typography variant="h6" component="h4" mb={2} {...props} />
);

const P = (props) => (
  <Typography variant="body1" component="p" mb={2} {...props} />
);

const defaultComponents = {
  p: P,
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
};

const Markdown = ({ components = {}, ...props }) => (
  <ReactMarkdown
    components={{ ...defaultComponents, ...components }}
    linkTarget="_blank"
    {...props}
  />
);

export default Markdown;
