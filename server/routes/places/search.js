require('dotenv').config()
const { Client } = require('@googlemaps/google-maps-services-js')
const client = new Client({})

// Return the Place Search response
// https://developers.google.com/maps/documentation/places/web-service/search
// https://developers.google.com/maps/documentation/places/web-service/search-find-place
const search = async (req, res) => {
  const { input } = req.query
  let result

  if (!input) {
    return res.status(403).json('No search parameter')
  }

  try {
    result = await client.findPlaceFromText({
      // url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
      responseType: 'json',
      params: {
        input,
        inputtype: 'textquery',
        fields: ['name', 'photos'],
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    })
  } catch (err) {
    const errMsg = err.response.data
      ? err.response.data.error_message
      : err.message
    return res.status(500).send(errMsg)
  }

  if (result.data) {
    return res.json(result.data)
  } else {
    return res.status(404).send('Not found.')
  }
}

module.exports = search
