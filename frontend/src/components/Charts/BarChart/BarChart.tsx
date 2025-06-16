import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

type DataItem = {
  name: string;
  value: number;
};

type DynamicBarChartProps = {
  data: DataItem[];
};

const OSBarChart: React.FC<DynamicBarChartProps> = ({data}) => {

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={'12px'} tickLine={false} />
          <YAxis allowDecimals={false} fontSize={'12px'} tickLine={false} />
          <Tooltip cursor={false} />
          <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={30}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill="#3182CE" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OSBarChart;
