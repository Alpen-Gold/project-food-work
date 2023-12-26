import styled from "@emotion/styled";
import { Box } from "@mui/material";
import axios from "axios";
import { IoMdTime } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, renderDataProducts } from "../../store/slices/apiSlice";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import ProductCard from "./product-card";
import AddProductModal from "./Modal-add";

function ProductPage() {
  const [searchValue, setSearchValue] = useState("");
  const loading = useSelector((store: RootState) => store.api_data.loading);
  const categories = useSelector(
    (store: RootState) => store.api_data.categories
  );
  const dispatch = useDispatch();
  const products = useSelector((store: RootState) => store.api_data.products);

  const { id } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
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

    fetchCategories();
  }, []);

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

  const editProduct = async (item: { isActive: boolean; id: number }) => {
    dispatch(isLoading(true));

    try {
      const response = await axios.put(
        `http://localhost:3004/products/${item.id}`,
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

  const deleteProduct = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3004/products/${id}`
      );

      renderingData();

      return response;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <ProductPageWrapper className="app-content">
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
          <h1 className="app-content-headerText">
            {categories.find((item) => item.id === Number(id))?.name}
          </h1>
          {/* add category */}

          <AddProductModal />
        </div>

        <div className={"products-area-wrapper gridView"}>
          {/* category card */}

          {loading ? (
            <Loading />
          ) : (
            products
              .filter((oldItem: { name: string }) =>
                oldItem.name
                  .toLowerCase()
                  .includes(String(searchValue).toLowerCase())
              )
              .map((item, index) => {
                return (
                  <ProductCard
                    key={index}
                    item={item}
                    deleteProduct={deleteProduct}
                    editProduct={editProduct}
                  />
                );
              })
          )}

          {/* category card end */}
        </div>
      </div>
    </ProductPageWrapper>
  );
}

export default ProductPage;

const ProductPageWrapper = styled.div`
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
`;
