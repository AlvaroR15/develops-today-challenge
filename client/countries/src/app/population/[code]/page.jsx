'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

export default function PopulationChart() {
    const [populationData, setPopulationData] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('Argentina')

    useEffect(() => {
        const fetchPopulationData = async () => {
            try {
                const response = await axios.get('http://localhost:3011/countries/population');
                console.log(response.data.data);

                const argentinaData = response.data.data.find(country => country.code === 'ARG');
                console.log(argentinaData);
                
                
                if (argentinaData && argentinaData.populationCounts) {
                    const formattedData = argentinaData.populationCounts.map(item => ({
                        year: item.year,
                        population: item.value,
                    }));
                    setPopulationData(formattedData);
                }
            } catch (error) {
                console.error('Error fetching population data: ', error);
            }
        }

        fetchPopulationData()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold text-turquoise-500 mb-4">{selectedCountry} - Population Over Time</h1>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={populationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fill: '#333' }} />
                    <YAxis tick={{ fill: '#333' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="population" stroke="#00CED1" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
