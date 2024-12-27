//Taylor Zweigle, 2024
import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import Button from "../core/button/Button";
import Card from "../core/card/Card";
import Typography from "../core/typography/Typography";

import TodoForm from "../components/forms/TodoForm";

const TodoFormPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="w-full sm:w-128 m-auto">
      <Card border>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center border-b border-slate-300 dark:border-slate-600 pt-4 pb-4">
            <div className="flex flex-1 pl-4">
              <Button variant="text" prefix={<ChevronLeftIcon />} onClick={() => navigate(-1)}>
                Back
              </Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Typography variant="heading">{`${params.id ? "Edit" : "Add"} Todo`}</Typography>
            </div>
            <div className="flex flex-1">&nbsp;</div>
          </div>
          <TodoForm isEditTodoForm={params.id} />
        </div>
      </Card>
    </div>
  );
};

export default TodoFormPage;
