const common = require('@root/config/common')

const PORT = process.env.PORT || 8000
const API_KEY = process.env.API_KEY || console.error('API_KEY ENV MISSING')
const DOCUMENT_ID = process.env.DOCUMENT_ID || console.error('DOCUMENT_ID ENV MISSING')

module.exports = {
  ...common,
  PORT,
  API_KEY,
  SHEET_ID: DOCUMENT_ID,
}
