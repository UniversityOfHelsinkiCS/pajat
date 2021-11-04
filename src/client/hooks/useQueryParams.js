import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { fromPairs } from 'lodash';

const useQueryParams = () => {
  const { search } = useLocation();

  const params = useMemo(() => {
    const urlParams = new URLSearchParams(search);

    return fromPairs(Array.from(urlParams.entries()));
  }, [search]);

  return params;
};

export default useQueryParams;
