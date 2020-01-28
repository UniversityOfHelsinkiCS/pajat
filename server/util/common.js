const common = require('@root/config/common')
const axios = require('axios')
const NodeCache = require('node-cache')

const PORT = process.env.PORT || 8000
const API_KEY = process.env.API_KEY || console.error('API_KEY ENV MISSING')
const DOCUMENT_ID = process.env.DOCUMENT_ID || console.error('DOCUMENT_ID ENV MISSING')

const cacheTtl = 60 * 5 // 5 min
const cache = new NodeCache({ stdTTL: cacheTtl, deleteOnExpire: false })

const refreshCache = async (sheetsUrl) => {
  const response = await axios.get(encodeURI(sheetsUrl))
  const { values } = response.data
  if (!values) return false

  cache.set(sheetsUrl, values)
  return values
}

const fetchValues = async (sheetsUrl) => {
  const cacheHit = cache.get(sheetsUrl)
  const ttl = cache.getTtl(sheetsUrl)
  const expired = (ttl - Date.now()) < 0
  if (cacheHit && !expired) return cacheHit

  const values = await refreshCache(sheetsUrl)

  if (!values && cacheHit) return cacheHit // If can't update, return old if possible

  return values
}

module.exports = {
  ...common,
  fetchValues,
  PORT,
  API_KEY,
  SHEET_ID: DOCUMENT_ID,
}
