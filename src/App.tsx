import { Outlet } from "react-router-dom";
import { Button } from "./components/ui/button";
import { decrement, increment } from "./redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { ModeToggle } from "./components/mode-toggle";
import NavBar from "./components/NavBar/navbar";

function App() {
  // const dispatch = useAppDispatch();
  // const { count } = useAppSelector((state) => state.counter);
  // const handleIncrement = (amount: number) => {
  //   dispatch(increment(amount));
  // };
  // const handleDecrement = (amount: number) => {
  //   dispatch(decrement(amount));
  // };
  return (
    <>
      <NavBar></NavBar>
      {/* <h1>Counter with Redux</h1>
      <Button onClick={() => handleIncrement(1)}>Increment</Button>
      <Button onClick={() => handleIncrement(5)}>Increment By 5</Button>
      <div>{count}</div>
      <Button onClick={() => handleDecrement(1)}>Decrement</Button>
      <Button onClick={() => handleDecrement(5)}>Decrement By 5</Button> */}
      <Outlet />
    </>
  );
}

export default App;
