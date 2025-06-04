import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const role = useSelector((state) => state.auth.role);
    return (
        <div className="bg-red-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]">
            <div className="flex items-center flex-col justify-center">
                {" "}
                <img src = {data.avatar} className="h-[12vh]" />
                <p className="mt-3 text-xl text-white font-semibold">
                    {data.username}
                </p>
                <p className="mt-1 text-normal text-white">{data.email}</p>
                <div className="w-full mt-4 h-[1px] bg-red-500 hidden lg:block"></div>
            </div>

            {role === "user" && (
                <div className="w-full flex-col items-center justify-center hidden lg:flex">
                <Link to="/profile"
                    className="text-white font-semibold w-full py-2 text-center hover:bg-red-400 rounded transition-all duration-300">
                        Favourites
                    </Link>
                <Link to="/profile/orderHistory"
                    className="text-white font-semibold w-full py-2 mt-4 text-center hover:bg-red-400 rounded transition-all duration-300">
                        Order History
                </Link>
                <Link to="/profile/settings"
                    className="text-white font-semibold w-full py-2 mt-4 text-center hover:bg-red-400 rounded transition-all duration-300">
                        Settings
                </Link>
            </div>
            )}

            {role === "admin" && (
                <div className="w-full flex-col items-center justify-center hidden lg:flex">
                <Link to="/profile"
                    className="text-white font-semibold w-full py-2 text-center hover:bg-red-400 rounded transition-all duration-300">
                        All Orders
                    </Link>
                <Link to="/profile/add-book"
                    className="text-white font-semibold w-full py-2 mt-4 text-center hover:bg-red-400 rounded transition-all duration-300">
                        Add Book
                </Link>
            </div>
            )}

            <button className="bg-white w-3/6 lg:w-full mt-4 lg:mt-0 text-red-800 font-semibold flex ietms-center justify-center py-2 rounded hover:bg-red-400 hover:text-white transition-all duration-300"
            onClick={() => {
                dispatch(authActions.logout());
                dispatch(authActions.changeRole("user"))
                localStorage.clear("id");
                localStorage.clear("token");
                localStorage.clear("role");
                history("/");
            }}>
                Log Out <FaArrowRightFromBracket className="ms-4" />
            </button>
        </div>
    );
};

export default Sidebar;