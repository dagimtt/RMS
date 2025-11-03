import { useState } from "react";

export default function DirectorProfile() {
  const [profile, setProfile] = useState({
    name: "Director Name",
    email: "director@example.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Profile
      </h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-3 py-2 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-3 py-2 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
