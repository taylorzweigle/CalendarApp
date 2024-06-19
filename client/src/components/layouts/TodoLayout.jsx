//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useTodosContext } from "../../hooks/useTodosContext";

import { getTodos, updateTodo } from "../../api/todos";

import EmptyState from "../../core/emptyState/EmptyState";
import Tab from "../../core/tabs/Tab";

import TodoCard from "../../components/cards/TodoCard";

import { calendars } from "../../utility/calendars";
import { sortTodos } from "../../utility/utility";

const TodoLayout = ({ data }) => {
  const navigate = useNavigate();

  const { user: authUser } = useAuthContext();
  const { dispatch } = useTodosContext();

  const [choresTodos, setChoresTodos] = useState([]);
  const [shoppingTodos, setShoppingTodos] = useState([]);

  const [selected, setSelected] = useState("Chores");

  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (data) {
      setChoresTodos(sortTodos(data.filter((todo) => todo.type === "Chores")));
      setShoppingTodos(sortTodos(data.filter((todo) => todo.type === "Shopping")));
    }
  }, [data]);

  const handleCheck = async (todo) => {
    setLoading(todo._id);

    const json = await updateTodo(todo._id, { ...todo, checked: !todo.checked }, authUser.token);

    if (json.json) {
      const todos = await getTodos(authUser.token);

      if (todos.json) {
        dispatch({ type: Actions.GET_TODOS, payload: todos.json });

        setLoading("");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/todo/${id}`);
  };

  const showBadge = (time) => new Date().getTime() - new Date(time).getTime() < 43200000;

  //calc(100vh-64px-80px-188px-32px-48px)

  return (
    <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-0 h-[calc(100vh-412px)] md:h-[calc(100vh-168px)]">
      <div className="flex flex-row items-center">
        <Tab value="Chores" selected={selected === "Chores"} onClick={() => setSelected("Chores")} />
        <Tab value="Shopping" selected={selected === "Shopping"} onClick={(e) => setSelected("Shopping")} />
      </div>
      <div className={selected === "Chores" ? "flex flex-col gap-4" : "hidden"}>
        {choresTodos.length > 0 ? (
          choresTodos.map((todo) => (
            <TodoCard
              key={todo._id}
              todo={todo.todo}
              color={calendars.find((calendar) => calendar.user === todo.user).color}
              dueDate={todo.date}
              notes={todo.notes}
              checked={todo.checked}
              loading={loading === todo._id}
              badge={showBadge(todo.creationTime)}
              onClick={() => handleEdit(todo._id)}
              onCheck={() => handleCheck(todo)}
            />
          ))
        ) : (
          <div className="pt-8">
            <EmptyState type="Todo" />
          </div>
        )}
      </div>
      <div className={selected === "Shopping" ? "flex flex-col gap-4" : "hidden"}>
        {shoppingTodos.length > 0 ? (
          shoppingTodos.map((todo) => (
            <TodoCard
              key={todo._id}
              todo={todo.todo}
              color={calendars.find((calendar) => calendar.user === todo.user).color}
              dueDate={todo.date}
              notes={todo.notes}
              checked={todo.checked}
              loading={loading === todo._id}
              badge={showBadge(todo.creationTime)}
              onClick={() => handleEdit(todo._id)}
              onCheck={() => handleCheck(todo)}
            />
          ))
        ) : (
          <div className="pt-8">
            <EmptyState type="Todo" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoLayout;
