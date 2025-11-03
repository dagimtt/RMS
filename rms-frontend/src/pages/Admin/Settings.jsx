function Settings() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Settings
      </h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-3">
        <p className="text-gray-600 dark:text-gray-400">
          Customize your dashboard preferences and account.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Update Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
