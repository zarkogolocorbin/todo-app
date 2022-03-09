import { useState, useEffect, useContext } from "react";
import ListItems from "./components/ListItems";
import moonIcon from "./assets/icon-moon.svg";
import sunIcon from "./assets/icon-sun.svg";
import { ModeContext } from "./context/ModeContext";

const getLocalStorage = () => {
  let list = localStorage.getItem("items");
  if (list) {
    return JSON.parse(localStorage.getItem("items"));
  } else {
    return [];
  }
};

function App() {
  const [items, setItems] = useState(getLocalStorage());
  const [item, setItem] = useState("");
  const [status, setStatus] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);
  const [completeItems, setCompleteItems] = useState([]);

  const { changeMode, currentMode } = useContext(ModeContext);
  const toggleMode = () => {
    changeMode(currentMode === "dark" ? "light" : "dark");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setItems([
      { id: new Date().getTime().toString(), isCompleted: false, text: item },
      ...items,
    ]);
    setItem("");
  };

  const deleteItem = (id) => {
    const newItemsArr = items.filter((item) => item.id !== id);
    setItems(newItemsArr);
  };

  const changeCompleted = (id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      })
    );
  };

  const deleteComplete = () => {
    const newArr = items.filter((item) => item.isCompleted !== true);
    setItems(newArr);
  };

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredItems(items.filter((item) => item.isCompleted === true));
        break;
      case "uncompleted":
        setFilteredItems(items.filter((item) => item.isCompleted === false));
        break;
      default:
        setFilteredItems(items);
        break;
    }
  };

  useEffect(() => {
    filterHandler();
    localStorage.setItem("items", JSON.stringify(items));
    setCompleteItems(items.filter((item) => item.isCompleted === false));
  }, [status, items]);

  console.log(currentMode);

  return (
    <>
      <header className={`header ${currentMode}`}>
        <div className="section-center">
          <div className="header-nav">
            <h1>todo</h1>
            <button onClick={toggleMode}>
              <img
                src={currentMode === "dark" ? sunIcon : moonIcon}
                alt="mon"
              />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={`form-input ${currentMode}`}>
              <div className="button">
                <div className={`button-inside ${currentMode}`}></div>
              </div>
              <input
                type="text"
                placeholder="Create a new todo..."
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className={`form-input-input ${currentMode}`}
              />
            </div>
          </form>
        </div>
      </header>
      <main className={`main ${currentMode}`}>
        <ListItems
          items={items}
          deleteItem={deleteItem}
          changeCompleted={changeCompleted}
          deleteComplete={deleteComplete}
          setStatus={setStatus}
          filteredItems={filteredItems}
          status={status}
          completeItems={completeItems}
          currentMode={currentMode}
        />
      </main>
    </>
  );
}

export default App;
