import { Formik, Form, Field, ErrorMessage } from "formik"
import { useEffect, useState } from "react"
import { transactionValidation } from "../../utils/transactionValidation"
import Modal from "../../component/modal"
import { useNavigate } from "react-router"

const Transaction = () => {
    const navigate = useNavigate()
    const [hideTransaksi, setHideTransaksi] = useState(false)
    const [dataTransaction, setDataTransaction] = useState({})
    const incomeCategory = ["Wages", "Bonus", "Freelance", "Other Income"]
    const expenditureCategory = ["Food", "Transportation", "Entertainment", "Health", "Bills"]

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        if (!currentUser) {
            navigate("/login", { replace: true })
            return
        }
    })

    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
            <div className="bg-[#112d3b] p-6 rounded-xl shadow text-white">
                <Formik
                    initialValues={{ type: "", category: "", description: "", amount: "" }}
                    validationSchema={transactionValidation}
                    onSubmit={(values) => {
                        setDataTransaction(values)
                        setHideTransaksi(true)
                    }}
                >
                    {({ values }) => (
                        <Form className="space-y">
                            <div className="mb-4">
                                <label className="block font-semibold mb-2">🔘 Type Transaction:</label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2">
                                        <Field type="radio" name="type" value="income" className="accent-green-400" />
                                        Income
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <Field type="radio" name="type" value="expenditure" className="accent-red-400" />
                                        expenditure
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block font-semibold mb-2">🏷️ Category:</label>
                                <Field
                                    as="select"
                                    name="category"
                                    disabled={!values.type}
                                    className={`w-full px-4 py-2 rounded-md bg-[#0b1f2a] text-white border border-white/20 ${!values.type ? "opacity-50 cursor-not-allowed" : "focus:outline-none focus:ring-2 focus:ring-cyan-400"}`}
                                >
                                    <option hidden value="">Select category</option>
                                    {
                                        (values.type === "income" ? incomeCategory : expenditureCategory).map((item, idx) => (
                                            <option key={idx} value={item}>{item}</option>
                                        ))
                                    }
                                </Field>
                                <ErrorMessage name="category" component="div" className="text-red-300 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label className="block font-semibold mb-2">📝 Description (opsional):</label>
                                <Field
                                    name="description"
                                    placeholder='Example: "Buy fried rice", "Salary for June"'
                                    className={`w-full px-4 py-2 rounded-md bg-[#0b1f2a] text-white border border-white/20 placeholder-white/40 ${!values.type ? "opacity-50 cursor-not-allowed" : "not-first-of-type:focus:outline-none focus:ring-2 focus:ring-cyan-400"} `}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block font-semibold mb-2">💰 Amount:</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-white/70">Rp</span>
                                    <Field
                                        name="amount"
                                        type="number"
                                        disabled={!values.type}
                                        placeholder="0"
                                        className={`flex-1 px-4 py-2 rounded-md bg-[#0b1f2a] text-white border border-white/20 placeholder-white/40 ${!values.type ? "opacity-50 cursor-not-allowed" : "focus:outline-none focus:ring-2 focus:ring-cyan-400"}`}
                                    />
                                </div>
                                <ErrorMessage name="amount" component="div" className="text-red-300 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                disabled={!values.type}
                                className={`w-full font-semibold py-3 rounded-lg transition shadow-lg mb-6 ${!values.type ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-400 text-white"}`}
                            >
                                Save Transaction
                            </button>
                            {hideTransaksi &&
                                <Modal props={{ dataTransaction, setHideTransaksi }} />
                            }
                        </Form>
                    )}
                </Formik>

            </div>
        </div >
    )
}

export default Transaction
