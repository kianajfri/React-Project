const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

const LABELS = {
  date: "تاریخ",
  income: "ورودی (تومان)",
  expense: "خروجی (تومان)",
  title: "عنوان",
  currency: "تومان",
  empty: "شما هنوز تراکنشی وارد نکرده‌اید",
  delete: "حذف",
};

const toPersianDigits = (value) =>
  String(value).replace(/\d/g, (d) => persianDigits[Number(d)] ?? d);

const formatAmount = (value) => new Intl.NumberFormat("fa-IR").format(Math.abs(value));

function TrashIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="4">
        <path strokeLinejoin="round" d="m15 12l1.2-7h15.6l1.2 7" />
        <path strokeLinecap="round" d="M6 12h36" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m37 12l-2 31H13l-2-31z"
          clipRule="evenodd"
        />
        <path strokeLinecap="round" d="M19 35h10" />
      </g>
    </svg>
  );
}

function EmptyState() {
  return (
    <div className="emptyState">
      <div className="emptyIcon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="currentColor">
            <path d="M12 6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1m0 10a1 1 0 1 0 0 2a1 1 0 0 0 0-2" />
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M4 12a8 8 0 1 0 16 0a8 8 0 0 0-16 0"
              clipRule="evenodd"
            />
          </g>
        </svg>
      </div>
      <div className="emptyText">{LABELS.empty}</div>
    </div>
  );
}

export default function TransactionTable({ transactions, onDeleteTransaction }) {
  if (transactions.length === 0) return <EmptyState />;

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
              <th className="colActions" aria-label={LABELS.delete} />
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => {
              const isIncome = t.type === "income";
              const income = isIncome ? `${formatAmount(t.amount)}+` : "";
              const expense = !isIncome ? `${formatAmount(t.amount)}-` : "";

              return (
                <tr key={t.id}>
                  <td className="colDate">{toPersianDigits(t.date)}</td>
                  <td className={`amount ${isIncome ? "income" : ""}`}>{toPersianDigits(income)}</td>
                  <td className={`amount ${!isIncome ? "expense" : ""}`}>
                    {toPersianDigits(expense)}
                  </td>
                  <td className="colTitle">{t.title}</td>
                  <td className="colActions">
                    <button
                      className="iconButton"
                      type="button"
                      aria-label={LABELS.delete}
                      onClick={() => onDeleteTransaction?.(t.id)}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mobileList">
        {transactions.map((t) => {
          const isIncome = t.type === "income";
          const amountValue = `${isIncome ? "+" : "-"}${formatAmount(t.amount)} ${LABELS.currency}`;

          return (
            <div key={t.id} className="mobileRow">
              <div className="mobileLeft">
                <div className={`mobileAmount ${isIncome ? "income" : "expense"}`}>
                  {toPersianDigits(amountValue)}
                </div>
                <button
                  className="iconButton"
                  type="button"
                  aria-label={LABELS.delete}
                  onClick={() => onDeleteTransaction?.(t.id)}
                >
                  <TrashIcon />
                </button>
              </div>
              <div className="mobileRight">
                <div className="mobileDate">{toPersianDigits(t.date)}</div>
                <div className="mobileTitle">{t.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
