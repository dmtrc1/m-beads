import { RootState } from "@/state/store";
import { numbersWithDecimalFormated } from "@/utilities";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useCalculateGneralInfo() {
  const { users } = useSelector((state: RootState) => state.users);
  const { todos } = useSelector((state: RootState) => state.todoList);

  const [usersNumber, setUsersNumber] = useState(0);
  const [tasksNumber, setTasksNumber] = useState(0);
  const [taskPerPerson, setTaskPerPerson] = useState("");
  const [totalTasksTime, setTotalTasksTime] = useState(0);

  useEffect(() => {
    setUsersNumber(users.length);
    setTasksNumber(todos.length);
  }, [users, todos]);

  useEffect(() => {
    setTaskPerPerson(numbersWithDecimalFormated(tasksNumber / usersNumber));
  }, [tasksNumber, usersNumber]);

  useEffect(() => {
    setTotalTasksTime(() => {
      const totalTime = todos.reduce((acc: number, { time }) => {
        return acc + time;
      }, 0);
      return totalTime;
    });
  }, [todos]);

  return {
    usersNumber,
    tasksNumber,
    taskPerPerson,
    totalTasksTime,
  };
}
