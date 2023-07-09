import "../styles/ExpenseList.css";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export default function ExpenseList({
  expenses,
  handleDelete,
  deleteAll,
  handleEdit,
}) {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              expense={expense}
              key={expense.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      <button className="btn" onClick={deleteAll}>
        목록 지우기 <MdDelete className="btn-icon" />
      </button>
    </>
  );
}
