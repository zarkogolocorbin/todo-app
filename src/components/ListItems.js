import React from "react";
import iconCross from "../assets/icon-cross.svg";
import iconCheck from "../assets/icon-check.svg";

import "./ListItems.css";

const ListItems = ({
  items,
  deleteItem,
  changeCompleted,
  deleteComplete,
  setStatus,
  filteredItems,
  status,
  completeItems,
  currentMode,
}) => {
  return (
    <section className="list">
      <div className="section-center">
        <ul className={`items ${currentMode}`}>
          {filteredItems.map((item) => (
            <li className="item" key={item.id}>
              <div className="button" onClick={() => changeCompleted(item.id)}>
                <div
                  className={
                    item.isCompleted
                      ? `button-inside ${currentMode} button-checked`
                      : `button-inside ${currentMode}`
                  }
                >
                  {item.isCompleted && <img src={iconCheck} alt="icon-check" />}
                </div>
              </div>
              <p
                className={
                  item.isCompleted
                    ? `completed ${currentMode}`
                    : `not-completed ${currentMode}`
                }
                onClick={() => changeCompleted(item.id)}
              >
                {item.text}
              </p>
              <button className="btn-cross" onClick={() => deleteItem(item.id)}>
                <img src={iconCross} alt="cross" width="16px" height="16px" />
              </button>
            </li>
          ))}
        </ul>

        <div className={`filter-box ${currentMode}`}>
          <div>
            <p>{completeItems.length} items left</p>
          </div>
          <div className="filter">
            <span
              className={status === "all" ? "all" : ""}
              onClick={() => setStatus("all")}
            >
              All
            </span>
            <span
              className={status === "uncompleted" ? "uncompleted" : ""}
              onClick={() => setStatus("uncompleted")}
            >
              Active
            </span>
            <span
              className={status === "completed" ? "complete" : ""}
              onClick={() => setStatus("completed")}
            >
              Completed
            </span>
          </div>
          <button onClick={() => deleteComplete()}>Clear Completed</button>
        </div>
      </div>
    </section>
  );
};

export default ListItems;
