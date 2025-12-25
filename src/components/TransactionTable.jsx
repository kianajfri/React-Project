export default function TransactionTable({ transactions }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{t.title}</td>
            <td>{t.type}</td>
            <td>{t.amount}</td>
            <td>{t.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
