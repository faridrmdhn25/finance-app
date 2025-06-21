import { useEffect, useState } from "react"
import { format } from "date-fns"
import { useNavigate } from "react-router"

const History = () => {
    const navigate = useNavigate()
    const [dataTransaction, setDataTransaction] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            navigate("/login", { replace: true });
            return
        }
        const data = JSON.parse(localStorage.getItem(`transaction-${currentUser.id}`)) || []
        setDataTransaction(data)
    }, [])

    const filteredData = dataTransaction.filter((items) => {
        const date = new Date(items.date)
        const start = startDate ? new Date(startDate) : null
        const end = endDate ? new Date(endDate) : null
        const resultDate = (!start || date >= start) &&(!end || date <= end)
        const resultCategory = !selectedCategory || items.category === selectedCategory
        return resultDate && resultCategory                   
    })

    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold mb-4">History</h1>
            <div className="bg-[#112d3b] p-6 rounded-xl shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-300 mb-1">From Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="px-4 py-2 rounded-md bg-[#0b1f2a] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-300 mb-1">Until Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="px-4 py-2 rounded-md bg-[#0b1f2a] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-300 mb-1">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 rounded-md bg-[#0b1f2a] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="">All Categories</option>
                            <option value="Food">🍔 Food</option>
                            <option value="Transportation">🚌 Transportation</option>
                            <option value="Bonus">🎁 Bonus</option>
                            <option value="Other Income">💼 Other Income</option>
                            <option value="Bills">🧾 Bills</option>
                            <option value="Health">🏥 Health</option>
                            <option value="Freelance">🖥️ Freelance</option>
                            <option value="Wages">💸 Wages</option>
                            <option value="Entertainment">🎮 Entertainment</option>
                        </select>
                    </div>
                </div>
            </div>
            <ul className="space-y-4">
                {filteredData.length === 0 && (
                    <p className="text-gray-400">No transactions found</p>
                )}kenapa tidak number saja kan bisa
                {filteredData.reverse().map((items, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center bg-[#0c1e2a] p-4 rounded-lg border border-white/10"
                    >
                        <div>
                            <p className="text-sm text-gray-400">📅 {format(new Date(items.date), "dd MMM yyyy")}</p>
                            <p className="text-lg font-semibold">
                                {items.category} - {items.description || "No description"}
                            </p>
                        </div>
                        <div
                            className={`text-lg font-bold ${items.type === "income" ? "text-green-400" : "text-red-400"}`}
                        >
                            {items.type === "income" ? "+ " : "- "}Rp {parseInt(items.amount).toLocaleString("id-ID")}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default History
