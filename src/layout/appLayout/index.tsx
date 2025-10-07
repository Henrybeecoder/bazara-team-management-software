import Header from "@/components/header/header";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}