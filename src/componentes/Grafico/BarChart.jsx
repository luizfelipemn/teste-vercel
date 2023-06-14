import React, { Component } from 'react';
import { BarChart, ResponsiveContainer } from 'recharts';
import { Bar } from 'recharts';
import { XAxis } from 'recharts';
import { YAxis } from 'recharts';
// import { CartesianGrid } from 'recharts';
import { Tooltip } from 'recharts';
import { Legend } from 'recharts';
import '../../componentes/Grafico/BarChart.css';
// import styled from 'styled-components';

const data = [
    {
        "name": "Terror",
        "uv": 300
    },
    {
        "name": "Ação",
        "uv": 200
    },
    {
        "name": "Comédia",
        "uv": 100
    },
    {
        "name": "Aventura",
        "uv": 50
    },
    {
        "name": "Drama",
        "uv": 25
    }
]

class sBarChart extends Component {
    render() {
        return (
            <ResponsiveContainer>
                <BarChart className='divGrafico' width={587.49} height={381.43} data={data}>
                    <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                            <stop offset="0%" stopColor="#72FFBB" />
                            <stop offset="100%" stopColor="#3CFE38" strokeDasharray={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="uv" fill="url(#gradient)" barSize={ 56 } radius={ [ 10, 10, 10, 10 ] }   />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default sBarChart;
