import { useState } from "react";

export default function AddTransactionForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !amount) return;

    onAdd({
      id: crypto.randomUUID(),
      title,
      amount: Number(amount),
      type: "expense",
      date: new Date().toISOString().slice(0, 10),
    });

    setTitle("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}
