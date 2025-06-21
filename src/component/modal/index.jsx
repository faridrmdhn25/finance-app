import Swal from 'sweetalert2'

const Modal = ({ props }) => {
    const { dataTransaction, setHideTransaksi } = props

    const handleConfirm = () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        const oldTransaction = JSON.parse(localStorage.getItem(`transaction-${currentUser.id}`)) || []

        let totalIncome = 0
        let totalExpenditure = 0

        for (let i = 0; i < oldTransaction.length; i++) {
            if (oldTransaction[i].type === "income") {
                totalIncome += parseInt(oldTransaction[i].amount)
            } else if (oldTransaction[i].type === "expenditure") {
                totalExpenditure += parseInt(oldTransaction[i].amount)
            }
        }

        const currentBalance = totalIncome - totalExpenditure

        if (dataTransaction.type === "expenditure" && parseInt(dataTransaction.amount) > currentBalance) {
            Swal.fire({
                icon: 'error',
                title: 'Not Enough Money',
                text: 'Your balance is not enough for this expense!',
                confirmButtonColor: '#d33',
            })
            return
        }

        const newTransaction = [...oldTransaction,{ ...dataTransaction, date: new Date().toISOString() }]
        localStorage.setItem(`transaction-${currentUser.id}`, JSON.stringify(newTransaction))
        Swal.fire({
            title: 'succed!',
            text: 'Transaction saved successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Okay'
        })
        setHideTransaksi(false)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-[#102733] text-white p-6 md:p-8 rounded-2xl shadow-2xl w-[90%] max-w-md border border-white/10 animate-fade-in">
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">📋</div>
                    <h2 className="text-xl md:text-2xl font-bold">Transaction Confirmation</h2>
                    <p className="text-white/60 text-sm mt-1">Make sure the transaction data is correct before saving..</p>
                </div>
                <div className="bg-[#0b1f2a] p-4 rounded-xl border border-white/10 mb-6">
                    <p><span className="font-semibold">🔘 Type:</span> {dataTransaction.type}</p>
                    <p><span className="font-semibold">🏷️ Category:</span> {dataTransaction.category}</p>
                    <p><span className="font-semibold">📝 Description:</span> {dataTransaction.description || "-"}</p>
                    <p><span className="font-semibold">💰 Amount:</span> Rp {parseInt(dataTransaction.amount).toLocaleString('id-ID')}</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setHideTransaksi(false)}
                        className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-400 transition font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 transition font-semibold"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
