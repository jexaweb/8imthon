import { useEffect, useState } from "react";

export default function Theme() {
  const [isDark, setIsDark] = useState(false);

  // Dastlabki theme’ni localStorage’dan olish
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Har safar o‘zgarsa — attribute va localStorage yangilash
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300
        ${
          isDark
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
      `}
    >
      Change theme
    </button>
  );
}
