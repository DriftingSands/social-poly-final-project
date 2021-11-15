import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, Cell } from 'recharts';
import {CustomToolTipWrapper, GraphWrapper} from './AnalyticsStyles'
import { useTheme } from "@mui/material/styles";


export default function LastMulipostEngagement() {
    const theme = useTheme()
    const data = [
        {platform: 'Twitter', likes: 14, color: '#1D9BF0'},
        {platform: 'LinkedIn', likes: 24, color: '#1df039'},
        {platform: 'Facebook', likes: 10, color: '#f09c1d'},
    ]

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


    const renderLineChart = () => {
        return (
            <GraphWrapper >
            <ResponsiveContainer height='100%' aspect={1.5} >
            <BarChart width={500} height={300} data={data} margin={{ top: 0, right: 20, bottom: 0, left: 0 }} >
                <YAxis tick={{ fill: theme.palette.text.primary }} dataKey='likes'/>
                <XAxis tick={{ fill: theme.palette.text.primary }} dataKey="platform" />
                <CartesianGrid stroke={theme.palette.grey[500]} strokeDasharray='3 3' />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey='likes' fill={theme.palette.primary.main} >
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
            </BarChart>
            </ResponsiveContainer>
            </GraphWrapper>
        )};

    return (
        <div >
            {data && renderLineChart()}
        </div>
    )
}
