import { AppDispatch, RootState } from "@/state/store";
import {
  NewUser,
  User,
  addUserAsync,
  deleteUserAsync,
  editUserAsync,
} from "@/state/users/usersSlice";
import { useSelector, useDispatch } from "react-redux";

export default function useUsers() {
  const { users } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  function getUserById({ id }: { id: number }): User | undefined {
    return users.find((user) => user.id === id);
  }

  function addUser(user: NewUser) {
    dispatch(addUserAsync(user));
  }

  type UpdateUserParams<T> = {
    id: number;
    field: keyof User;
    value: T;
  };
  function updateUser<T>({ id, field, value }: UpdateUserParams<T>) {
    const currentUser = getUserById({ id });
    if (!currentUser) {
      console.error("The user with such id is not found!");
      return;
    }
    const updatedUser = {
      ...currentUser,
      [field]: value,
    };
    dispatch(editUserAsync({ id, updatedUser }));
  }

  function deleteUser({ id }: { id: number }) {
    dispatch(deleteUserAsync({ id } as { id: number }));
  }

  return { users, getUserById, addUser, updateUser, deleteUser };
}
