'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Info({ params }) {
    const { info} = params
    const [country, setCountry] = useState(null)
    const [flags, setFlags] = useState([])
    const [borders, setBorders] = useState([])


    useEffect(() => {
        const getCountryInfo = async () => {
            try {
                const responseInfo = await axios.get(`http://localhost:3011/countries/country-info/${info}`)
                const responseFlags = await axios.get('http://localhost:3011/countries/flags-url');

                setCountry(responseInfo.data);
                setFlags(responseFlags.data.data)
                setBorders(responseInfo.data.borders)
            } catch (error) {
                console.log('Something went wrong, error: ', error)
            }
        };
        getCountryInfo();
    }, [info]);

    

    const findFlag = flags.find(flag => flag.iso2 === country?.countryCode);

    return (
        <>
            {country && (
                <div className="min-h-screen flex flex-col items-center bg-white text-gray-800 p-6">
                    {/* Country Info Container */}
                    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 md:p-8">
                        {/* Flag and Country Name */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                            <img
                                src={findFlag?.flag || ''}
                                alt={`${country.commonName} Flag`}
                                className="w-32 h-20 md:w-48 md:h-32 object-cover rounded-lg shadow-md"
                            />
                            <h1 className="text-3xl md:text-5xl font-bold text-turquoise-500 text-center">
                                {country.commonName}
                            </h1>
                        </div>

                        {/* Bordering Countries */}
                        {borders?.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                                    Bordering Countries:
                                </h2>
                                <ul className="flex flex-wrap gap-4">
                                    {borders.map((border, i) => (
                                        <li key={i}>
                                            <Link
                                                href={`/countries/${border.countryCode}`}
                                                className="block bg-turquoise-100 hover:bg-turquoise-200 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-sm transition-transform transform hover:scale-105"
                                            >
                                                {border.commonName}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
