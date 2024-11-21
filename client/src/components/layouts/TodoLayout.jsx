//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useTodosContext } from "../../hooks/useTodosContext";

import { getTodos, updateTodo } from "../../api/todos";

import EmptyState from "../../core/emptyState/EmptyState";
import Typography from "../../core/typography/Typography";

import TodoCard from "../../components/cards/TodoCard";

import { calendars } from "../../utility/calendars";

const TodoLayout = ({ data }) => {
  const navigate = useNavigate();

  const { user: authUser } = useAuthContext();
  const { dispatch } = useTodosContext();

  const [todos, setTodos] = useState([]);
  const [dueTodos, setDueTodos] = useState([]);

  const [loading, setLoading] = useState("");

  useEffect(() => {
    setTodos(data ? data.filter((todo) => new Date() < new Date(todo.dueDate)) : []);
    setDueTodos(data ? data.filter((todo) => new Date() >= new Date(todo.dueDate)) : []);
  }, [data]);

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
        dispatch({ type: Actions.GET_TODOS, payload: todos.json });

        setLoading("");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/todo/${id}`);
  };

  const showBadge = (time) => new Date().getTime() - new Date(time).getTime() < 43200000;

  return (
    <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-0 min-h-[calc(100vh-412px)] md:min-h-[calc(100vh-168px)]">
      <Typography variant="title">Todos</Typography>
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
                color={calendars.find((calendar) => calendar.user === todo.user).color}
                dueDate={todo.dueDate}
                notes={todo.notes}
                checked={todo.checked}
                loading={loading === todo._id}
                badge={showBadge(todo.creationTime)}
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
                color={calendars.find((calendar) => calendar.user === todo.user).color}
                dueDate={todo.dueDate}
                notes={todo.notes}
                checked={todo.checked}
                loading={loading === todo._id}
                badge={showBadge(todo.creationTime)}
                onClick={() => handleEdit(todo._id)}
                onCheck={() => handleCheck(todo)}
              />
            ))}
          </div>
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
