import React from 'react';
import { AreaChart, Area, ResponsiveContainer, ReferenceArea } from 'recharts';

const DarkAreaChart = () => {
  // 数据示例
  const data = [
    { name: 'Jan', uv: 4000 },
    { name: 'Feb', uv: 3000 },
    { name: 'Mar', uv: 2000 },
    { name: 'Apr', uv: 2780 },
    { name: 'May', uv: 1890 },
    { name: 'Jun', uv: 2390 },
  ];

  return (
    <ResponsiveContainer width="100%" height={"100%"} className='dark-area-chart'>
      <AreaChart data={data} >
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8" // 曲线的颜色
          fill="#8884d8"   // 曲线下方的填充颜色
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DarkAreaChart;
