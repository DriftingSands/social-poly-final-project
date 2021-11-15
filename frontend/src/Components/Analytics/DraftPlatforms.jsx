import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Tooltip, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import {CustomToolTipWrapper, GraphWrapper} from './AnalyticsStyles'
import { useTheme } from "@mui/material/styles";


export default function DraftPlatforms() {
    const [sumOfAll, setSumOfAll] = useState(0)
    const [data, setData] = useState(false)
    const theme = useTheme()

    function CustomTooltip ({active, payload, }) {
        if (active) {
          return (
            <CustomToolTipWrapper theme={theme} >
            <div className="customTooltip">
              <p className="label">{payload[0].payload.type}: {payload[0].value}</p>
              <p className="percent">{`${(100 / (sumOfAll) * payload[0].value).toFixed(0)}%`}</p>
            </div>
            </CustomToolTipWrapper>
          );
        }
        return null;
      }

    
    
    const customLabel = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, outerRadius, fill, payload, percent} = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
        
        return (
            <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={theme.palette.text.primary}>{`${payload.type}: ${payload.amount}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">{`(Rate ${(percent * 100).toFixed(0)}%)`}</text>
            </g>
        );
        };

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const {data} = await axios.get(`https://socialpoly.ch/backend/api/draft/create/`, config)
            const dataTwitter = {type: 'Twitter', amount: 0, color: '#1D9BF0'}
            const dataLinkedin = {type: 'LinkedIn', amount: 0, color: '#1df039'}
            const dataFacebook = {type: 'Facebook', amount: 0, color: '#f09c1d'}
            const dataTiktok = {type: 'TikTok', amount: 0, color: '#f01d4b'}
            const dataInstagram = {type: 'Instagram', amount: 0, color: '#911df0'}
            data.forEach(element => {
                if (element.is_twitter) {dataTwitter.amount = dataTwitter.amount + 1}
                if (element.is_linkedin) {dataLinkedin.amount = dataLinkedin.amount + 1}
                if (element.is_facebook) {dataFacebook.amount = dataFacebook.amount + 1}
                if (element.is_instagram) {dataInstagram.amount = dataInstagram.amount + 1}
                if (element.is_tiktok) {dataTiktok.amount = dataTiktok.amount + 1}
            });
            const newData = []
            dataTwitter.amount && newData.push(dataTwitter)
            dataLinkedin.amount && newData.push(dataLinkedin)
            dataFacebook.amount && newData.push(dataFacebook)
            dataTiktok.amount && newData.push(dataTiktok)
            dataInstagram.amount && newData.push(dataInstagram)
            setData(newData)
            const sum = dataTwitter.amount + dataLinkedin.amount + dataFacebook.amount + dataTiktok.amount + dataInstagram.amount
            setSumOfAll(sum)
        }
        !data && getData()
    }, [data])

    const renderLineChart = () => {
        return (
            <GraphWrapper >
            <ResponsiveContainer height='100%' aspect={1.8} >
            <PieChart width={400} height={400} >
                <Pie data={data} dataKey="amount" cx="50%" cy="50%" outerRadius='60%' fill={theme.palette.primary.main} label={customLabel} tooltipType='pie' >
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip content={CustomTooltip} />
            </PieChart>
            </ResponsiveContainer>
            </GraphWrapper>
        )};

    return (
        <div >
            {data && renderLineChart()}
        </div>
    )
}
