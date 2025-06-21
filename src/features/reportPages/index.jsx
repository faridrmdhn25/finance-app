import { useEffect, useState } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import PieChartKategori from "../../component/pieChart"
import BarChartBulanan from "../../component/barChart"
import { useNavigate } from "react-router"

const getCurrentMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
}

const Report = () => {
    const navigate = useNavigate()
    const [dataTransaction, setDataTransaction] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth())
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        if (!currentUser) {
            navigate("/login", { replace: true })
            return
        }
        const data = JSON.parse(localStorage.getItem(`transaction-${currentUser.id}`)) || []
        setDataTransaction(data)
    }, [])

    useEffect(() => {
        if (selectedMonth) {
            const result = dataTransaction.filter(items => {
                const date = new Date(items.date)
                const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
                return month === selectedMonth
            })
            setFilteredData(result)
        } else {
            setFilteredData([])
        }
    }, [selectedMonth, dataTransaction])

    const groupByCategory = (data) => {
        const result = {}
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            if (!result[item.category]) {
                result[item.category] = parseInt(item.amount)
            } else {
                result[item.category] += parseInt(item.amount)
            }
        }
        return Object.keys(result).map((key) => ({
            name: key,
            value: result[key]
        }))
    }

    const getMonthlyTotals = (data) => {
        const grouped = {}
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            const month = new Date(item.date).toLocaleString('id-ID', { month: 'short', year: 'numeric' })
            if (!grouped[month]) {
                grouped[month] = { Income: 0, Expenditure: 0 }
            }
            if (item.type === "income") grouped[month].Income += parseInt(item.amount)
            if (item.type === "expenditure") grouped[month].Expenditure += parseInt(item.amount)
        }

        return Object.entries(grouped).map(([name, value]) => ({
            name,
            ...value
        }))
    }

    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold mb-6">Report</h1>
            <div className="bg-[#112d3b] p-4 md:p-6 rounded-xl shadow mb-6">
                <label className="block text-sm text-gray-300 mb-2">Select Month</label>
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(e.target.value)}
                    className="bg-[#0f1a24] text-white border border-gray-600 p-2 rounded w-full md:w-64"
                />
            </div>
            <div className="mb-6">
                <BarChartBulanan data={getMonthlyTotals(filteredData)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-4 rounded-xl shadow bg-[#0e2735]">
                    <h3 className="text-lg font-semibold mb-2">💰 Category Entry</h3>
                    {
                        filteredData.length > 0 ? (
                            <PieChartKategori
                                data={groupByCategory(filteredData.filter(item => item.type === "income"))}
                                type="income"
                            />
                        ) : (
                            <p className="text-center text-gray-500 py-10">No data this month.</p>
                        )
                    }
                </div>
                <div className="p-4 rounded-xl shadow bg-[#0e2735]">
                    <h3 className="text-lg font-semibold mb-2">🥧 Expenditure category</h3>
                    {
                        filteredData.length > 0 ? (
                            <PieChartKategori
                                data={groupByCategory(filteredData.filter(item => item.type === "expenditure"))}
                                type="expenditure"
                            />
                        ) : (
                            <p className="text-center text-gray-500 py-10">No data this month.</p>
                        )
                    }
                </div>
            </div>
            <div className="bg-[#112d3b] p-4 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">📋 This Month's Transaction Details</h3>
                <div className="overflow-x-auto">
                    <div className="max-h-[400px] overflow-y-auto">
                        <table className="w-full text-sm text-white">
                            <thead className="sticky top-0 bg-[#112d3b] z-10">
                                <tr className="text-gray-300 border-b border-gray-600 text-left">
                                    <th className="py-3 px-4 font-medium">Date</th>
                                    <th className="py-3 px-4 font-medium">Category</th>
                                    <th className="py-3 px-4 font-medium">Type</th>
                                    <th className="py-3 px-4 font-medium text-right">Amounth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((items, index) => (
                                    <tr key={index} className="border-b border-gray-700 hover:bg-[#1c3a4d] transition">
                                        <td className="py-3 px-4 text-gray-400 whitespace-nowrap">
                                            {format(items.date, "dd MMM yyyy", { locale: id })}
                                        </td>
                                        <td className="py-3 px-4">{items.category}</td>
                                        <td className={`py-3 px-4 ${items.type === "income" ? "text-green-400" : "text-red-400"}`}>
                                            {items.type}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            Rp {parseInt(items.amount).toLocaleString("id-ID")}
                                        </td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-gray-500">
                                            Tidak ada transaksi untuk bulan ini.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report
