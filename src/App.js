import { useState, useRef } from "react";
import "./App.scss";

function App() {
  const [lists, setLists] = useState([
    {
      title: "Убраться дома, помыть кота, выгулить собаку, позвонить маме",
      id: 1,
    },
    { title: "Продолжить курс по React - 2 часа ", id: 2 },
    { title: "Вечером поработать над проектом - ", id: 3 },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsam dolor praesentium accusantium reiciendis eum cumque in accusamus..",
      id: 4,
    },
  ]);

  const [completed, setCompleted] = useState([
    { title: "1Lorem ipsum dolor sit amet.", id: 1 },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ipsam dolor praesentium accusantium reiciendis eum cumque in accusamus. Cumque rerum exercitationem ratione molestiae voluptate quasi magnam doloremque consequatur consequuntur eos.",
      id: 2,
    },
  ]);
  const [newList, setNewList] = useState("");
  const inputRef = useRef(null);

  const generateId = Math.floor(Math.random() * 100000);

  const addList = (e) => {
    if (e.key === "Enter") {
      setLists((prev) => [...prev, { title: e.target.value, id: generateId }]);
      inputRef.current.focus();
      setNewList("");
    }
  };

  /*   const handleDelete = (e) => {
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.remove();
  }; */

  const handleUpdate = (e) => {
    const complete = () => {
      setCompleted((prev) => [
        ...prev,
        {
          title: e.target.parentElement.previousElementSibling.textContent,
          id: generateId,
        },
      ]);
      e.target.parentElement.parentElement.remove();
    };
    complete();
  };

  const handleDelete = (id) => {
    setLists((prev) => {
      return prev.filter((list) => {
        return list.id !== id;
      });
    });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Ежедневник</h1>

        <div className="wrapper">
          <div className="todo">
            <div className="todo__header">Текущие дела: </div>
            <ul className="todo__lists">
              {!lists && <div>No lists...</div>}
              {lists &&
                lists.map((list) => {
                  return (
                    <div class="list-container" key={list.id}>
                      <li className="todo__list">{list.title} </li>
                      <div className="btns">
                        <button className="btn btn--1" onClick={handleUpdate}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="white"
                            className="w-6 h-6"
                            height="18"
                            width="18"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </button>
                        <button
                          className="btn btn--2"
                          onClick={() => handleDelete(list.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="white"
                            className="w-6 h-6"
                            height="17"
                            width="17"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </ul>
            <div className="input-container">
              <input
                onChange={(e) => setNewList(e.target.value)}
                onKeyDown={addList}
                value={newList}
                type="text"
                placeholder="Добавить дела"
                ref={inputRef}
              />
            </div>
          </div>
          <div className="completed">
            <div className="completed__header">Завершенные</div>
            <ul className="completed__lists">
              {completed &&
                completed.map((item) => {
                  return (
                    <div className="completed-container" key={item.id}>
                      <li className="completed__list">{item.title}</li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                        stroke="#32e275"
                        className="w-6 h-6"
                        height="12"
                        width="12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
