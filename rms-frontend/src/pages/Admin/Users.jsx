import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // Function to return background color based on status
  const statusColor = (status) =>
    status.toLowerCase() === "active"
      ? "bg-green-50 text-green-80"
      : "bg-red-100 text-red-800";

  // Toggle status and update backend
  const toggleStatus = async (user) => {
    const newStatus = user.status.toLowerCase() === "active" ? "inactive" : "active";

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Users</h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "First Name", "Last Name", "Email", "Role", "Status", "Created"].map(
                (h) => (
                  <th key={h} className="px-6 py-3 text-left text-sm font-semibold">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">{u.id}</td>
                <td className="px-6 py-3">{u.first_name}</td>
                <td className="px-6 py-3">{u.last_name}</td>
                <td className="px-6 py-3">{u.email}</td>
                <td className="px-6 py-3 capitalize">{u.role}</td>
                <td
  onClick={() => toggleStatus(u)}
  className={`cursor-pointer rounded-full px-2 py-1 text-[10px] font-semibold text-center ${statusColor(
    u.status
  )} transition-colors`}
  title="Click to toggle status"
>
  {u.status}
</td>
                <td className="px-6 py-3">{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="p-6 text-gray-500 text-center">No users found</p>
        )}
      </div>
    </div>
  );
}

export default Users;
