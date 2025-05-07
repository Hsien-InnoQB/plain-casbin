import { Link } from "react-router";
import { allData } from "~/utilities/constant";

export default function CreateSample() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const sampleData = JSON.parse(localStorage.getItem('sampleData') || JSON.stringify(allData.find(m => m.module === "Sample")?.data || []));
    const newId = sampleData.length > 0 ? Math.max(...sampleData.map((s: any) => s.id)) + 1 : 1;

    const strUserJson = localStorage.getItem('user');
    const user = strUserJson ? JSON.parse(strUserJson) : null;

    sampleData.push({
      id: newId,
      name: formData.get("name"),
      description: formData.get("description"),
      team: user.team,
    });

    localStorage.setItem('sampleData', JSON.stringify(sampleData));
    window.location.href = "/sample/list";
  };

  return (
    <form className="m-4" onSubmit={onSubmit}>
      <div className="flex flex-row justify-between mb-4">
        <p className="font-bold text-2xl">Create Sample</p>
        <div className="flex flex-row gap-2">
          <Link
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
            to="/sample/list"
          >Back</Link>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
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
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <input 
              name="description" 
              type="text" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black p-2" 
              required 
            />
          </div>
        </div>
      </div>
    </form>
  );
}