import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

function Piechart(props) {
    const data = props.data
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
      
  return (
    <PieChart width={400} height={400}>
          <Pie
            data={data}
            
            labelLine={true}
            label="hello world"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign='bottom' layout='vertical' iconType='star' height={8} align='center'/>
        </PieChart>
    
    )
}

export default Piechart