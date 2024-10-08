//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import * as Actions from "../actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useSelectedDateContext } from "../hooks/useSelectedDateContext";
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

import { createTodo } from "../api/todos";

const CreateTodoPage = () => {
  const navigate = useNavigate();

  const { user: authUser } = useAuthContext();
  const { dispatch } = useTodosContext();
  const { selectedDate } = useSelectedDateContext();

  const [todo, setTodo] = useState("");
  const [user, setUser] = useState("");
  const [month, setMonth] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [year, setYear] = useState("");
  const [notes, setNotes] = useState("");

  const [todoError, setTodoError] = useState("");
  const [userError, setUserError] = useState("");

  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

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
      checked: false,
      creationTime: new Date(),
    };

    const json = await createTodo(newTodo, authUser.token);

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
      dispatch({ type: Actions.CREATE_TODO, payload: json.json });

      navigate(-1);

      clearForm();
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
                <Typography variant="heading">Add Todo</Typography>
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
    </>
  );
};

export default CreateTodoPage;
