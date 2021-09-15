const express = require('express')
const router = express.Router()

const { geocoding } = require('./geocoding')
const {
  autocomplete,
  photos,
  details,
  search
} = require('./places')

// Places API
router.get('/places/search', autocomplete)
router.get('/places/details', details)
router.get('/places/find', search)
router.get('/places/photos', photos.photosImage)
router.get('/places/photosUrl', photos.photosUrl)

// Geocode API
router.get('/geocoding/search', geocoding)

module.exports = router
