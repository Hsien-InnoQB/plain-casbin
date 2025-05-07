import { allData } from "~/utilities/constant";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getStorageData, setStorageData } from "~/utilities/storage";

export default function ListRole() {
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    const roleData = getStorageData('roleData', allData.find(m => m.module === "Role")?.data || []);
    setRoles(roleData);
  }, []);

  const handleDelete = (id: number) => {
    const storedData = getStorageData('roleData', allData);
    const roleIndex = storedData.findIndex((e: any) => e.module === "Role");
    storedData[roleIndex].data = storedData[roleIndex].data.filter((e: any) => e.id !== id);
    setStorageData('roleData', storedData);
    setRoles(storedData[roleIndex].data);
  };

  return (
    <div className="m-4">
      <div className="flex flex-row justify-between mb-4">
        <p className="font-bold text-2xl">Role</p>
        <div className="flex flex-row gap-2">
          <Link 
            to="/role/create" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Create
          </Link>
          <Link
            to="/dashboard"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
          >
            Dashboard
          </Link>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {roles.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {index + 1}. {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/role/edit/${item.id}`}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
