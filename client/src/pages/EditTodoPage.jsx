//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useTodosContext } from "../hooks/useTodosContext";

import AreaTextInput from "../core/areaTextInput/AreaTextInput";
import Button from "../core/button/Button";
import Card from "../core/card/Card";
import SelectInput from "../core/selectInput/SelectInput";
import TextInput from "../core/textInput/TextInput";
import Typography from "../core/typography/Typography";

import { months } from "../components/calendar/Calendar";
import DateInput from "../components/inputs/DateInput";
import DatePickerModal from "../components/modals/DatePickerModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";

import { getTodo, getTodos, updateTodo, deleteTodo } from "../api/todos";

const EditTodoPage = () => {
  const navigate = useNavigate();

  const params = useParams();

  const { user: authUser } = useAuthContext();
  const { dispatch } = useTodosContext();

  const [todo, setTodo] = useState("");
  const [user, setUser] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [notes, setNotes] = useState("");
  const [checked, setChecked] = useState(false);

  const [todoError, setTodoError] = useState("");
  const [userError, setUserError] = useState("");

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      const todo = await getTodo(params.id, authUser.token);

      setTodo(todo.json.todo);
      setUser(todo.json.user);
      setMonth(new Date(todo.json.date).getMonth());
      setDate(new Date(todo.json.date).getDate());
      setYear(new Date(todo.json.date).getFullYear());
      setNotes(todo.json.notes);
      setChecked(todo.json.checked);
    };

    if (authUser) {
      fetchTodo();
    }
  }, [params.id, authUser]);

  const handleOnSaveMonthPicker = (selectedDate) => {
    setMonth(selectedDate.month);
    setDate(selectedDate.date);
    setYear(selectedDate.year);

    setModalOpen(false);
  };

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
      date: new Date(`${months[month]} ${date}, ${year}`),
      notes: notes,
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

      setLoading(false);
    }

    if (json.json) {
      const todos = await getTodos(authUser.token);

      if (todos.json) {
        dispatch({ type: Actions.GET_TODOS, payload: todos.json });
      }

      navigate(-1);

      clearForm();

      setLoading(false);
    }
  };

  const handleOnDelete = async () => {
    setDeleteLoading(true);

    if (deleteLoading) {
      return;
    }

    const todo = await deleteTodo(params.id, authUser.token);

    if (todo.json) {
      dispatch({ type: Actions.DELETE_TODO, payload: todo.json });

      navigate(-1);

      setDeleteLoading(false);
    }
  };

  const clearForm = () => {
    setTodo("");
    setUser("");
    setMonth("");
    setDate("");
    setYear("");
    setNotes("");

    clearErrors();
  };

  const clearErrors = () => {
    setTodoError("");
    setUserError("");
  };

  return (
    <>
      <DatePickerModal
        open={modalOpen}
        month={month}
        date={date}
        year={year}
        onSaveClick={handleOnSaveMonthPicker}
        onCancelClick={() => setModalOpen(false)}
      />
      <DeleteConfirmationModal
        open={deleteModal}
        type="todo"
        loading={deleteLoading}
        onDeleteClick={handleOnDelete}
        onCancelClick={() => setDeleteModal(false)}
      />
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
              <div className="h-fit p-4">
                <form onSubmit={handleOnSave}>
                  <div className="flex flex-col gap-4">
                    <DateInput
                      label="Due Date"
                      month={month}
                      date={date}
                      year={year}
                      showLabel
                      onClick={() => setModalOpen(true)}
                    />
                    <TextInput
                      label="Todo"
                      error={todoError}
                      value={todo}
                      showLabel
                      onChange={(e) => setTodo(e.target.value)}
                    />
                    <SelectInput
                      label="User"
                      value={user}
                      error={userError}
                      items={["", "Husband", "Wife", "Us"]}
                      showLabel
                      onChange={(e) => setUser(e.target.value)}
                    />
                    <AreaTextInput
                      label="Notes"
                      value={notes}
                      rows={4}
                      showLabel
                      onChange={(e) => setNotes(e.target.value)}
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
                <div className="sm:order-1">
                  <Button variant="primary" fullWidth loading={loading} onClick={handleOnSave}>
                    Update
                  </Button>
                </div>
                <div>
                  <Button variant="error" fullWidth onClick={() => setDeleteModal(true)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default EditTodoPage;
