import styled from "@emotion/styled";
import { Box } from "@mui/material";
import CategoryCard from "./category-card";
import axios from "axios";
import { IoMdTime } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import AddCategoryModal from "./Modal-add";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, renderData } from "../../store/slices/apiSlice";
import { RootState } from "../../store/store";

function CategoryPage() {
  const [searchValue, setSearchValue] = useState("");

  const loading = useSelector((store: RootState) => store.api_data.loading);
  const categories = useSelector(
    (store: RootState) => store.api_data.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
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

    fetchCategories();
  }, []);

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

  const editCategory = async (item: {
    name: string;
    img: string;
    isActive: boolean;
    id: number;
  }) => {
    dispatch(isLoading(true));

    try {
      const response = await axios.put(
        `http://localhost:3004/categories/${item.id}`,
        {
          ...item,
          isActive: !item.isActive,
        }
      );

      renderingData();
      return response;
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      dispatch(isLoading(false));
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3004/categories/${id}`
      );

      renderingData();

      return response;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <CateogryPageWrapper className="app-content">
      <div>
        <Box className="app-content-actions" id="inputBox">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <IoMdNotificationsOutline size={23} />
            <IoMdTime size={23} />
          </Box>

          <input
            className="search-bar"
            placeholder="Search..."
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Box>

        <div className="app-content-header">
          <h1 className="app-content-headerText">Menu</h1>
          {/* add category */}

          <AddCategoryModal />
        </div>

        <div className={"products-area-wrapper gridView"}>
          {/* category card */}

          {loading ? (
            <Loading />
          ) : (
            categories
              .filter((oldItem: { name: string }) =>
                oldItem.name
                  .toLowerCase()
                  .includes(String(searchValue).toLowerCase())
              )
              .map((item, index) => {
                return (
                  <CategoryCard
                    key={index}
                    item={item}
                    deleteCategory={deleteCategory}
                    editCategory={editCategory}
                  />
                );
              })
          )}

          {/* category card end */}
        </div>
      </div>
    </CateogryPageWrapper>
  );
}

export default CategoryPage;

const CateogryPageWrapper = styled.div`
  #inputBox {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  #category-name {
    color: #000;
    font-size: 24px;
    font-weight: 500;
  }

  // style checkbox
`;
