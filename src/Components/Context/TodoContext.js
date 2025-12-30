import { createContext, useContext, useReducer } from "react";
import reducer from "../../Reducers/todosReducer";

const TodoContext = createContext([]);

export default function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, []);
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => {
  return useContext(TodoContext);
};
