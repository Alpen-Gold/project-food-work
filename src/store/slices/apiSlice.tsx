import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  products: Array<{
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
  }>;
  categories: Array<{
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
  }>;
  loading: boolean;
}

const initialState: CounterState = {
  value: 0,
  categories: [],
  products: [],
  loading: false,
};

export const apiSlice = createSlice({
  name: "api-data",
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    renderData: (
      state,
      action: PayloadAction<
        Array<{
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
        }>
      >
    ) => {
      state.categories = action.payload;
    },

    renderDataProducts: (
      state,
      action: PayloadAction<
        Array<{
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
        }>
      >
    ) => {
      state.products = action.payload;
    },
  },
});

export const { isLoading, renderData, renderDataProducts } = apiSlice.actions;

export default apiSlice.reducer;
