//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useTodosContext } from "../hooks/useTodosContext";

import { getTodos, deleteTodo } from "../api/todos";

import Button from "../core/button/Button";
import Divider from "../core/divider/Divider";
import Tab from "../core/tabs/Tab";

import SideNav from "../components/sideNav/SideNav";

import TodoCard from "../components/cards/TodoCard";

import HeaderLayout from "../components/layouts/HeaderLayout";
import TodosLayout from "../components/layouts/TodosLayout";

const TodosPage = () => {
  const { user: authUser } = useAuthContext();
  const { todos, dispatch } = useTodosContext();

  const [selected, setSelected] = useState("Chores");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos(authUser.token);

      dispatch({ type: Actions.GET_TODOS, payload: todos.json.filter((todo) => todo.creationUser === authUser.username) });
    };

    if (authUser) {
      fetchTodos();
    }
  }, [dispatch, authUser]);

  const handleDelete = async (id) => {
    setLoading(true);

    const todo = await deleteTodo(id, authUser.token);

    if (todo.json) {
      dispatch({ type: Actions.DELETE_TODO, payload: todo.json });

      setLoading(false);
    }
  };

  const showBadge = (time) => new Date().getTime() - new Date(time).getTime() < 86400000;

  return (
    <div className="flex flex-col md:flex-row">
      <SideNav selected="Todos" />
      <div className="grid grid-cols-12 m-auto w-full bg-white dark:bg-slate-800 border-t-0 border-r border-b border-l md:border-t md:border-r md:border-b md:border-l-0 border-slate-300 dark:border-slate-600 rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg md:rounded-tl-none md:rounded-tr-lg md:rounded-bl-lg md:rounded-br-lg shadow-md min-h-screen md:min-h-72">
        <div className="col-span-12 sm:col-span-12 md:col-span-3 md:border-r border-slate-300 dark:border-slate-600">
          <div className="grid grid-cols-12 m-auto w-full">
            <div className="col-span-12">
              <HeaderLayout
                editUser={authUser.username === "calendarapp_edit" || authUser.username === "calendarapp_testing"}
                action={
                  <Link to="/todo">
                    <Button variant="default" prefix={<AddIcon />} onClick={() => {}}>
                      <span className="inline-flex">Add&nbsp;</span>
                      <span className="inline-flex sm:inline-flex md:hidden lg:inline-flex">Todo</span>
                    </Button>
                  </Link>
                }
              />
              <Divider />
            </div>
            <div className="col-span-12">
              <TodosLayout editUser={authUser.username === "calendarapp_edit" || authUser.username === "calendarapp_testing"} />
              <Divider />
            </div>
            <div className="hidden md:block col-span-12 h-48">
              <Divider />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-9 flex flex-col justify-start gap-8 p-4 md:p-8">
          <div className="flex flex-row items-center">
            <Tab value="Chores" selected={selected === "Chores"} onClick={() => setSelected("Chores")} />
            <Tab value="Shopping" selected={selected === "Shopping"} onClick={(e) => setSelected("Shopping")} />
          </div>
          <div className="flex flex-col gap-2 h-128">
            {todos &&
              todos
                .filter((todo) => todo.type === selected)
                .map((todo) => (
                  <TodoCard
                    key={todo._id}
                    todo={todo.todo}
                    tag={todo.tag}
                    badge={() => showBadge(todo.creationTime)}
                    loading={loading}
                    onDelete={() => handleDelete(todo._id)}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
