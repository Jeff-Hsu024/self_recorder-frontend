import { useState, useEffect } from 'react';

function Header() {
  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"
  ];

  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme') || 'light';
    }
    return 'dracula';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
    }
  }, [currentTheme]);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
  };

  return (
    <header className="bg-base-200 text-base-content py-4 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Self Recorder</h1>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            <div data-theme={currentTheme} className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm">
              <div className="bg-base-content size-1 rounded-full"></div>
              <div className="bg-primary size-1 rounded-full"></div>
              <div className="bg-secondary size-1 rounded-full"></div>
              <div className="bg-accent size-1 rounded-full"></div>
            </div>
            {currentTheme}
            <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l-128 128q-18 19-45 19t-45-19L1024 542 719 237q-19-18-45-18t-45 18L506 349q-19 19-19 45t19 45l507 507q19 19 45 19t45-19l507-507q19-19 19-45t-19-45zm0 768l-128 128q-18 19-45 19t-45-19L1024 1310 719 1005q-19-18-45-18t-45 18L506 1117q-19 19-19 45t19 45l507 507q19 19 45 19t45-19l507-507q19-19 19-45t-19-45z"></path></svg>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 max-h-96 overflow-y-auto">
            {themes.map((theme) => (
              <li key={theme}>
                <button
                  className={`gap-3 px-2 w-full flex items-center ${currentTheme === theme ? 'active' : ''}`}
                  data-set-theme={theme}
                  data-act-class="[&_svg]:visible"
                  onClick={() => handleThemeChange(theme)}
                >
                  <div data-theme={theme} className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm">
                    <div className="bg-base-content size-1 rounded"></div>
                    <div className="bg-primary size-1 rounded"></div>
                    <div className="bg-secondary size-1 rounded"></div>
                    <div className="bg-accent size-1 rounded"></div>
                  </div>
                  <div className="w-32 truncate">{theme}</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`h-3 w-3 shrink-0 ${currentTheme === theme ? 'visible' : 'invisible'}`}
                  >
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
