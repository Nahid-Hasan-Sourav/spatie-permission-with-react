import { Outlet } from "react-router-dom";
import RightSideBar from "../components/Dashboard/RightSideBar";

const Dashboard = () => {
  return (
    <div>
      <div className="flex h-screen">
        <RightSideBar />
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
