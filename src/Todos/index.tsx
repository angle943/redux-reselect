import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store";
import TodoCategory from "store/TodoCategory";
import { createTodo, editTodo, removeTodo, toggleTodo } from "store/todos";
import { deselectTodoId, selectTodoId } from "store/selectedTodoId";
import {
  setVisibilityFilterActive,
  setVisibilityFilterAll,
  setVisibilityFilterCompleted,
  VisibilityFilterType,
} from "store/visibilityFilter";

import "./Todos.css";

interface TodosProps {
  category?: TodoCategory;
}

const Todos = function ({ category }: TodosProps) {
  const dispatch = useDispatch();
  const visibilityFilter = useSelector(
    (state: RootState) => state.visibilityFilter
  );
  const todos = useSelector((state: RootState) => state.todos);
  const selectedTodoId = useSelector(
    (state: RootState) => state.selectedTodoId
  );
  const selectedTodo =
    (selectedTodoId && todos.find((todo) => todo.id === selectedTodoId)) ||
    null;

  useEffect(() => {
    dispatch(deselectTodoId());
    dispatch(setVisibilityFilterAll());
  }, [dispatch]);

  const [newTodoInput, setNewTodoInput] = useState<string>("");
  const [editTodoInput, setEditTodoInput] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const editInput = useRef<HTMLInputElement>(null);

  const handleNewInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTodoInput(e.target.value);
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditTodoInput(e.target.value);
  };

  const handleCreateNewTodo = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newTodoInput.length) return;

    dispatch(createTodo({ desc: newTodoInput, category: TodoCategory.None }));
    setNewTodoInput("");
  };

  const handleSelectTodo = (todoId: string) => (): void => {
    dispatch(selectTodoId({ id: todoId }));
  };

  const handleEdit = (): void => {
    if (!selectedTodo) return;

    setEditTodoInput(selectedTodo.desc);
    setIsEditMode(true);
  };

  useEffect(() => {
    if (isEditMode) {
      editInput?.current?.focus();
    }
  }, [isEditMode]);

  const handleUpdate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!editTodoInput.length || !selectedTodo) {
      handleCancelUpdate();
      return;
    }

    dispatch(editTodo({ id: selectedTodo.id, desc: editTodoInput }));
    setIsEditMode(false);
    setEditTodoInput("");
  };

  const handleCancelUpdate = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e?.preventDefault();
    setIsEditMode(false);
    setEditTodoInput("");
  };

  const handleToggle = (): void => {
    if (!selectedTodo || !selectedTodo) return;

    dispatch(
      toggleTodo({
        id: selectedTodo.id,
      })
    );
  };

  const handleDelete = (): void => {
    if (!selectedTodo) return;

    dispatch(removeTodo({ id: selectedTodo.id }));
  };

  const renderTitle = (): ReactNode => {
    switch (category) {
      case TodoCategory.React:
        return "React Todos with Selectors";
      case TodoCategory.Redux:
        return "Redux Todos with Selectors";
      case TodoCategory.Typescript:
        return "Typescript Todos with Selectors";
      default:
        return "Todos with Selectors";
    }
  };

  return (
    <div className="Todos">
      <div className="Todos__header">
        <h1>{renderTitle()}</h1>
        <form onSubmit={handleCreateNewTodo}>
          <label htmlFor="new-todo">Add new:</label>
          <input
            onChange={handleNewInputChange}
            id="new-todo"
            value={newTodoInput}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <div className="Todos__filter">
        Filters:
        <span
          className={`filter${
            visibilityFilter === VisibilityFilterType.All ? " active" : ""
          }`}
          onClick={() => dispatch(setVisibilityFilterAll())}
        >
          All
        </span>
        <span
          className={`filter${
            visibilityFilter === VisibilityFilterType.Completed ? " active" : ""
          }`}
          onClick={() => dispatch(setVisibilityFilterCompleted())}
        >
          Completed
        </span>
        <span
          className={`filter${
            visibilityFilter === VisibilityFilterType.Active ? " active" : ""
          }`}
          onClick={() => dispatch(setVisibilityFilterActive())}
        >
          Active
        </span>
      </div>
      <div className="Todos__body">
        <ul className="Todos__list">
          <h2>My Todos:</h2>
          {todos.map((todo, i) => (
            <li
              className={`${todo.isComplete ? "done" : ""} ${
                todo.id === selectedTodoId ? "active" : ""
              }`}
              key={todo.id}
              onClick={handleSelectTodo(todo.id)}
            >
              <span className="list-number">{i + 1})</span> {todo.desc}
            </li>
          ))}
        </ul>
        <div className="Todo_todo-info">
          <h2>Selected Todo:</h2>
          {selectedTodo === null ? (
            <span className="empty-state">No Todo Selected</span>
          ) : !isEditMode ? (
            <>
              <span
                className={`todo-desc ${
                  selectedTodo?.isComplete ? "done" : ""
                }`}
              >
                {selectedTodo.desc}
              </span>
              <div className="todo-actions">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleToggle}>Toggle</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <label htmlFor="edit-todo">Edit:</label>
              <input
                ref={editInput}
                onChange={handleEditInputChange}
                value={editTodoInput}
              />
              <button type="submit">Update</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
