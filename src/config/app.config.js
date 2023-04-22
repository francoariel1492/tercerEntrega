require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  persistence: process.env.PERSISTENCE || 'memory'
}

module.exports = config