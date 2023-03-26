import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import MyTask from "./pages/MyTask";

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-task" element={<MyTask />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
