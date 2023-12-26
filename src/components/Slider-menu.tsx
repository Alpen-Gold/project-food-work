// icons
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { BiDish } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const arrayItems = [
  {
    name: "Menu",
    path: "categories",
    icon: <BiDish size={23} />,
  },

  {
    name: "Reklama",
    path: "test1",
    icon: <PeopleAltOutlinedIcon />,
  },

  {
    name: "Ishchilar",
    path: "test2",
    icon: <PeopleAltOutlinedIcon />,
  },

  {
    name: "Konpaniya nomlari",
    path: "test3",
    icon: <PeopleAltOutlinedIcon />,
  },

  {
    name: "Bildirishnoma",
    path: "test4",
    icon: <PeopleAltOutlinedIcon />,
  },
];

function SliderMenu() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="app-icon">LOGO</div>
      </div>
      <ul className="sidebar-list">
        {arrayItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path.toLocaleLowerCase()}
            className="sidebar-list-item"
          >
            <li>
              <div className="menu-link">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default SliderMenu;
