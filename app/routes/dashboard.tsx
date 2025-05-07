import { useEffect, useState } from "react";
import { Link } from "react-router";
import { casbinAuth } from "~/utilities/casbin";
import { modules } from "~/utilities/constant";

export default function Dashboard() {
  const [isAllowed, setIsAllowed] = useState([false, false, false, false]);

  useEffect(() => {
    const strUserJson = localStorage.getItem("user");
    const userJson = JSON.parse(strUserJson || "{}");

    casbinAuth.setUser(userJson.name);
    casbinAuth.setPermission(userJson.role);
    modules.forEach((module) => {
      const isAllowed = casbinAuth.can("read", module) || false;
      setIsAllowed((prevIsAllowed) => {
        const updatedIsAllowed = [...prevIsAllowed];
        updatedIsAllowed[modules.indexOf(module)] = isAllowed;
        return updatedIsAllowed;
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="flex flex-row justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <button className="bg-white text-black py-1 px-2 rounded cursor-pointer" onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}>Logout</button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {modules.map(
          (module, index) =>
            isAllowed[index] && (
              <Link
                key={module}
                to={`/${module.toLowerCase()}/list`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center justify-center h-40">
                  <span className="text-2xl font-bold text-gray-700 dark:text-white">
                    {module}
                  </span>
                  <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Manage {module}
                  </span>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}
