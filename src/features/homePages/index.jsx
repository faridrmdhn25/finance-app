import { useEffect, useState } from "react"
import PieChartKategori from "../../component/pieChart"
import { format } from "date-fns"
import { useNavigate } from "react-router"

const Home = () => {
  const navigate = useNavigate()
  const [dataTransaction, setDataTransaction] = useState([])
  const [totals, setTotals] = useState({ income: 0, expenditure: 0 })
  const [currentBelance, setCurrentBelance] = useState(0)

  const incomeData = dataTransaction.filter(items => items.type === "income")
  const expenditureData = dataTransaction.filter(items => items.type === "expenditure")

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
    let totalIncome = 0
    let totalExpenditure = 0

    for (let i = 0; i < dataTransaction.length; i++) {
      const item = dataTransaction[i]
      if (item.type === "income") totalIncome += parseInt(item.amount)
      if (item.type === "expenditure") totalExpenditure += parseInt(item.amount)
    }

    const belance = totalIncome - totalExpenditure

    setTotals({
      income: totalIncome,
      expenditure: totalExpenditure
    })
    setCurrentBelance(belance)
  }, [dataTransaction])

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

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Home</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-700 bg-opacity-30 p-4 rounded-xl shadow">💰 Income: Rp {totals.income.toLocaleString('id-ID')}</div>
        <div className="bg-red-700 bg-opacity-30 p-4 rounded-xl shadow">💸 Expenditure: Rp {totals.expenditure.toLocaleString('id-ID')}</div>
        <div className="bg-blue-700 bg-opacity-30 p-4 rounded-xl shadow">🧾 Belance: Rp {currentBelance.toLocaleString('id-ID')}</div>
      </div>
      <div className="bg-[#112d3b] p-4 rounded-xl shadow text-white">
        <h2 className="text-lg font-semibold mb-2">New Transaction</h2>
        <ul className="divide-y divide-gray-700">
          {
            [...dataTransaction].reverse().slice(0, 5).map((item, index) => (
              <li key={index} className="py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.category}</p>
                    <p className="text-sm text-gray-400">📅 {format(new Date(item.date), "dd MMM yyyy")}</p>
                  </div>
                  <div className={item.type === "income" ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                    {item.type === "income" ? "+ " : "- "}Rp {parseInt(item.amount).toLocaleString('id-ID')}
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <PieChartKategori data={groupByCategory(incomeData)} type="income" />
      <PieChartKategori data={groupByCategory(expenditureData)} type="expenditure" />
    </div>
  )
}

export default Home
