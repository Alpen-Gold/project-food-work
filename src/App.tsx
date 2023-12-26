import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LeyoutMenu from "./components/Leyout-menu";
import CategoryPage from "./components/categories/Category-page";
import NotPage from "./components/Not-page";
import ProductPage from "./components/products/Product-pade";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LeyoutMenu />}>
          <Route index element={<CategoryPage />}></Route>
          <Route path="/categories" element={<CategoryPage />}></Route>
          <Route path="/categories/:id" element={<ProductPage />}></Route>
          <Route path="*" element={<NotPage />}></Route>
        </Route>
      </Routes>

      <ScrollToTop />
    </>
  );
}

// const AppWrapper = styled.div``;

export default App;
