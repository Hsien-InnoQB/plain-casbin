import { allData } from "~/utilities/constant";
import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "~/utilities/storage";
import { Link } from "react-router";

export default function CreateUser() {
  const [roles, setRoles] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    const storedRole = getStorageData('roleData', allData.find(m => m.module === "Role")?.data || []);
    const storedTeams = getStorageData('teamData', allData.find(m => m.module === "Team")?.data || []);
    
    setRoles(storedRole);
    setTeams(storedTeams);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const userData = getStorageData('userData', allData.find(m => m.module === "User")?.data || []);
    const newId = userData.length > 0 ? Math.max(...userData.map((u: any) => u.id)) + 1 : 1;

    userData.push({
      id: newId,
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      team: formData.get("team")
    });

    setStorageData('userData', userData);
    window.location.href = "/user/list";
  };

  return (
    <form className="m-4" onSubmit={onSubmit}>
      <div className="flex flex-row justify-between mb-4">
        <p className="font-bold text-2xl">Create User</p>
        <div className="flex flex-row gap-2">
          <Link
            className="bg-white text-black px-2 py-1 rounded"
            to="/user/list"
          >
            Back
          </Link>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition-colors duration-200">
            Save
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input 
              name="name" 
              type="text" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black p-2" 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input 
              name="email" 
              type="email" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black p-2" 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input 
              name="password" 
              type="password" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black p-2" 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select 
              name="role" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black p-2" 
              required
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Team</label>
            <select 
              name="team" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black p-2" 
              required
            >
              <option value="">Select Team</option>
              {teams.map(team => (
                <option key={team.id} value={team.name}>{team.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </form>
  );
}