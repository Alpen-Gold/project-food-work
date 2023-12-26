import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { TiThMenu } from "react-icons/ti";
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
    icon: <BiDish size={23} />,
  },

  {
    name: "Ishchilar",
    path: "test2",
    icon: <BiDish size={23} />,
  },

  {
    name: "Konpaniya nomlari",
    path: "test3",
    icon: <BiDish size={23} />,
  },

  {
    name: "Bildirishnoma",
    path: "test4",
    icon: <BiDish size={23} />,
  },
];

export default function MenuLeyout() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: "left") => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
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
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <button
          onClick={toggleDrawer("left", true)}
          style={{
            position: "absolute",
            top: "15px",
            left: "10px",
            fontSize: "20px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <TiThMenu />
        </button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
