const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

const LABELS = {
  date: "تاریخ",
  income: "درآمد (تومان)",
  expense: "هزینه (تومان)",
  title: "شرح",
  currency: "تومان",
};

const toPersianDigits = (value) =>
  String(value).replace(/\d/g, (d) => persianDigits[Number(d)] || d);

const formatAmount = (value) =>
  new Intl.NumberFormat("fa-IR").format(Math.abs(value));

export default function TransactionTable({ items }) {
  return (
    <>
      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th className="colDate">{LABELS.date}</th>
              <th className="colAmount">{LABELS.income}</th>
              <th className="colAmount">{LABELS.expense}</th>
              <th className="colTitle">{LABELS.title}</th>
            </tr>
          </thead>

          <tbody>
            {items.map((t) => {
              const isIncome = t.type === "income";
              const income = isIncome ? `+${formatAmount(t.amount)}` : "";
              const expense = !isIncome ? `-${formatAmount(t.amount)}` : "";

              return (
                <tr key={t.id}>
                  <td className="colDate">{toPersianDigits(t.date)}</td>
                  <td className={`amount ${isIncome ? "income" : ""}`}>{income}</td>
                  <td className={`amount ${!isIncome ? "expense" : ""}`}>{expense}</td>
                  <td className="colTitle">{t.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mobileList">
        {items.map((t) => {
          const isIncome = t.type === "income";
          const amountValue = `${isIncome ? "+" : "-"}${formatAmount(t.amount)} ${LABELS.currency}`;

          return (
            <div
              key={t.id}
              className={`mobileRow ${isIncome ? "incomeRow" : "expenseRow"}`}
            >
              <div className="mobileRowTop">
                <span className={`mobileAmount ${isIncome ? "income" : "expense"}`}>
                  {toPersianDigits(amountValue)}
                </span>
                <span className="mobileDate">{toPersianDigits(t.date)}</span>
              </div>
              <div className="mobileTitle">{t.title}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
