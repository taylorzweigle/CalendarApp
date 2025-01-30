//Taylor Zweigle, 2025
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import CachedIcon from "@mui/icons-material/Cached";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useCalendarsContext } from "../../hooks/useCalendarsContext";
import { useTodosContext } from "../../hooks/useTodosContext";

import { getTodos, getTodo, updateTodo, deleteTodo } from "../../api/todos";

import { getCalendarColor, isDeleteable, isRecentlyAdded } from "../../utility/utility";

import Button from "../../core/button/Button";
import Divider from "../../core/divider/Divider";
import EmptyState from "../../core/emptyState/EmptyState";
import Toast from "../../core/toast/Toast";
import Typography from "../../core/typography/Typography";

import TodoCard from "../../components/cards/TodoCard";

const TodoLayout = ({ data }) => {
  const navigate = useNavigate();

  const { user: authUser } = useAuthContext();
  const { calendars } = useCalendarsContext();
  const { dispatchTodos } = useTodosContext();

  const [todos, setTodos] = useState([]);
  const [dueTodos, setDueTodos] = useState([]);
  const [deletedTodoCount, setDeletedTodoCount] = useState(0);
  const [updatedTodoCount, setUpdatedTodoCount] = useState(0);

  const [loading, setLoading] = useState("");
  const [refreshLoading, setRefreshLoading] = useState(false);

  useEffect(() => {
    if (data) {
      data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

      setTodos(data.filter((todo) => new Date() < new Date(todo.dueDate)));
      setDueTodos(data.filter((todo) => new Date() >= new Date(todo.dueDate)));
    }
  }, [data]);

  const handleRefreshClick = async () => {
    let deleteCount = 0;
    let updatedCount = 0;

    setRefreshLoading(true);

    setTimeout(() => {
      setRefreshLoading(false);
    }, 1000);

    const deleteCheckedTodo = async (id) => {
      const deletedTodo = await deleteTodo(id, authUser.token);

      if (deletedTodo.json) {
        dispatchTodos({ type: Actions.DELETE_TODO, payload: deletedTodo.json });
      }
    };

    const setNextTodo = async (id) => {
      const todo = await getTodo(id, authUser.token);

      const newDueDate = new Date(todo.json.dueDate);

      switch (todo.json.frequency) {
        case "Day(s)":
          newDueDate.setDate(newDueDate.getDate() + parseInt(todo.json.every));
          break;
        case "Week(s)":
          newDueDate.setDate(newDueDate.getDate() + parseInt(todo.json.every) * 7);
          break;
        case "Month(s)":
          newDueDate.setMonth(newDueDate.getMonth() + parseInt(todo.json.every));
          break;
        default:
          break;
      }

      const todoData = { ...todo.json, dueDate: newDueDate, checked: false, checkedTime: null };

      const json = await updateTodo(id, todoData, authUser.token);

      if (json.json) {
        const todos = await getTodos(authUser.token);

        if (todos.json) {
          dispatchTodos({ type: Actions.GET_TODOS, payload: todos.json });
        }
      }
    };

    if (todos) {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].checked && todos[i].checkedTime && isDeleteable(todos[i].checkedTime)) {
          if (todos[i].recurring) {
            setNextTodo(todos[i]._id);
            updatedCount++;
          } else {
            deleteCheckedTodo(todos[i]._id);
            deleteCount++;
          }
        }
      }
    }

    if (dueTodos) {
      for (let i = 0; i < dueTodos.length; i++) {
        if (dueTodos[i].checked && dueTodos[i].checkedTime && isDeleteable(dueTodos[i].checkedTime)) {
          if (dueTodos[i].recurring) {
            setNextTodo(dueTodos[i]._id);
            updatedCount++;
          } else {
            deleteCheckedTodo(dueTodos[i]._id);
            deleteCount++;
          }
        }
      }
    }

    setDeletedTodoCount(deleteCount);
    setUpdatedTodoCount(updatedCount);

    setTimeout(() => {
      setDeletedTodoCount(0);
      setUpdatedTodoCount(0);
    }, 3000);
  };

  const handleCheck = async (todo) => {
    setLoading(todo._id);

    const json = await updateTodo(
      todo._id,
      { ...todo, checked: !todo.checked, checkedTime: new Date() },
      authUser.token
    );

    if (json.json) {
      const todos = await getTodos(authUser.token);

      if (todos.json) {
        dispatchTodos({ type: Actions.GET_TODOS, payload: todos.json });

        setLoading("");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/todo/${id}`);
  };

  return (
    <>
      <Toast open={deletedTodoCount > 0 || updatedTodoCount > 0}>
        {deletedTodoCount > 0 &&
          `${deletedTodoCount} Todo${deletedTodoCount > 1 ? "s" : ""} successfully deleted.`}
        <br />
        {updatedTodoCount > 0 &&
          `${updatedTodoCount} Todo${updatedTodoCount > 1 ? "s" : ""} successfully updated.`}
      </Toast>
      <div className="flex flex-col gap-0 md:gap-4 min-h-[calc(100vh-412px)] md:min-h-[calc(100vh-168px)]">
        <div className="flex flex-row justify-between items-center p-4 md:p-0">
          <Typography variant="title">Todos</Typography>
          <Button
            prefix={<CachedIcon className={`${refreshLoading && "animate-spin"}`} />}
            onClick={handleRefreshClick}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-0">
          {dueTodos.length > 0 && (
            <div className="flex flex-col gap-4">
              <Typography variant="body2" color="secondary">
                DUE TODAY
              </Typography>
              <div className="flex flex-col gap-4">
                {dueTodos.map((todo) => (
                  <TodoCard
                    key={todo._id}
                    todo={todo.todo}
                    color={getCalendarColor(calendars, todo.user)}
                    dueDate={todo.dueDate}
                    notes={todo.notes}
                    recurring={todo.recurring}
                    every={todo.every}
                    frequency={todo.frequency}
                    checked={todo.checked}
                    loading={loading === todo._id}
                    badge={isRecentlyAdded(todo.creationTime)}
                    onClick={() => handleEdit(todo._id)}
                    onCheck={() => handleCheck(todo)}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {dueTodos.length > 0 && todos.length > 0 && (
              <Typography variant="body2" color="secondary">
                ALL TODOS
              </Typography>
            )}
            {dueTodos.length > 0 && todos.length === 0 && (
              <Typography variant="body2" color="secondary">
                ALL TODOS
              </Typography>
            )}
            {todos.length > 0 ? (
              <div className="flex flex-col gap-4">
                {todos.map((todo) => (
                  <TodoCard
                    key={todo._id}
                    todo={todo.todo}
                    color={getCalendarColor(calendars, todo.user)}
                    dueDate={todo.dueDate}
                    notes={todo.notes}
                    recurring={todo.recurring}
                    every={todo.every}
                    frequency={todo.frequency}
                    checked={todo.checked}
                    loading={loading === todo._id}
                    badge={isRecentlyAdded(todo.creationTime)}
                    onClick={() => handleEdit(todo._id)}
                    onCheck={() => handleCheck(todo)}
                  />
                ))}
              </div>
            ) : (
              <div className="pt-8">
                <EmptyState type="Todo" subtext={`Click "Add Todo" to create a new todo.`} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoLayout;
