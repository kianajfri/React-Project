import TransactionTable from "./components/TransactionTable";
import { mockTransactions } from "./data/mockTransactions";
import "./styles.css";

const PAGE_TITLE = "تراکنش‌ها";

export default function App() {
  return (
    <div className="page">
      <div className="card">
        <header className="cardHeader">
          <h1 className="pageTitle">{PAGE_TITLE}</h1>
        </header>

        <TransactionTable items={mockTransactions} />
      </div>
    </div>
  );
}
