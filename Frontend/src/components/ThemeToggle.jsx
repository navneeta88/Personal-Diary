function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme} type="button">
      <span className={`toggle-track ${theme === 'dark' ? 'dark' : ''}`}>
        <span className="toggle-thumb">{theme === 'dark' ? '🌙' : '☀️'}</span>
      </span>
    </button>
  );
}

export default ThemeToggle;