import { allData } from "~/utilities/constant";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getStorageData, setStorageData } from "~/utilities/storage";

export default function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    const userData = getStorageData('userData', allData.find(m => m.module === "User")?.data || []);
    const storedData = getStorageData('roleData', allData);
    const storedTeams = getStorageData('teamData', allData);
    
    const currentUser = userData.find((u: any) => u.id === Number(id));
    const roleData = storedData.find((d: any) => d.module === "Role")?.data || [];
    const teamData = storedTeams.find((d: any) => d.module === "Team")?.data || [];
    
    setUser(currentUser);
    setRoles(roleData);
    setTeams(teamData);
  }, [id]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const userData = getStorageData('userData', allData.find(m => m.module === "User")?.data || []);
    const userIndex = userData.findIndex((u: any) => u.id === Number(id));

    if (userIndex !== -1) {
      userData[userIndex] = {
        ...userData[userIndex],
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password") || userData[userIndex].password,
        role: formData.get("role"),
        team: formData.get("team")
      };
      setStorageData('userData', userData);
    }

    window.location.href = "/user/list";
  };

  if (!user) return <div>Loading...</div>;

  return (
    <form className="m-4" onSubmit={onSubmit}>
      <div className="flex flex-row justify-between mb-4">
        <p className="font-bold text-2xl">Edit User</p>
        <div className="flex flex-row gap-2">
          <Link
            className="bg-white text-black px-2 py-1 rounded"
            to="/user/list"
          >
            Back to List
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
              defaultValue={user.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black p-2" 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input 
              name="email" 
              type="email" 
              defaultValue={user.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black p-2" 
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="Leave blank to keep current password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black p-2" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select 
              name="role" 
              defaultValue={user.role}
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
              defaultValue={user.team}
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