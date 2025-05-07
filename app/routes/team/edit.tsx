import { allData } from "~/utilities/constant";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function EditTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState<any>(null);
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    const teamData = JSON.parse(localStorage.getItem('teamData') || JSON.stringify(allData.find(m => m.module === "Team")?.data || []));
    const storedData = JSON.parse(localStorage.getItem('roleData') || JSON.stringify(allData));
    
    const currentTeam = teamData.find((t: any) => t.id === Number(id));
    const roleData = storedData.find((d: any) => d.module === "Role")?.data || [];
    
    setTeam(currentTeam);
    setRoles(roleData);
  }, [id]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const selectedRoles = roles
      .filter(role => formData.get(`role-${role.id}`) === "on")
      .map(role => role.name);

    const teamData = JSON.parse(localStorage.getItem('teamData') || JSON.stringify(allData.find(m => m.module === "Team")?.data || []));
    const teamIndex = teamData.findIndex((t: any) => t.id === Number(id));

    if (teamIndex !== -1) {
      teamData[teamIndex] = {
        ...teamData[teamIndex],
        name: formData.get("name"),
        roles: selectedRoles
      };
      localStorage.setItem('teamData', JSON.stringify(teamData));
    }

    window.location.href = "/team/list";
  };

  if (!team) return <div>Loading...</div>;

  return (
    <form className="m-4" onSubmit={onSubmit}>
      <div className="flex flex-row justify-between mb-4">
        <p className="font-bold text-2xl">Edit Team</p>
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
          <input 
            name="name" 
            type="text" 
            defaultValue={team.name}
            className="bg-white text-black w-full rounded p-2" 
            required 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Roles</label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map(role => (
              <label key={role.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`role-${role.id}`}
                  defaultChecked={team.roles.includes(role.name)}
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