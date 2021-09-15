require('dotenv').config()
const { Client } = require('@googlemaps/google-maps-services-js')
const client = new Client({})

// Return the Place Details response of a place_id
// The place_id can be retrieved from "autocomplete"
// https://developers.google.com/maps/documentation/places/web-service/details
const details = async (req, res) => {
  const { placeId } = req.query
  let result

  if (!placeId) {
    return res.status(403).json('No search parameter')
  }

  try {
    result = await client.placeDetails({
      // url: 'https://maps.googleapis.com/maps/api/place/details/json',
      responseType: 'json',
      params: {
        place_id: placeId,
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

module.exports = details
