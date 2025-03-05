import "./SideMenu.style.scss";
import { menuItems } from "./SideMenu.service";

export default function SideMenu() {
  return (
    <div className="sidemenu">
      <div className="sidemenu_header">
        <div>
          <p>Название проекта</p>
          <span>Аббревиатура</span>
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
      <ul className="sidemenu_list">
        {menuItems.map((item) => {
          return (
            <li className="sidemenu_item" key={item}>
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
                className="lucide lucide-layout-dashboard"
              >
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              <p>{item}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
