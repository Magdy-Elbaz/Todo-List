import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    // add todo

    case "added": {
      const updatedTodos = [
        ...currentTodos,
        {
          id: uuidv4(),
          title: action.payload.title,
          details: "",
          isCompleted: false,
        },
      ];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    // delete todo

    case "deleted": {
      const DeleteTodo = currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });

      localStorage.setItem("todos", JSON.stringify(DeleteTodo));
      return DeleteTodo;
    }

    // update todo

    case "updated": {
      const updateTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          t.title = action.payload.title;
          t.details = action.payload.details;
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updateTodos));
      return updateTodos;
    }

    case "get": {
      const todosStorage = JSON.parse(localStorage.getItem("todos")) ?? [];
      return todosStorage;
    }

    case "isCompleted": {
      const updateTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          t.isCompleted = !t.isCompleted;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updateTodos));
      return updateTodos;
    }

    default: {
      throw Error("unKnown" + action.type);
    }
  }
}
