import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// icons
import { MdDeleteOutline } from "react-icons/md";
import EditProductModal from "./Modal-edit";

const ITEM_HEIGHT = 48;
interface CategoryCardProps {
  item: {
    id: number;
    name: string;
    img: string;
    isActive: boolean;
    comment: string;
    kal: number;
    categoryId: number;
    price: number;
    languages: {
      ru: string;
      eng: string;
    };
    commentEngRu: {
      ru: string | null;
      eng: string | null;
    };
  };
  deleteProduct: (id: number) => void;
  editProduct: (item: { isActive: boolean; id: number }) => void;
}

function ProductCard({ item, deleteProduct, editProduct }: CategoryCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
                  deleteProduct(item.id);
                }}
              >
                <span style={{ marginRight: 6 }}>
                  <MdDeleteOutline size={23} />
                </span>
                O’chirish
              </MenuItem>

              <EditProductModal item={item} />

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
                          editProduct(item);
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
            style={{ width: "80px", height: "80px" }}
          />
        </div>
        <Box className="product-cell category" id="category-name">
          {item.name}
        </Box>

        <Box className="product-cell category" id="category-name">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M10.25 19.6667C6.79822 19.6667 4 16.8684 4 13.4167C4 11.6218 4.75655 10.0037 5.96816 8.86383C7.08669 7.81146 9.83333 5.91626 9.41667 1.75C14.4167 5.08333 16.9167 8.41667 11.9167 13.4167C12.75 13.4167 14 13.4167 16.0833 11.358C16.3081 12.0027 16.5 12.6954 16.5 13.4167C16.5 16.8684 13.7017 19.6667 10.25 19.6667Z"
              fill="#F9A201"
            />
          </svg>

          <Typography sx={{ color: "#5B5B5B", fontSize: 16 }}>
            {item.kal} Kcal
          </Typography>
        </Box>

        <Box className="product-cell category" id="category-name">
          <Typography sx={{ fontSize: 18 }}>{item.price} so’m</Typography>
        </Box>
      </div>
    </>
  );
}

export default ProductCard;
