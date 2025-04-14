import SectionTitle from "./section-title"

export default function ExpenseSummary() {
  // Datos de ejemplo - en una aplicación real, estos vendrían de una API
  const monthlyExpenses = [
    { month: "Ene", amount: 245.3 },
    { month: "Feb", amount: 230.15 },
    { month: "Mar", amount: 260.75 },
    { month: "Abr", amount: 210.4 },
    { month: "May", amount: 275.2 },
    { month: "Jun", amount: 240.9 },
  ]

  const maxAmount = Math.max(...monthlyExpenses.map((expense) => expense.amount))

  return (
    <section className="bg-white rounded-lg border border-gray-200 p-4">
      <SectionTitle title="Resumen de gastos" subtitle="Evolución de tus compras en los últimos 6 meses" icon="chart" />

      <div className="mt-4">
        <div className="flex items-end justify-between h-40 mb-2">
          {monthlyExpenses.map((expense, index) => (
            <div key={index} className="flex flex-col items-center w-1/6">
              <div className="text-xs text-gray-500 mb-1">{expense.amount.toFixed(0)}€</div>
              <div
                className="w-4/5 bg-green-500 rounded-t"
                style={{
                  height: `${(expense.amount / maxAmount) * 100}%`,
                  minHeight: "10%",
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          {monthlyExpenses.map((expense, index) => (
            <div key={index} className="text-xs text-center w-1/6">
              {expense.month}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Gasto medio mensual:</p>
            <p className="text-sm text-gray-600">
              {(monthlyExpenses.reduce((acc, curr) => acc + curr.amount, 0) / monthlyExpenses.length).toFixed(2)}€
            </p>
          </div>

          <button className="text-sm text-green-600 font-medium">Ver detalle</button>
        </div>
      </div>
    </section>
  )
}
