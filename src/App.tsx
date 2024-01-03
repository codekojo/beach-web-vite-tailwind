import { useState } from "react";
import "./App.css";

const todoData = [
  {
    id: 1,
    name: "Passport",
    qty: 2,
    checked: false,
  },
  {
    id: 2,
    name: "Socks",
    qty: 12,
    checked: false,
  },
  {
    id: 3,
    name: "Toothbrush",
    qty: 1,
    checked: false,
  },
  {
    id: 4,
    name: "Boarding Pass",
    qty: 2,
    checked: false,
  },
];
function App() {
  const to100 = [...new Array(20)];
  const [dataArray, setDataArray] = useState(todoData);
  const [text, setText] = useState("");
  const [qtyValue, setQtyValue] = useState(1);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleAdd() {
    const newTodoArray = [...dataArray];
    const obj = {
      id: newTodoArray.length + 1,
      name: text,
      qty: qtyValue,
      checked: false,
    };

    newTodoArray.push(obj);

    setText("");
    setQtyValue(1);
    setDataArray(newTodoArray);
  }

  function handleQtyChange(e) {
    setQtyValue(e.target.value);
  }

  //handleListChecked
  function handleListChecked(id) {
    setDataArray((prevValue) =>
      prevValue.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleRemoveList(id) {
    setDataArray((prevValue) => prevValue.filter((item) => item.id !== id));
  }

  return (
    <section className="h-full w-full">
      <div className="text-center h-full grid grid-cols-1 grid-rows-[150px_100px_1fr]">
        <header className="bg-[#f19822] text-5xl p-3 md:text-8xl md:p-4 uppercase tracking-widest">
          <h2>Far Away</h2>
        </header>

        <div className="flex flex-wrap justify-center items-center gap-2 bg-[#e06c1c] py-4">
          <h4>What do you need for your trip?</h4>

          <select
            name="days-select"
            className="focus:outline-none  focus:ring-1 border rounded-full px-2 py-1"
            value={qtyValue}
            onChange={handleQtyChange}
            key={qtyValue}
          >
            {to100.map((index, i) => {
              return (
                <option
                  key={index}
                  value={i + 1}
                  className="focus:outline-none"
                >
                  {i + 1}
                </option>
              );
            })}
          </select>

          <input
            type="text"
            placeholder="item..."
            className="focus:outline-none focus:ring border rounded-full p-1"
            value={text}
            onChange={(e) => handleChange(e)}
          />

          <button
            onClick={handleAdd}
            className="bg-[#68c2a3] w-20 px-2 py-2 rounded-full uppercase"
          >
            Add
          </button>
        </div>

        <div className="bg-[#4d3524] grid w-full">
          <div className="max-w-4xl w-full mx-auto grid sm:grid-cols-2 md:grid-cols-4 auto-rows-min gap-2 p-3">
            {dataArray.map((data) => {
              return (
                <Details
                  data={data}
                  handleChange={handleListChecked}
                  handleRemove={handleRemoveList}
                />
              );
            })}
          </div>
          <div className="mt-auto">
            <div>
              <select name="" id="">
                <option value="">SORT BY INPUT</option>
                <option value="">SORT BY INPUT</option>
                <option value="">SORT BY INPUT</option>
              </select>
            </div>
            <div>CLEAR LIST</div>
          </div>
        </div>

        <div className="p-5">helloe</div>
      </div>
    </section>
  );
}

export default App;

const Details = ({
  data: { id, name, qty, checked },
  handleChange,
  handleRemove,
}) => {
  return (
    <div className="flex items-center justify-center" key={id}>
      <div
        className={`flex-1 space-x-2 items-center ${checked && `line-through`}`}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onClick={() => handleChange(id)}
        />
        <label htmlFor={id}>{`${qty} ${name}`}</label>
      </div>
      <button className="text-red-500" onClick={() => handleRemove(id)}>
        &#x2715;
      </button>
    </div>
  );
};
