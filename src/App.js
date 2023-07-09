import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);

  const [alert, setAlert] = useState({
    show: false,
    text: "",
  });

  const [id, setId] = useState("");

  const [edit, setEdit] = useState(false);

  const handleDelete = (id) => {
    setExpenses((expenses) => {
      return expenses.filter((expense) => expense.id !== id);
    });
    handleAlert({ type: "danger", text: "아이템이 삭제되었습니다." });
  };

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map((item) => {
          return item.id === id
            ? {
                ...item,
                charge,
                amount,
              }
            : item;
        });
        setExpenses(newExpenses);
        setEdit(false);
        setCharge("");
        setAmount(0);
        handleAlert({ type: "success", text: "아이템이 수정되었습니다." });
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount };
        const newExpenses = [...expenses, newExpense];
        // 불변성을 지켜주기 위해서 새로운 expenses 생성
        setExpenses(newExpenses);
        setCharge("");
        setAmount(0);
        handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
      }
    } else {
      handleAlert({
        type: "danger",
        text: "charge는 빈 값일 수 없으며, amount는 0보다 커야 합니다.",
      });
    }
  };

  const handleAlert = ({ type, text }) => {
    setAlert(() => {
      return {
        show: true,
        type,
        text,
      };
    });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  };

  const deleteAll = () => {
    setExpenses([]);
  };

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: "1rem",
        }}
      >
        <ExpenseForm
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          charge={charge}
          amount={amount}
          edit={edit}
        />
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: "1rem",
        }}
      >
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          deleteAll={deleteAll}
          handleEdit={handleEdit}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "2rem",
          }}
        >
          {`총 지출: `}
          <span>{expenses.reduce((acc, cur) => acc + cur.amount, 0)} 원</span>
        </p>
      </div>
    </main>
  );
}
