import { Link } from "react-router";
import { allData, modules } from "~/utilities/constant";

export default function CreateRole() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    let permissionsObj: Record<string, string[]> = {};

    modules.forEach((module) => {
      const createPermission =
        formData.get(`create-${module.toLowerCase()}`) != null;
      const readPermission =
        formData.get(`read-${module.toLowerCase()}`) != null;
      const updatePermission =
        formData.get(`update-${module.toLowerCase()}`) != null;
      const deletePermission =
        formData.get(`delete-${module.toLowerCase()}`) != null;

      let modulePermissions: string[] = [];
      if (createPermission) modulePermissions.push("create");
      if (readPermission) modulePermissions.push("read");
      if (updatePermission) modulePermissions.push("update");
      if (deletePermission) modulePermissions.push("delete");

      if (modulePermissions.length > 0) {
        permissionsObj[module] = modulePermissions;
      }
    });

    const existingData = JSON.parse(
      localStorage.getItem("roleData") || JSON.stringify(allData)
    );
    const roleIndex = existingData.findIndex((e: any) => e.module === "Role");

    const roleData = existingData[roleIndex].data;
    const newId =
      roleData.length > 0 ? roleData[roleData.length - 1].id + 1 : 1;

    existingData[roleIndex].data.push({
      id: newId,
      name: (name ?? "").toString(),
      accessControl: JSON.stringify(permissionsObj),
    });

    localStorage.setItem("roleData", JSON.stringify(existingData));

    window.location.href = "/role/list";
  };

  return (
    <form className="m-4" onSubmit={onSubmit}>
      <div className="flex flex-row justify-between mb-4">
        <p className="font-bold text-2xl">Create Role</p>
        <div className="flex flex-row gap-2">
          <Link
            className="bg-white text-black px-2 py-1 rounded"
            to="/role/list"
          >Back</Link>
          <button className="bg-gray-500 px-2 py-1 rounded">Save</button>
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label className="text-sm">Name</label>
        <input
          name="name"
          type="text"
          className="bg-white text-black w-full rounded p-2"
        />
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label className="text-sm">Access Control</label>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Module
              </th>
              <th scope="col" className="px-6 py-3">
                Create
              </th>
              <th scope="col" className="px-6 py-3">
                Read
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {modules.map((e) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {e}
                  </th>
                  <td className="px-6 py-4">
                    <input
                      name={`create-${e.toLowerCase()}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      name={`read-${e.toLowerCase()}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      name={`update-${e.toLowerCase()}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      name={`delete-${e.toLowerCase()}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </form>
  );
}
