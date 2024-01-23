import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

enum Theme {
  Light = "light",
  Dark = "dark",
}

function ThemeToggle(props: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme();
  return (
    <>
      <button
        onClick={() =>
          setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)
        }
      >
        {theme === Theme.Light ? (
          <Moon className={props?.className} />
        ) : (
          <Sun className={props?.className} />
        )}
      </button>
    </>
  );
}

export default ThemeToggle;
