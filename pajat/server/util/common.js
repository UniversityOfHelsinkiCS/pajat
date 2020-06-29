require('dotenv').config();
const common = require('@root/config/common');
const logger = require('@util/logger');

const axios = require('axios');
const NodeCache = require('node-cache');

const PORT = process.env.PORT || 8000;
const API_KEY = process.env.API_KEY || console.error('API_KEY ENV MISSING');
const DOCUMENT_ID =
  process.env.DOCUMENT_ID || console.error('DOCUMENT_ID ENV MISSING');
const DOCUMENT_ID2 =
  process.env.DOCUMENT_ID2 || console.error('DOCUMENT_ID2 ENV MISSING');

const cacheTtl = 60 * 5; // 5 min
const cache = new NodeCache({ stdTTL: cacheTtl, deleteOnExpire: false });

const refreshCache = async (sheetsUrl) => {
  try {
    const response = await axios.get(encodeURI(sheetsUrl));
    const { values } = response.data;
    if (!values) return false;
    // Thank google sheets for responding with crap
    if (
      values.find((arr) =>
        arr.find(
          (v) =>
            v.toLowerCase().includes('#error') ||
            v.toLowerCase().includes('#name') ||
            v.toLowerCase().includes('loading')
        )
      )
    ) {
      return false;
    }
    cache.set(sheetsUrl, values);
    return values;
  } catch (e) {
    return false;
  }
};

const fetchValues = async (sheetsUrl) => {
  const cacheHit = cache.get(sheetsUrl);
  const ttl = cache.getTtl(sheetsUrl);
  const expired = ttl - Date.now() < 0;
  if (cacheHit && !expired) return cacheHit;
  const values = await refreshCache(sheetsUrl);

  if (!values && cacheHit) return cacheHit; // If can't update, return old if possible

  if (!values) {
    logger.info('Not in cache and could not get data');
    logger.info(sheetsUrl);
  }
  return values;
};

module.exports = {
  ...common,
  fetchValues,
  PORT,
  API_KEY,
  SHEET_ID: DOCUMENT_ID,
  SHEET_ID2: DOCUMENT_ID2,
};
