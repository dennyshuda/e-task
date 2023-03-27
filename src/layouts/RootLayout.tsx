import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Children } from "../types";

export default function RootLayout({ children }: Children) {
  const auth = false;

  return (
    <div className="flex w-full h-screen">
      {auth && <Sidebar />}
      <div className={`${auth ? "basis-10/12" : "w-full"}`}>
        {auth && <Header />}
        <div className="p-5 h-[92vh] overflow-auto">{children}</div>
      </div>
    </div>
  );
}
