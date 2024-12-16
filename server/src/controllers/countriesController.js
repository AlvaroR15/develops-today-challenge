const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    getAvailableCountries: async(req,res) => {
        const response = await fetch('https://date.nager.at/api/v3/AvailableCountries');
        const countriesList = await response.json()
        if(countriesList) return res.status(200).json(countriesList)

        return res.status(404).json({messagge: 'Countries not found'})
    },

    getCountryInfo: async (req, res) => {
        
        const {code } = req.params
        const response = await fetch(`https://date.nager.at/api/v3/CountryInfo/${code}`);
        const countryInfo = await response.json();
    
        if (countryInfo) return res.status(200).json(countryInfo);
    
        return res.status(404).json({ message: 'Country info not found' });
    },

    getPopulationData: async(req,res) => {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/population')
        const populationCountries = await response.json()
        if (populationCountries) return res.status(200).json(populationCountries);

        return res.status(404).json({messagge: 'Population of countries data not found'})
    },
    
    getFlagUrlCountries: async(req,res) => {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images')
        const flagsUrl = await response.json()

        if (flagsUrl) return res.status(200).json(flagsUrl)
        
        return res.status(404).json('Flags Url not found')
    }
}