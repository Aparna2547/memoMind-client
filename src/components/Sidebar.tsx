import { useEffect } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { logout } from "../store/Slice";
import { initFlowbite } from "flowbite";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { MdAddToHomeScreen } from "react-icons/md";
import { userlogout } from "../apis/user";

const Sidebar = () => {
  useEffect(() => {
    initFlowbite();
  }, []);
  const dispatch = useDispatch();

  const handleLogout = async () => {
     await userlogout()
    dispatch(logout());
    toast.success("logged out successfully");
  };

  return (
    <>
      <div className="pt-10 bg-[#962c68] h-screen" style={{ width: "300px" }}>
        <div className="w-full font-bold text-white text-2xl">Memo Mind</div>

        <Link to="/">
          <div className="flex gap-2 p-3 w-full mt-6 hovering  text-white text-xl">
            <h1 className="mt-1">
              <MdAddToHomeScreen />
            </h1>
            <p className="font-bold mb-1">Home</p>
          </div>
        </Link>
        <div className="mt-1 w-full  cursor-pointer">
          <Link to="/bin">
            <div className="flex gap-2 p-3 w-full  hovering  text-white text-xl">
              <h1 className="mt-1">
                <RiDeleteBin7Line />
              </h1>
              <p className="font-bold mb-1">Bin</p>
            </div>
          </Link>
          <div
            className="flex gap-2 p-3 w-full  hovering  text-white text-xl cursor-pointer"
            onClick={handleLogout}
          >
            <h1 className="mt-1.5">
              <RiLogoutCircleLine />
            </h1>
            <p className="font-bold">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
