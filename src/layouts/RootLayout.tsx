import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface Children {
  children: ReactNode;
}

export default function RootLayout({ children }: Children) {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <main className="max-w-5xl flex-1 mx-auto py-4">{children}</main>
    </div>
  );
}
