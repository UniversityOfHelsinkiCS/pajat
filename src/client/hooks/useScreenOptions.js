import { useSearchParams } from 'react-router-dom';

import isInIframe from '../utils/isInIframe';

const useScreenOptions = () => {
  const [searchParams] = useSearchParams();

  const inIframe = isInIframe();

  const courseCodes = (searchParams.get('courseCodes') ?? '')
    .split(',')
    .filter(Boolean)
    .map((code) => code.toUpperCase());

  return {
    courseCodes,
    controls: searchParams.get('controls') !== 'false',
    gutters: searchParams.get('gutters')
      ? searchParams.get('gutters') !== 'false'
      : !inIframe,
    showLink: inIframe,
    linkUrl: window.location.href,
  };
};

export default useScreenOptions;
