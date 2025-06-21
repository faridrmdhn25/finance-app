import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const PieChartKategori = ({ data, type }) => {
  const COLORS = ['#00bcd4', '#ff9800', '#f44336', '#8bc34a', '#e91e63']

  return (
    <div className="bg-[#112d3b] p-4 rounded-xl shadow text-white mt-8">
      <h2 className="text-lg font-semibold mb-4">Distribution of {type} by Category</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1f3544", border: "none", }}
          />
          <Legend
            wrapperStyle={{
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChartKategori
