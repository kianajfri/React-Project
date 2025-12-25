import { useMemo, useState } from "react";

const TYPE_OPTIONS = [
  { value: "income", label: "درآمد" },
  { value: "expense", label: "هزینه" },
];

const getTodayJalali = () => {
  const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(new Date());
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";

  return `${year}/${month}/${day}`;
};

const normalizeAmountInput = (value) => {
  const digitsOnly = String(value ?? "").replace(/[^\d]/g, "");
  if (digitsOnly === "") return "";
  return new Intl.NumberFormat("en-US").format(Number(digitsOnly));
};

function CalendarIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19 4h-2V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7h16Zm0-9H4V7a1 1 0 0 1 1-1h2v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h2a1 1 0 0 1 1 1Z"
      />
    </svg>
  );
}

export default function AddTransactionForm({ onAddTransaction, onCancel }) {
  const [dateText, setDateText] = useState(() => getTodayJalali());
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const datePlaceholder = useMemo(() => getTodayJalali(), []);

  const canSubmit = useMemo(
    () => dateText.trim() !== "" && String(amount).trim() !== "",
    [dateText, amount],
  );

  const validate = () => {
    const nextErrors = {};
    if (dateText.trim() === "") nextErrors.date = "تاریخ را وارد کنید.";
    if (String(amount).trim() === "") nextErrors.amount = "مبلغ را وارد کنید.";

    const amountNumber = Number(String(amount).replace(/,/g, ""));
    if (String(amount).trim() !== "" && Number.isNaN(amountNumber))
      nextErrors.amount = "مبلغ نامعتبر است.";

    return nextErrors;
  };

  const resetForm = () => {
    setDateText(getTodayJalali());
    setAmount("");
    setType("income");
    setDescription("");
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onAddTransaction({
      date: dateText.trim(),
      amount: Number(String(amount).replace(/,/g, "")),
      type,
      description: description.trim() || (type === "income" ? "درآمد" : "هزینه"),
    });

    resetForm();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="formGrid">
        <div className="formLabel">تاریخ</div>
        <div className="formControl">
          <div className="inputWithIcon">
            <span className="inputIcon" aria-hidden="true">
              <CalendarIcon />
            </span>
            <input
              className="input inputDate"
              type="text"
              value={dateText}
              onChange={(e) => setDateText(e.target.value)}
              placeholder={datePlaceholder}
              inputMode="numeric"
            />
          </div>
          {errors.date ? <div className="errorText">{errors.date}</div> : null}
        </div>

        <div className="formLabel">مبلغ (تومان)</div>
        <div className="formControl">
          <input
            className="input"
            value={amount}
            onChange={(e) => setAmount(normalizeAmountInput(e.target.value))}
            placeholder="1,000,000"
            inputMode="numeric"
          />
          {errors.amount ? <div className="errorText">{errors.amount}</div> : null}
        </div>

        <div className="formLabel">نوع تراکنش</div>
        <div className="formControl">
          <div className="radioRow" role="radiogroup" aria-label="نوع تراکنش">
            {TYPE_OPTIONS.map((opt) => (
              <label key={opt.value} className="radioOption">
                <input
                  type="radio"
                  name="type"
                  value={opt.value}
                  checked={type === opt.value}
                  onChange={() => setType(opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="formLabel">عنوان</div>
        <div className="formControl">
          <input
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="مثلاً: خرید سوپرمارکت"
          />
        </div>
      </div>

      <div className="formActions">
        <button
          className="button buttonSecondary"
          type="button"
          onClick={() => {
            resetForm();
            onCancel();
          }}
        >
          انصراف
        </button>
        <button className="button" type="submit" disabled={!canSubmit}>
          ثبت
        </button>
      </div>
    </form>
  );
}

