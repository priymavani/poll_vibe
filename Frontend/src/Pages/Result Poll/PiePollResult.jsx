import React from 'react';
import { PieChart, Pie, Cell, Label, Tooltip } from 'recharts';

// Predefined color palette for dynamic coloring
const COLORS = [
  '#10B981', // Teal
  '#FF6B6B', // Coral
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#F43F5E', // Rose
  '#22D3EE', // Cyan
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const RADIAN = Math.PI / 180;

  // Adjust radius for label positioning
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Determine label placement based on angle
  const sin = Math.sin(-midAngle * RADIAN);
  const cos = Math.cos(-midAngle * RADIAN);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;

  return (
    <g>
      {/* Label text */}
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={cos >= 0 ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>

      {/* Optional: connect line for better visibility */}
      {/* <path
        d={`M${x},${y} L${sx},${sy}`}
        stroke="white"
        fill="none"
        strokeWidth={1}
        strokeDasharray="3 3"
      /> */}
    </g>
  );
};

const DynamicPieChart = ({ data }) => {
  // Ensure data exists and has values
  const chartData = data && data.length > 0
    ? data
    : [{ name: 'No Data', value: 100 }];

  return (
    <div className="bg-[#1F2937] p-4 rounded-lg">
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={160}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#374151',
            color: 'white',
            borderRadius: '8px'
          }}
          itemStyle={{ color: 'white' }}
        />
      </PieChart>
    </div>
  );
};

// Example usage
const PiePollResult = ({ data }) => {
  // Example dynamic data
  // const sampleData = [
  //   {
  //     "name": "Yes",
  //     "value": 1
  //   },
  //   {
  //     "name": "No",
  //     "value": 5
  //   },
  //   {
  //     "name": "Maybe",
  //     "value": 8
  //   }
  // ]

  console.log(data)
  return <DynamicPieChart data={data} />;
};

export default PiePollResult;