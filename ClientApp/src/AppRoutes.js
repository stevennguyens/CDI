import { Form } from "./components/Form/Form.tsx";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home/Home.tsx";
import { useSearchParams } from "react-router-dom";

const AppRoutes = [
  {
    path: '/add',
    element: <Form />
  }
];

export default AppRoutes;
