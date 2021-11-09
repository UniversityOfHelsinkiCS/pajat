import { useQuery as useBaseQuery } from 'react-query';

const normalizeQueryKey = (key) => (Array.isArray(key) ? key : [key]);

const useQuery = (queryKey, queryFn, options = {}) => {
  const { queryKeySuffix, ...restOptions } = options;

  const normalizedQueryKey = normalizeQueryKey(queryKey);
  const normalizedQueryKeySuffix = normalizeQueryKey(queryKeySuffix);

  const key = queryKeySuffix
    ? [...normalizedQueryKey, ...normalizedQueryKeySuffix]
    : normalizedQueryKey;

  return useBaseQuery(key, queryFn, restOptions);
};

export default useQuery;
