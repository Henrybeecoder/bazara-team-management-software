import Image from "next/image";
import AppLayout from "@/layout/appLayout";
import HomeScreen from "@/screens/homeScreen/homeScreen";

export default function Home() {
  return (
   <div>
    <AppLayout>
    <HomeScreen />
      </AppLayout >
   </div>
  );
}
