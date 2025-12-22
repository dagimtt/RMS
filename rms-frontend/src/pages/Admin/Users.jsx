import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Users</h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "First Name", "Last Name", "Email", "Role", "Created"].map(
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
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{u.id}</td>
                <td className="px-6 py-3">{u.first_name}</td>
                <td className="px-6 py-3">{u.last_name}</td>
                <td className="px-6 py-3">{u.email}</td>
                <td className="px-6 py-3 capitalize">{u.role}</td>
                <td className="px-6 py-3">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
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
