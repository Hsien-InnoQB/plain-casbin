import { useState } from "react";
import type { Route } from "./+types/home";
import { allData } from "~/utilities/constant";
import { getStorageData } from "~/utilities/storage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    setIsLoading(true);

    let isLoggedIn = false;
    const userData = getStorageData(
      "userData",
      allData.find((m) => m.module === "User")?.data || []
    );
    userData.forEach((user: any) => {
      if (user.email === email && user.password === password) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/dashboard";
        isLoggedIn = true;
        return;
      }
    });

    if (!isLoggedIn) {
      alert("Invalid email or password");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="bg-black w-full min-h-screen p-2">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 w-1/3 mx-auto my-24"
        >
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="yourmail@gmail.com"
              className="p-2 rounded w-full bg-zinc-800 border-zinc-600 hover:border-zinc-400 border-[1px] text-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              className="p-2 rounded w-full bg-zinc-800 border-zinc-600 hover:border-zinc-400 border-[1px] text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-3 p-2 rounded bg-white text-black cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
      {isLoading && (
        <div className="absolute z-10 top-0 min-h-screen w-full bg-black/50 text-white text-center mx-auto py-48">
          Loading...
        </div>
      )}
    </>
  );
}
