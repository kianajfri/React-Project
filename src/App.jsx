import { useState } from "react";
import TransactionTable from "./components/TransactionTable";
import Modal from "./components/Modal";
import AddTransactionForm from "./components/AddTransactionForm";
import "./styles.css";

const PAGE_TITLE = "تراکنش‌ها";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransaction = ({ date, amount, type, description }) => {
    setTransactions((prev) => {
      const nextId = prev.reduce((maxId, t) => Math.max(maxId, t.id), 0) + 1;
      return [
        ...prev,
        {
          id: nextId,
          title: description,
          amount,
          type,
          date,
        },
      ];
    });

    setIsModalOpen(false);
  };

  return (
    <div className="page">
      <div className="card" data-modal-open={isModalOpen}>
        <header className="cardHeader">
          <h1 className="pageTitle">{PAGE_TITLE}</h1>
          <button className="button addButton" type="button" onClick={() => setIsModalOpen(true)}>
            <span className="addButtonIcon" aria-hidden="true">
              +
            </span>
            افزودن تراکنش
          </button>
        </header>

        {isModalOpen && (
          <Modal title="افزودن تراکنش" onClose={() => setIsModalOpen(false)}>
            <AddTransactionForm
              onAddTransaction={handleAddTransaction}
              onCancel={() => setIsModalOpen(false)}
            />
          </Modal>
        )}

        <TransactionTable
          transactions={transactions}
          onDeleteTransaction={(id) =>
            setTransactions((prev) => prev.filter((t) => t.id !== id))
          }
        />
      </div>
    </div>
  );
}
