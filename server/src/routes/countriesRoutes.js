const express = require('express')
const { getAvailableCountries, getCountryInfo, getPopulationData, getFlagUrlCountries } = require('../controllers/countriesController')
const router = express.Router()


router.get('/availables-countries', getAvailableCountries)



router.get('/country-info/:code', getCountryInfo)

router.get('/population', getPopulationData)

router.get('/flags-url', getFlagUrlCountries)

module.exports = router