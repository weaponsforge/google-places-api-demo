require('dotenv').config()
const { Client } = require('@googlemaps/google-maps-services-js')
const client = new Client({})

// Return addresses with details that matches the input query.
// Useful for throttled autocomplete widgets.
const autocomplete = async (req, res) => {
  const { input } = req.query
  let result

  if (!input) {
    return res.status(403).json('No search parameter')
  }

  try {
    result = await client.placeAutocomplete({
      // url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      responseType: 'json',
      params: {
        input,
        // administrative_area_level_2: 'King County',
        // types: '(cities)',
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    })

    console.log(result)
  } catch (err) {
    const errMsg = err.response.data
      ? err.response.data.error_message
      : err.message
    return res.status(500).send(errMsg)
  }

  if (result.data.predictions) {
    return res.json(result.data.predictions)
  } else {
    return res.status(404).send('Not found.')
  }
}

module.exports = autocomplete
