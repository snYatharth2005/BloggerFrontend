import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="hidden md:block ml-4 rounded-full p-2 shadow transition-colors bg-gray-200 cursor-pointer"
    >
      {theme === "dark" ? (
        <span role="img" aria-label="sun">🌞</span>
      ) : (
        <span role="img" aria-label="moon">🌙</span>
      )}
    </button>
  );
};

export default ThemeToggle;
