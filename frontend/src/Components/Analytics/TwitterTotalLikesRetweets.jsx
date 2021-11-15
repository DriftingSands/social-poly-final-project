import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar } from 'recharts';
import {CustomToolTipWrapper, GraphWrapper} from './AnalyticsStyles'
import { useTheme } from "@mui/material/styles";


export default function TwitterTotalLikesRetweets() {
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
            let likes = 0
            let retweets = 0
            data.forEach(element => {
                likes += element.likes
                retweets += element.retweet_count
            });
            const newData = [{type: 'Likes', amount: likes}, {type: 'Retweets', amount: retweets}]
            setData(newData)
        }
        !data && getData()
    }, [data])

    const renderLineChart = () => {
        return (
            <GraphWrapper >
            <ResponsiveContainer width='100%' aspect={1.5} >
            <BarChart width={500} height={300} data={data} margin={{ top: 0, right: 20, bottom: 0, left: 0 }} >
                <YAxis tick={{ fill: theme.palette.text.primary }} dataKey='amount'/>
                <XAxis tick={{ fill: theme.palette.text.primary }} dataKey="type" />
                <CartesianGrid stroke={theme.palette.grey[500]} strokeDasharray='3 3' />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey='amount' fill={theme.palette.primary.main} />
            </BarChart>
            </ResponsiveContainer>
            </GraphWrapper>
        )};

    return (
        <div >
            {data && renderLineChart()}
            {/* {data && <span>{data[0].likes}test</span> } */}
        </div>
    )
}
