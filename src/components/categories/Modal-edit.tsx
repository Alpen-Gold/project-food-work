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
import { isLoading, renderData } from "../../store/slices/apiSlice";

interface ItemFormType {
  name: string | null;
  keyWord: string | null;
  img: string | null | object | undefined;
  isActive: boolean | null;
  languages: {
    ru: string | null;
    eng: string | null;
  };
  timeFood: {
    start: string | null;
    end: string | null;
  };
}
function EditCategoryModal({
  item,
}: {
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
}) {
  const [open, setOpen] = useState(false);
  const [itemForm, setItemForm] = useState<ItemFormType>({
    name: item.name,
    keyWord: item.keyWord,
    img: item.img,
    isActive: item.isActive,
    languages: {
      ru: item.languages.ru,
      eng: item.languages.eng,
    },
    timeFood: {
      start: item.timeFood.start,
      end: item.timeFood.end,
    },
  });

  const dispatch = useDispatch();

  const addNewCategoryBtn = async () => {
    console.log(itemForm);

    if (
      (itemForm.img !== "" && itemForm.keyWord !== "" && itemForm.name !== "",
      itemForm.languages.ru !== "" && itemForm.languages.eng !== "")
    ) {
      try {
        await axios.put(
          `http://localhost:3004/categories/${item.id}`,
          itemForm
        );

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
      const response = await axios.get("http://localhost:3004/categories");

      console.log(response);

      dispatch(renderData(response.data));
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
          <TextField
            autoFocus
            margin="dense"
            id="keyWord"
            placeholder="Key word..."
            type="text"
            fullWidth
            sx={{
              marginBottom: "15px",
              marginTop: "3px",
            }}
            value={itemForm.keyWord}
            onChange={(e) => {
              setItemForm((old) => ({
                ...old,
                keyWord: e.target.value,
              }));
            }}
            variant="standard"
          />

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

          <label htmlFor="kategoriyaEng">
            Tayyor bolish vaqti / Tugash vaqti
          </label>
          <Box
            sx={{
              display: "flex",
              alignItems: "center ",
              justifyContent: "start",
              gap: "30px",
              m: "10px 0",
            }}
          >
            <input
              type="time"
              onChange={(e) => {
                setItemForm((old) => ({
                  ...old,
                  timeFood: {
                    ...old.timeFood,
                    start: e.target.value,
                  },
                }));
              }}
            />

            <input
              type="time"
              onChange={(e) => {
                setItemForm((old) => ({
                  ...old,
                  timeFood: {
                    ...old.timeFood,
                    end: e.target.value,
                  },
                }));
              }}
            />
          </Box>

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              mt: "5px",
            }}
          >
            <input
              type="checkbox"
              id="active"
              checked={Boolean(itemForm.isActive)}
              onChange={(e) => {
                setItemForm((old) => ({
                  ...old,
                  isActive: e.target.checked,
                }));
              }}
            />
            <label htmlFor="active">Active</label>
          </Box>

          <button className="save-btn" onClick={() => addNewCategoryBtn()}>
            Saqlash
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditCategoryModal;
