import { v1 as uuid } from "uuid";

import TodoCategory from "store/TodoCategory";
import { TodoState } from "./index";

const getRandBoolean = (): boolean => !!Math.floor(Math.random() * 2);

const createInitialTodoItem = (
  desc: string,
  category: TodoCategory
): TodoState => ({
  id: uuid(),
  isComplete: getRandBoolean(),
  desc,
  category,
});

const todosInitialState: TodoState[] = [
  createInitialTodoItem("Learn about JSX", TodoCategory.React),
  createInitialTodoItem(
    "Learn about Functional Components",
    TodoCategory.React
  ),
  createInitialTodoItem("Learn about lifecycle methods", TodoCategory.React),
  createInitialTodoItem("Learn about props", TodoCategory.React),
  createInitialTodoItem("Learn about state", TodoCategory.React),
  createInitialTodoItem("Learn about hooks", TodoCategory.React),
  createInitialTodoItem("Learn about useState", TodoCategory.React),
  createInitialTodoItem("Learn about context", TodoCategory.React),
  createInitialTodoItem("learn how to render arrays", TodoCategory.React),
  createInitialTodoItem(
    "learn about composition vs inheritance",
    TodoCategory.React
  ),
  createInitialTodoItem("Learn basics of Redux", TodoCategory.Redux),
  createInitialTodoItem("Learn how to setup store", TodoCategory.Redux),
  createInitialTodoItem("Learn about Reducers", TodoCategory.Redux),
  createInitialTodoItem("Learn about Action Creators", TodoCategory.Redux),
  createInitialTodoItem("Learn about Redux Toolkit", TodoCategory.Redux),
  createInitialTodoItem("Learn about createSlice", TodoCategory.Redux),
  createInitialTodoItem("Learn about thunks", TodoCategory.Redux),
  createInitialTodoItem("Learn about dispatch", TodoCategory.Redux),
  createInitialTodoItem("Learn about redux middleware", TodoCategory.Redux),
  createInitialTodoItem("Learn about redux hooks", TodoCategory.Redux),
  createInitialTodoItem("Learn about typing", TodoCategory.Typescript),
  createInitialTodoItem("Learn about void type", TodoCategory.Typescript),
  createInitialTodoItem("Learn how to type functions", TodoCategory.Typescript),
  createInitialTodoItem("Learn about enums", TodoCategory.Typescript),
  createInitialTodoItem("Learn about any vs unknown", TodoCategory.Typescript),
  createInitialTodoItem(
    "Learn how to use React with TS",
    TodoCategory.Typescript
  ),
  createInitialTodoItem(
    "Learn how to use Redux with TS",
    TodoCategory.Typescript
  ),
  createInitialTodoItem("Learn about interface", TodoCategory.Typescript),
  createInitialTodoItem("Learn about type files", TodoCategory.Typescript),
];

export default todosInitialState;
