
enum KeyboardShortcut {
  toggleDarkMode = 'toggleDarkMode',
  settings = 'settings',
  logout = 'logout',
  search = 'search',
}

export const getKeyboardShortcuts = () => {
  const shortcuts: {
    [key in KeyboardShortcut]: string;
  } = {} as any;
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  if (isMac) {
    shortcuts.toggleDarkMode = "A + T";
    shortcuts.settings = "⌘ + ,";
    shortcuts.logout = "⌘ + L";
    shortcuts.search = "⌘ + K";
  } else {
    shortcuts.toggleDarkMode = "Ctrl + T";
    shortcuts.settings = "Ctrl + ,";
    shortcuts.logout = "Ctrl + L";
    shortcuts.search = "Ctrl + K";
  }
  return shortcuts;
};