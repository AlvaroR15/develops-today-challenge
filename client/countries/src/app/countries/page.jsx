'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react'
const axios = require('axios')


export default function Countries() {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const getCountries = async () => {
            try {
                const response = await axios.get('http://localhost:3011/countries/availables-countries');
                
                setCountries(response.data)
            } catch (error) {
                console.error('error:', error)
            }
        };
        getCountries();
     }, []);


    return (
        <div className='flex flex-col justify-center md:grid md:grid-cols-2 lg:grid-cols-4'>
        {
            Array.isArray(countries) && countries.map((country, i) => (
                <Link href={`/countries/${country.countryCode}`} key={i} className='underline underline-offset-1 border border-slate-600 text-zinc-600 py-4 px-6 text-center hover:bg-zinc-200 hover:text-lg'>
                    {country.name}
                </Link>
            ))
        }
    </div>
    )
}