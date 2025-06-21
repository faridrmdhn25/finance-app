import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const BarChartBulanan = ({ data }) => {
    return (
        <div className="w-full h-[300px] bg-[#0e2735] rounded-xl p-4 shadow">
            {
                data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2d4f5e" />
                            <XAxis dataKey="name" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Income" fill="#4ade80" label={{ position: "top", fill: "#fff", fontSize: 12 }} />
                            <Bar dataKey="Expenditure" fill="#f87171" label={{ position: "top", fill: "#fff", fontSize: 12 }} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500 py-10">No data this month.</p>
                )
            }

        </div>
    );
};

export default BarChartBulanan;
