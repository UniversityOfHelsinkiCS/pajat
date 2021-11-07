const isInIframe = () => window.location !== window.parent.location;

export default isInIframe;
