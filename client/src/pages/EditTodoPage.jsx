//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useTodosContext } from "../hooks/useTodosContext";

import Button from "../core/button/Button";
import Card from "../core/card/Card";
import SelectInput from "../core/selectInput/SelectInput";
import TextInput from "../core/textInput/TextInput";
import Typography from "../core/typography/Typography";

import { months } from "../components/calendar/Calendar";
import DateInput from "../components/inputs/DateInput";

import { getTodo, getTodos, updateTodo } from "../api/todos";

const EditTodoPage = () => {
  const navigate = useNavigate();

  const params = useParams();

  const { user: authUser } = useAuthContext();
  const { dispatch } = useTodosContext();

  const [todo, setTodo] = useState("");
  const [user, setUser] = useState("");
  const [type, setType] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [checked, setChecked] = useState(false);

  const [todoError, setTodoError] = useState("");
  const [userError, setUserError] = useState("");
  const [typeError, setTypeError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      const todo = await getTodo(params.id, authUser.token);

      setTodo(todo.json.todo);
      setUser(todo.json.user);
      setType(todo.json.type);
      setMonth(months[new Date(todo.json.date).getMonth()]);
      setDate(new Date(todo.json.date).getDate());
      setYear(new Date(todo.json.date).getFullYear());
      setChecked(todo.json.checked);
    };

    if (authUser) {
      fetchTodo();
    }
  }, [params.id, authUser]);

  const handleOnCancel = () => {
    navigate(-1);
  };

  const handleOnSave = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!authUser) {
      return;
    }

    if (loading) {
      return;
    }

    clearErrors();

    const newTodo = {
      todo: todo,
      user: user,
      type: type,
      date: new Date(`${month} ${date}, ${year}`),
      checked: checked,
      creationTime: new Date(),
    };

    const json = await updateTodo(params.id, newTodo, authUser.token);

    if (json.error) {
      if (json.error.includes("todo")) {
        setTodoError("Todo is required");
      }
      if (json.error.includes("user")) {
        setUserError("User is required");
      }
      if (json.error.includes("type")) {
        setTypeError("Type is required");
      }

      setLoading(false);
    }

    if (json.json) {
      const todos = await getTodos(authUser.token);

      if (todos.json) {
        dispatch({ type: Actions.GET_TODOS, payload: todos.json });
      }

      navigate(-1);

      clearForm();
    }
  };

  const clearForm = () => {
    setTodo("");
    setUser("");
    setType("");
    setMonth("");
    setDate("");
    setYear("");

    clearErrors();
  };

  const clearErrors = () => {
    setTodoError("");
    setUserError("");
    setTypeError("");
  };

  return (
    <div className="w-full sm:w-128 m-auto">
      <Card border>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center border-b border-slate-300 dark:border-slate-600 pt-4 pb-4">
            <div className="flex flex-1 pl-4">
              <Button variant="text" prefix={<ChevronLeftIcon />} onClick={handleOnCancel}>
                Back
              </Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Typography variant="heading">Edit Todo</Typography>
            </div>
            <div className="flex flex-1">&nbsp;</div>
          </div>
          <div className="flex flex-col">
            <div className="h-[calc(100vh-224px)] md:h-fit p-4">
              <form onSubmit={handleOnSave}>
                <div className="flex flex-col gap-4">
                  <DateInput
                    label="Due Date"
                    month={month}
                    date={date}
                    year={year}
                    onMonthChange={(e) => setMonth(e.target.value)}
                    onDateChange={(e) => setDate(e.target.value)}
                    onYearChange={(e) => setYear(e.target.value)}
                  />
                  <TextInput label="Todo" error={todoError} value={todo} showLabel onChange={(e) => setTodo(e.target.value)} />
                  <SelectInput
                    label="User"
                    value={user}
                    error={userError}
                    items={["", "Husband", "Wife", "Us"]}
                    showLabel
                    onChange={(e) => setUser(e.target.value)}
                  />
                  <SelectInput
                    label="Type"
                    value={type}
                    error={typeError}
                    items={["", "Chores", "Shopping"]}
                    showLabel
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 border-t p-4 border-slate-300 dark:border-slate-600">
              <div>
                <Button variant="default" fullWidth onClick={handleOnCancel}>
                  Cancel
                </Button>
              </div>
              <div>
                <Button variant="primary" fullWidth loading={loading} onClick={handleOnSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EditTodoPage;