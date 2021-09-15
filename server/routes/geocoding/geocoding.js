require('dotenv').config()
const { Client, AddressType } = require('@googlemaps/google-maps-services-js')
const client = new Client({})

// Returns full details of a single address or place_id.
// Does not include candidate address matches unlike "autocomplete".
const geocoding = async (req, res) => {
  const { input } = req.query
  let result

  if (!input) {
    return res.status(403).json('No search parameter')
  }

  try {
    result = await client.geocode({
      // url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        address: input,
        // administrative_area_level_2: 'King County',
        // components: 'country:us',
        // place_id: input,
        types: [
          AddressType.premise,
          AddressType.subpremise,
          AddressType.street_address
        ],
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    })
  } catch (err) {
    const errMsg = err.response.data
      ? err.response.data.error_message
      : err.message
    return res.status(500).send(errMsg)
  }

  if (result && result.data.results.length > 0) {
    return res.json(result.data.results)
  } else {
    return res.status(404).send('No result found.')
  }
}

module.exports = geocoding
