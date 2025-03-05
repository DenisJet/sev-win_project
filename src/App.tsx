import "./App.style.scss";
import Board from "./components/Board/Board";
import { Header } from "./components/Header";
import { SideMenu } from "./components/SideMenu";

export function App() {
  return (
    <>
      <Header />
      <div className="container">
        <SideMenu />
        <Board />
      </div>
    </>
  );
}
