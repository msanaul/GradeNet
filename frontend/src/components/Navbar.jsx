import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 absolute top-0 w-screen">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center">
          <span className="text-white text-lg font-semibold">
            <Link to="/" className="text-white mr-4">
              GradeNet
            </Link>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
