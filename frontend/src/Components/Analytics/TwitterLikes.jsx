import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {CustomToolTipWrapper, GraphWrapper} from './AnalyticsStyles'
import { useTheme } from "@mui/material/styles";


export default function TwitterLikes() {
    const [data, setData] = useState(false)
    const theme = useTheme()

    function CustomTooltip({ payload, label, active }) {
        if (active) {
          return (
            <CustomToolTipWrapper theme={theme} >
            <div className="customTooltip">
              <p className="label">{payload[0].payload.created_at}</p>
              <p className='likes'>Likes: {payload[0].value}</p>
              <p className='content'>{payload[0].payload.content}</p>
            </div>
            </CustomToolTipWrapper>
          );
        }
        return null;
      }

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const {data} = await axios.get(`https://socialpoly.ch/backend/api/twitter/analitycs/`, config)
            data.forEach(element => {
                element.created_at_short = element.created_at.substring(0, 10)
            });
            setData(data.slice(0, 5))
        }
        !data && getData()
    }, [data])

    const renderLineChart = () => {
        return (
            <GraphWrapper >
            <ResponsiveContainer width='100%' aspect={2} >
            <LineChart width={100} height={400} data={data} margin={{ top: 0, right: 20, bottom: 0, left: 0 }} >
                <Line type="monotone" dataKey="likes" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} strokeWidth={2} activeDot={{ r: 6 }} />
                <YAxis tick={{ fill: theme.palette.text.primary }} dataKey='likes'/>
                <XAxis tick={{ fill: theme.palette.text.primary }} dataKey="created_at_short" />
                <CartesianGrid stroke={theme.palette.grey[500]} strokeDasharray='3 3' />
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
            </ResponsiveContainer>
            </GraphWrapper>
        )};

    return (
        <div >
            {data && renderLineChart()}
        </div>
    )
}
