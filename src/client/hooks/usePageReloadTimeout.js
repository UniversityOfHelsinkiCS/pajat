import { useRef, useEffect } from 'react';

const usePageReloadTimeout = (time) => {
  const timeoutIdRef = useRef();

  useEffect(() => {
    if (time) {
      timeoutIdRef.current = setTimeout(() => {
        window.location.reload();
      }, time);
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [time]);
};

export default usePageReloadTimeout;
