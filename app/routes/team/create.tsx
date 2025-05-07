import { allData } from "~/utilities/constant";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function CreateTeam() {
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('roleData') || JSON.stringify(allData));
    const roleData = storedData.find((d: any) => d.module === "Role")?.data || [];
    setRoles(roleData);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const selectedRoles = roles
      .filter(role => formData.get(`role-${role.id}`) === "on")
      .map(role => role.name);

    const teamData = JSON.parse(localStorage.getItem('teamData') || JSON.stringify(allData.find(m => m.module === "Team")?.data || []));
    const newId = teamData.length > 0 ? Math.max(...teamData.map((t: any) => t.id)) + 1 : 1;

    teamData.push({
      id: newId,
      name: formData.get("name"),
      roles: selectedRoles
    });

    localStorage.setItem('teamData', JSON.stringify(teamData));
    window.location.href = "/team/list";
  };

  return (
    <form className="m-4" onSubmit={onSubmit}>
      <div className="flex flex-row justify-between mb-4">
        <p className="font-bold text-2xl">Create Team</p>
        <div className="flex flex-row gap-2">
          <Link
            className="bg-white text-black px-2 py-1 rounded"
            to="/team/list"
          >Back</Link>
          <button className="bg-gray-500 px-2 py-1 rounded">Save</button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Name</label>
          <input name="name" type="text" className="bg-white text-black w-full rounded p-2" required />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Roles</label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map(role => (
              <label key={role.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`role-${role.id}`}
                  className="w-4 h-4"
                />
                <span>{role.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}