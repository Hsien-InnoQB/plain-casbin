import { allData } from "~/utilities/constant";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

export default function EditSample() {
  const { id } = useParams();
  const [sample, setSample] = useState<any>(null);

  useEffect(() => {
    const sampleData = JSON.parse(localStorage.getItem('sampleData') || JSON.stringify(allData.find(m => m.module === "Sample")?.data || []));
    const currentSample = sampleData.find((s: any) => s.id === Number(id));
    setSample(currentSample);
  }, [id]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const sampleData = JSON.parse(localStorage.getItem('sampleData') || JSON.stringify(allData.find(m => m.module === "Sample")?.data || []));
    const sampleIndex = sampleData.findIndex((s: any) => s.id === Number(id));

    if (sampleIndex !== -1) {
      sampleData[sampleIndex] = {
        ...sampleData[sampleIndex],
        name: formData.get("name")
      };
      localStorage.setItem('sampleData', JSON.stringify(sampleData));
    }

    window.location.href = "/sample/list";
  };

  if (!sample) return <div>Loading...</div>;

  return (
    <form className="m-4" onSubmit={onSubmit}>
      <div className="flex flex-row justify-between mb-4">
        <p className="font-bold text-2xl">Edit Sample</p>
        <div className="flex flex-row gap-2">
          <Link
            className="bg-white text-black px-2 py-1 rounded"
            to="/sample/list"
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
            defaultValue={sample.name}
            className="bg-white text-black w-full rounded p-2" 
            required 
          />
        </div>
      </div>
    </form>
  );
}