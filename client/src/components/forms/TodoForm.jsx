//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import * as Actions from "../../actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useCalendarsContext } from "../../hooks/useCalendarsContext";
import { useSelectedDateContext } from "../../hooks/useSelectedDateContext";
import { useTodosContext } from "../../hooks/useTodosContext";

import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from "../../api/todos";

import AreaTextInput from "../../core/areaTextInput/AreaTextInput";
import Button from "../../core/button/Button";
import Checkbox from "../../core/checkbox/Checkbox";
import SelectInput from "../../core/selectInput/SelectInput";
import TextInput from "../../core/textInput/TextInput";

import { months } from "../calendar/Calendar";
import DateInput from "../inputs/DateInput";
import DatePickerModal from "../modals/DatePickerModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import NumberInput from "../../components/inputs/NumberInput";

const TodoForm = ({ isEditTodoForm }) => {
  const navigate = useNavigate();
  const params = useParams();

  const { user: authUser } = useAuthContext();
  const { calendars } = useCalendarsContext();
  const { selectedDate } = useSelectedDateContext();
  const { dispatchTodos } = useTodosContext();

  const [todo, setTodo] = useState("");
  const [user, setUser] = useState("");
  const [month, setMonth] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [year, setYear] = useState("");
  const [notes, setNotes] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [every, setEvery] = useState("");
  const [frequency, setFrequency] = useState("Day(s)");
  const [checked, setChecked] = useState(false);

  const [todoError, setTodoError] = useState("");
  const [userError, setUserError] = useState("");

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const fetchTodoData = async () => {
      const todo = await getTodo(params.id, authUser.token);

      setTodo(todo.json.todo);
      setUser(todo.json.user);
      setMonth(new Date(todo.json.dueDate).getMonth());
      setDueDate(new Date(todo.json.dueDate).getDate());
      setYear(new Date(todo.json.dueDate).getFullYear());
      setNotes(todo.json.notes);
      setRecurring(todo.json.recurring);
      setEvery(todo.json.every);
      setFrequency(todo.json.frequency);
      setChecked(todo.json.checked);
    };

    if (authUser) {
      if (isEditTodoForm) {
        fetchTodoData();
      }
    }
  }, [params.id, authUser, isEditTodoForm]);

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    setMonth(date.getMonth());
    setDueDate(date.getDate());
    setYear(date.getFullYear());
  }, [selectedDate]);

  const handleOnSaveMonthPicker = (selectedDate) => {
    setMonth(selectedDate.month);
    setDueDate(selectedDate.date);
    setYear(selectedDate.year);

    setModalOpen(false);
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
      dueDate: new Date(`${months[month]} ${dueDate}, ${year}`),
      notes: notes,
      recurring: recurring,
      every: recurring ? every : "",
      frequency: recurring ? frequency : "",
      checked: checked,
      creationTime: new Date(),
    };

    const json = isEditTodoForm
      ? await updateTodo(params.id, newTodo, authUser.token)
      : await createTodo(newTodo, authUser.token);

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
      if (isEditTodoForm) {
        const todos = await getTodos(authUser.token);

        if (todos.json) {
          dispatchTodos({ type: Actions.GET_TODOS, payload: todos.json });
        }
      } else {
        dispatchTodos({ type: Actions.CREATE_TODO, payload: json.json });
      }

      navigate(-1);

      clearForm();
    }
  };

  const handleOnDelete = async () => {
    setDeleteLoading(true);

    if (deleteLoading) {
      return;
    }

    const todo = await deleteTodo(params.id, authUser.token);

    if (todo.json) {
      dispatchTodos({ type: Actions.DELETE_TODO, payload: todo.json });

      navigate(-1);

      setDeleteLoading(false);
    }
  };

  const handleOnCancel = () => {
    navigate(-1);

    clearForm();
  };

  const clearForm = () => {
    setTodo("");
    setUser("");
    setMonth("");
    setDueDate("");
    setYear("");
    setNotes("");
    setRecurring("");
    setEvery("");
    setFrequency("Day(s)");

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
        date={dueDate}
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
      <div className="flex flex-col">
        <div className="h-fit p-4">
          <form onSubmit={handleOnSave}>
            <div className="flex flex-col gap-4">
              <DateInput
                label="Due Date"
                month={month}
                date={dueDate}
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
                items={[
                  "",
                  ...calendars
                    .filter((calendar) => calendar.calendar !== "Calendar")
                    .map((calendar) => calendar.calendar),
                ]}
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
              <div className="flex items-center h-12">
                <Checkbox label="Recurring" selected={recurring} onClick={() => setRecurring(!recurring)} />
              </div>
              <div className={`flex flex-row items-end gap-4 ${recurring ? "block" : "hidden"}`}>
                <NumberInput
                  label="Every"
                  value={every}
                  showLabel
                  onChange={(e) => setEvery(e.target.value)}
                />
                <SelectInput
                  label="Frequency"
                  value={frequency}
                  items={["Day(s)", "Week(s)", "Month(s)"]}
                  onChange={(e) => setFrequency(e.target.value)}
                />
              </div>
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
          {isEditTodoForm && (
            <div>
              <Button variant="error" fullWidth onClick={() => setDeleteModal(true)}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoForm;
