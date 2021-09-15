require('dotenv').config()
const { Client } = require('@googlemaps/google-maps-services-js')
const client = new Client({})

// Return an Image file as a JS array buffer
const photosImage = async (req, res) => {
  const { photoRef } = req.query
  let result

  if (!photoRef) {
    return res.status(403).json('No search parameter')
  }

  try {
    result = await client.placePhoto({
      // url: 'https://maps.googleapis.com/maps/api/place/photo',
      responseType: 'arraybuffer',
      params: {
        maxwidth: 400,
        photoreference: photoRef,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    })
  } catch (err) {
    const errMsg = err.response.data
      ? err.response.data.error_message
      : err.message
    return res.status(200).send(errMsg || 'No image')
  }

  if (result.data) {
    return res.json(result.data)
  } else {
    return res.status(404).send('No image')
  }
}

// Construct and return a photo url
const photosUrl = (req, res) => {
  const { photoRef } = req.query

  if (!photoRef) {
    return res.status(403).send('No search parameter')
  }

  const url = `https://maps.googleapis.com/maps/api/place/photo
    &maxWidth=400&photoreference=${photoRef}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  res.status(200).send(url)
}

module.exports = {
  photosImage, photosUrl
}
