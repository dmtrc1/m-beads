import { AppDispatch, RootState } from "@/state/store";
import {
  NewTodo,
  Todo,
  addTodoAsync,
  deleteTodoAsync,
  editTodoAsync,
} from "@/state/todoList/todoListSlice";
import { useSelector, useDispatch } from "react-redux";

export default function useTodos() {
  const { todos } = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch<AppDispatch>();

  function getTodoById({ id }: { id: number }): Todo | undefined {
    return todos.find((todo) => todo.id === id);
  }

  function addTodo(todo: NewTodo) {
    dispatch(addTodoAsync(todo));
  }

  type UpdateTodoParams<T> = {
    id: number;
    field: keyof Todo;
    value: T;
  };
  function updateTodo<T>({ id, field, value }: UpdateTodoParams<T>) {
    const currentTodo = getTodoById({ id });
    if (!currentTodo) {
      console.error("The todo with such id is not found!");
      return;
    }
    const updatedTodo = {
      ...currentTodo,
      [field]: value,
    };
    dispatch(editTodoAsync({ id, updatedTodo }));
  }

  function deleteTodo({ id }: { id: number }) {
    dispatch(deleteTodoAsync({ id } as { id: number }));
  }

  return { todos, getTodoById, addTodo, updateTodo, deleteTodo };
}
