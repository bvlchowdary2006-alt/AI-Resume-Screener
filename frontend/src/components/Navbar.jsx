import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileUp,
  Briefcase,
  BarChart3,
  ShieldCheck,
  Github as GithubIcon,
  Home,
} from "lucide-react";
import Button from "./ui/Button";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Upload", path: "/upload", icon: FileUp },
    { name: "Job Match", path: "/jobs", icon: Briefcase },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-950/80 backdrop-blur-md border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-brand-600 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                <ShieldCheck className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-surface-400">
                AI Screener
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-brand-500/10 text-brand-400"
                        : "text-surface-400 hover:text-white hover:bg-surface-800"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-surface-400 hover:text-white transition-colors"
            >
              <GithubIcon size={20} />
            </a>
            <Link to="/upload">
              <Button variant="primary" size="sm" className="hidden sm:flex">
                Try AI Screening
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
