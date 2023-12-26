// icons

import { useState } from "react";
import axios from "axios";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { CiEdit } from "react-icons/ci";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { isLoading, renderDataProducts } from "../../store/slices/apiSlice";
import { useParams } from "react-router-dom";

interface ItemFormType {
  name: string | null;
  img: string | null | object | undefined;
  comment: string;
  isActive: boolean | null;
  kal: number;
  price: number;
  languages: {
    ru: string | null;
    eng: string | null;
  };
  commentEngRu: {
    ru: string | null;
    eng: string | null;
  };
}
function EditProductModal({
  item,
}: {
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
}) {
  const [open, setOpen] = useState(false);
  const [itemForm, setItemForm] = useState<ItemFormType>({
    name: item.name,
    img: item.img,
    isActive: item.isActive,
    comment: item.comment,
    kal: item.kal,
    price: item.price,
    languages: {
      ru: item.languages.ru,
      eng: item.languages.eng,
    },
    commentEngRu: {
      ru: item.commentEngRu.ru,
      eng: item.commentEngRu.eng,
    },
  });

  const dispatch = useDispatch();
  const { id } = useParams();

  const addNewCategoryBtn = async () => {
    console.log(itemForm);

    const isFormValid = Object.values(itemForm).every((value) => value !== "");

    if (isFormValid) {
      try {
        await axios.put(`http://localhost:3004/products/${item.id}`, {
          ...item,
          ...itemForm,
        });

        renderingData();

        handleClose();
      } catch (error) {
        alert(error);
      }

      setOpen(false);
    } else {
      alert("Qiymat kiriting!");
    }
  };

  const renderingData = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get(
        `http://localhost:3004/products?categoryId=${id}`
      );

      console.log(response);

      dispatch(renderDataProducts(response.data));
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          handleClickOpen();
        }}
      >
        <span style={{ marginRight: 6 }}>
          <CiEdit size={23} />
        </span>
        O’zgartirish
      </MenuItem>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Kategoriya malumotlari</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <label htmlFor="keyWord">Key word</label>

          <label htmlFor="kategoriyaUzbek">Kategoriya nomi O‘zbek</label>
          <TextField
            autoFocus
            margin="dense"
            id="kategoriyaUzbek"
            placeholder="Kategoriya nomi..."
            type="text"
            fullWidth
            sx={{
              marginBottom: "15px",
              marginTop: "3px",
            }}
            value={itemForm.name}
            onChange={(e) => {
              setItemForm((old) => ({
                ...old,
                name: e.target.value,
              }));
            }}
            variant="standard"
          />

          <label htmlFor="kategoriyaRu">Название категории Русский</label>
          <TextField
            autoFocus
            margin="dense"
            id="kategoriyaRu"
            placeholder="Kategoriya nomi..."
            type="text"
            fullWidth
            sx={{
              marginBottom: "15px",
              marginTop: "3px",
            }}
            value={itemForm.languages.ru}
            onChange={(e) => {
              setItemForm((old) => ({
                ...old,
                languages: {
                  ...old.languages,
                  ru: e.target.value,
                },
              }));
            }}
            variant="standard"
          />

          <label htmlFor="kategoriyaEng">Category name English</label>
          <TextField
            autoFocus
            margin="dense"
            id="kategoriyaEng"
            placeholder="Kategoriya nomi..."
            type="text"
            fullWidth
            sx={{
              marginBottom: "15px",
              marginTop: "3px",
            }}
            value={itemForm.languages.eng}
            onChange={(e) => {
              setItemForm((old) => ({
                ...old,
                languages: {
                  ...old.languages,
                  eng: e.target.value,
                },
              }));
            }}
            variant="standard"
          />

          <label htmlFor="izohUzb">Izoh Uzbek</label>
          <TextField
            autoFocus
            margin="dense"
            id="izohUzb"
            placeholder="Izoh Uzbek..."
            type="text"
            fullWidth
            sx={{
              marginBottom: "15px",
              marginTop: "3px",
            }}
            value={itemForm.comment}
            onChange={(e) => {
              setItemForm((old) => ({
                ...old,
                comment: e.target.value,
              }));
            }}
            variant="standard"
          />

          <label htmlFor="izohRu">Примечание Русский</label>
          <TextField
            autoFocus
            margin="dense"
            id="izohRu"
            placeholder="Примечание Русский..."
            type="text"
            fullWidth
            sx={{
              marginBottom: "15px",
              marginTop: "3px",
            }}
            value={itemForm.commentEngRu.ru}
            onChange={(e) => {
              setItemForm((old) => ({
                ...old,
                commentEngRu: {
                  ...old.commentEngRu,
                  ru: e.target.value,
                },
              }));
            }}
            variant="standard"
          />

          <label htmlFor="izohEng">Note english</label>
          <TextField
            autoFocus
            margin="dense"
            id="izohEng"
            placeholder="Note english..."
            type="text"
            fullWidth
            sx={{
              marginBottom: "15px",
              marginTop: "3px",
            }}
            value={itemForm.commentEngRu.eng}
            onChange={(e) => {
              setItemForm((old) => ({
                ...old,
                commentEngRu: {
                  ...old.commentEngRu,
                  eng: e.target.value,
                },
              }));
            }}
            variant="standard"
          />

          <label htmlFor="taomKal">Taom kalloriyasi</label>
          <TextField
            autoFocus
            margin="dense"
            id="taomKal"
            placeholder="Taom kalloriyasi..."
            type="number"
            fullWidth
            sx={{
              marginBottom: "15px",
              marginTop: "3px",
            }}
            value={itemForm.kal}
            onChange={(e) => {
              setItemForm((old) => ({
                ...old,
                kal: Number(e.target.value),
              }));
            }}
            variant="standard"
          />

          <label htmlFor="taomNarx">Taom narxi</label>
          <TextField
            autoFocus
            margin="dense"
            id="taomNarx"
            placeholder="Taom narxi..."
            type="number"
            fullWidth
            sx={{
              marginBottom: "15px",
              marginTop: "3px",
            }}
            value={itemForm.price}
            onChange={(e) => {
              setItemForm((old) => ({
                ...old,
                price: Number(e.target.value),
              }));
            }}
            variant="standard"
          />

          <div id="profile-upload">
            <Box className="hvr-profile-img">
              {itemForm.img !== "" && itemForm.img ? (
                <label htmlFor="imag">
                  <img
                    src={String(itemForm?.img)}
                    alt="Selected"
                    className="imgformproduct"
                  />
                </label>
              ) : (
                <label id="rasmYuklash" htmlFor="imag">
                  Rasm yuklash
                </label>
              )}

              <input
                id="imag"
                type="file"
                name="logo"
                onChange={(e) => {
                  const file = e?.target?.files ? e?.target?.files[0] : null;
                  if (file) {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                      setItemForm((old) => ({
                        ...old,
                        img: reader.result,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="upload w180"
                title="Dimensions 180 X 180"
              />
            </Box>
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <button className="save-btn" onClick={() => addNewCategoryBtn()}>
            Saqlash
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditProductModal;
