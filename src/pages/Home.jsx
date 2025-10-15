import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const url = user?.photoURL;
  const isValidUrl =
    url && (url.startsWith("http") || url.startsWith("data:image/"));

  return (
    <div className="flex justify-between items-center p-4 sm:px-8 bg-white shadow-md rounded-lg mt-5">
      {/* Chap tomondagi sarlavha */}
      <div className="flex items-center space-x-2">
        <h1 className="text-xl sm:text-2xl font-bold ">Kitchen App</h1>
      </div>

      {/* O'ng tomonda foydalanuvchi bloki */}

      <div className="relative group hoverid">
        <div className="flex items-center space-x-2 cursor-pointer">
          <h1 className="text-gray-700 font-medium hidden sm:block">
            {user.displayName}
          </h1>

          <img
            src={isValidUrl ? user.photoURL : "/default-avatar.png"}
            alt="user avatar"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
        </div>

        {/* Hoverda chiqadigan menyu */}
        <div
          className="absolute right-0 top-12 bg-white shadow-lg rounded-xl p-3 w-40 
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                     transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        >
          <ul className="flex flex-col space-y-2">
            <li className="hover:bg-gray-100 rounded-md px-3 py-2 text-gray-700 font-medium text-sm cursor-pointer transition">
              <Link> Home</Link>
            </li>
            <li className="hover:bg-gray-100 rounded-md px-3 py-2 text-gray-700 font-medium text-sm cursor-pointer transition">
              <Link> Create recipe</Link>
            </li>
            <li className="hover:bg-gray-100 rounded-md px-3 py-2 text-gray-700 font-medium text-sm cursor-pointer transition">
              <Link to={"/themes"}> Change theme</Link>
            </li>
            <li>
              <button
                onClick={_logout}
                disabled={isPending}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    isPending
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                  }
                `}
              >
                {isPending ? "Loading..." : "Logout"}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default Home;
