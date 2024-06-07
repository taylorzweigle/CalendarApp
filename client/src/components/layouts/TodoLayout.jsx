//Taylor Zweigle, 2024
import React, { useState } from "react";
import { useNavigate } from "react-router";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useTodosContext } from "../../hooks/useTodosContext";

import { getTodos, updateTodo, deleteTodo } from "../../api/todos";

import Tab from "../../core/tabs/Tab";

import TodoCard from "../../components/cards/TodoCard";

import { calendars } from "../../utility/calendars";

const TodoLayout = ({ data }) => {
  const navigate = useNavigate();

  const { user: authUser } = useAuthContext();
  const { dispatch } = useTodosContext();

  const [selected, setSelected] = useState("Chores");
  const [loading, setLoading] = useState("");

  const handleClick = async (todo) => {
    const json = await updateTodo(todo._id, { ...todo, checked: !todo.checked }, authUser.token);

    if (json.json) {
      const todos = await getTodos(authUser.token);

      if (todos.json) {
        dispatch({ type: Actions.GET_TODOS, payload: todos.json });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/todo/${id}`);
  };

  const handleDelete = async (id) => {
    setLoading(id);

    const todo = await deleteTodo(id, authUser.token);

    if (todo.json) {
      dispatch({ type: Actions.DELETE_TODO, payload: todo.json });

      setLoading("");
    }
  };

  const showBadge = (time) => new Date().getTime() - new Date(time).getTime() < 86400000;

  return (
    <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-0">
      <div className="flex flex-row items-center">
        <Tab value="Chores" selected={selected === "Chores"} onClick={() => setSelected("Chores")} />
        <Tab value="Shopping" selected={selected === "Shopping"} onClick={(e) => setSelected("Shopping")} />
      </div>
      <div className="flex flex-col gap-2 md:gap-4 h-128">
        {data &&
          data
            .filter((todo) => todo.type === selected)
            .map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo.todo}
                color={calendars.find((calendar) => calendar.user === todo.user).color}
                dueDate={todo.date}
                checked={todo.checked}
                badge={showBadge(todo.creationTime)}
                loading={loading === todo._id}
                onClick={() => handleClick(todo)}
                onEdit={() => handleEdit(todo._id)}
                onDelete={() => handleDelete(todo._id)}
              />
            ))}
      </div>
    </div>
  );
};

export default TodoLayout;
