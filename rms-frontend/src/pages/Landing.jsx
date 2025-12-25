import { useNavigate } from "react-router-dom";
import lan from "../assets/lan.jpg";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${lan})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Top Bar */}
      <div className="relative z-10 flex justify-end p-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold
                     hover:bg-blue-700 transition shadow-lg"
        >
          Login
        </button>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Letter Management System
        </h1>
        <p className="text-lg md:text-xl max-w-2xl opacity-90">
          Secure, digital, and efficient record management for incoming and outgoing letters.
        </p>
      </div>
    </div>
  );
}

export default Landing;
