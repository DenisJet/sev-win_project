import "./Header.style.scss";

export default function Header() {
  return (
    <header className="header">
      <button className="header_button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-grip"
        >
          <circle cx="12" cy="5" r="1" />
          <circle cx="19" cy="5" r="1" />
          <circle cx="5" cy="5" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
          <circle cx="12" cy="19" r="1" />
          <circle cx="19" cy="19" r="1" />
          <circle cx="5" cy="19" r="1" />
        </svg>
      </button>
      <button className="header_button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-undo-2"
        >
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
        </svg>
      </button>
      <a href="/" className="header_link header_link-active">
        Просмотр
      </a>
      <a href="/" className="header_link">
        Управление
      </a>
    </header>
  );
}
