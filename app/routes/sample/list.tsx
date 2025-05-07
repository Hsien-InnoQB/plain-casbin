import { allData } from "~/utilities/constant";
import { getStorageData } from "~/utilities/storage";
import { useEffect, useState, type SetStateAction } from "react";
import { Link } from "react-router";
import { casbinAuth } from "~/utilities/casbin";

export default function ListSample() {
  const [samples, setSamples] = useState<any[]>([]);
  const [isAllowedDelete, setIsAllowedDelete] = useState<boolean>(false);

  useEffect(() => {
    const strUserJson = localStorage.getItem("user");
    const user = strUserJson ? JSON.parse(strUserJson) : null;

    const sampleData = getStorageData(
      "sampleData",
      allData.find((m) => m.module === "Sample")?.data || []
    );

    let filteredSampleData: SetStateAction<any[]> = [];
    if (user?.team == "Team Admin") {
      setSamples(sampleData);
    } else {
      sampleData.forEach((sample: any) => {
        if (sample.team === user?.team) {
          filteredSampleData.push(sample);
        }
      });
      setSamples(filteredSampleData);
    }

    setIsAllowedDelete(casbinAuth.can("delete", "Sample"));
  }, []);

  function handleDelete(id: any): void {
    const sampleData = getStorageData(
      "sampleData",
      allData.find((m) => m.module === "Sample")?.data || []
    );
    const updatedSampleData = sampleData.filter(
      (sample: any) => sample.id !== id
    );
    localStorage.setItem("sampleData", JSON.stringify(updatedSampleData));
    setSamples(updatedSampleData);
  }

  return (
    <div className="m-4">
      <div className="flex flex-row justify-between mb-4">
        <p className="font-bold text-2xl">Samples</p>
        <div className="flex flex-row gap-2">
          <Link
            to="/sample/create"
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
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample: any) => (
              <tr
                key={sample.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{sample.name}</td>
                <td className="px-6 py-4 flex flex-row gap-2">
                  <Link
                    to={`/sample/edit/${sample.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(sample.id)}
                    className={`text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium ${
                      isAllowedDelete ? "" : "cursor-not-allowed hidden"
                    }`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
