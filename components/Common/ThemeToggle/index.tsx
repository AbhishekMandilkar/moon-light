import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

enum Theme {
  Light = "light",
  Dark = "dark",
}

function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  return (
    <>
      <button
        onClick={() =>
          setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)
        }
      >
        {theme === Theme.Light ? <Moon /> : <Sun />}
      </button>
    </>
  );
}

export default ThemeToggle;
