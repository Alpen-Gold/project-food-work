import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// icons
import { MdDeleteOutline } from "react-icons/md";
import EditCategoryModal from "./Modal-edit";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const ITEM_HEIGHT = 48;
interface CategoryCardProps {
  item: {
    id: number;
    name: string;
    keyWord: string;
    img: string;
    isActive: boolean;
    languages: {
      ru: string;
      eng: string;
    };
    timeFood: {
      start: string | null;
      end: string | null;
    };
  };
  deleteCategory: (id: number) => void;
  editCategory: (item: {
    name: string;
    img: string;
    isActive: boolean;
    id: number;
  }) => void;
}

function CategoryCard({
  item,
  deleteCategory,
  editCategory,
}: CategoryCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="products-row">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            position: "relative",
          }}
        >
          <Box sx={{ position: "absolute", top: "0" }}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  deleteCategory(item.id);
                }}
              >
                <span style={{ marginRight: 6 }}>
                  <MdDeleteOutline size={23} />
                </span>
                O’chirish
              </MenuItem>

              <EditCategoryModal item={item} />

              <MenuItem>
                <span style={{ marginRight: 6 }}>
                  <div className="checkbox-apple">
                    <input
                      className="yep"
                      id="check-apple"
                      type="checkbox"
                      defaultChecked={Boolean(item.isActive)}
                      onChange={() =>
                        setTimeout(() => {
                          editCategory(item);
                        }, 700)
                      }
                    />
                    <label htmlFor="check-apple"></label>
                  </div>
                </span>
                O’chirish
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <div className="product-cell image" id="img-card-box">
          <img
            src={item.img}
            alt="product"
            onClick={() => {
              navigate(`${item.id}`);
            }}
          />
        </div>
        <Box
          className="product-cell category"
          id="category-name"
          onClick={() => {
            navigate(`${item.id}`);
          }}
        >
          {item.name}
        </Box>
      </div>
    </>
  );
}

export default CategoryCard;
