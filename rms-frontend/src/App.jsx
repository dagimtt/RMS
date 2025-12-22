import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./Layouts/AdminLayout";
import DirectorLayout from "./layouts/DirectorLayout";

import Home from "./pages/Admin/Home";
import Records from "./pages/Admin/Records";
import Reports from "./pages/Admin/Reports";
import Settings from "./pages/Admin/Settings";
import IncomingRecords from "./pages/Admin/IncomingRecords";
import OutgoingRecords from "./pages/Admin/OutgoingRecords";
import AddIncoming from "./pages/Admin/AddIncoming";
import AddOutgoing from "./pages/Admin/AddOutgoing";
import Detail from "./pages/Admin/Detail.jsx"
import OutgoingDetail from "./pages/Admin/OutgoingDetail"
import Users from "./pages/Admin/Users.jsx";
import AddUser from "./pages/Admin/AddUser.jsx";
import Login from "./auth/Login";

import DirectorHome from "./pages/Director/DirectorHome";
import DirectorProfile from "./pages/Director/DirectorProfile";
import DirectorIncoming from "./pages/Director/DirectorIncoming";
import DirectorAddLetter from "./pages/Director/DirectorAddLetter";


function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Admin layout routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Home />} />
          <Route path="records" element={<Records />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="incoming" element={<IncomingRecords />} />
          <Route path="outgoing" element={<OutgoingRecords />} />
          <Route path="add-incoming" element={<AddIncoming />} />
          <Route path="add-outgoing" element={<AddOutgoing />} />
          <Route path="/incoming-detail/:id" element={<Detail />} />
          <Route path="/outgoing-detail/:id" element={<OutgoingDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />

        </Route>

        {/* Director layout routes */}
        <Route path="/director" element={<DirectorLayout />}>
          <Route index element={<DirectorHome />} />
          <Route path="home" element={<DirectorHome />} />
          <Route path="profile" element={<DirectorProfile />} />
          <Route path="incoming" element={<DirectorIncoming />} />
          <Route path="add-letter" element={<DirectorAddLetter />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
