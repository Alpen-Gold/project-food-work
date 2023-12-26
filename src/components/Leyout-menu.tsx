import styled from "@emotion/styled";

// icons

import { Outlet } from "react-router-dom";
import SliderMenu from "./Slider-menu";
import React, { useEffect, useState } from "react";
import { useSize } from "ahooks";
import MenuLeyout from "./responsive-menu";

function LeyoutMenu() {
  const ref = React.useRef(null);
  const size = useSize(ref);

  const [ekranSize, setEkranSize] = useState(size?.width);

  console.log(size?.width);

  useEffect(() => {
    setEkranSize(size?.width);
  }, [size?.width]);
  return (
    <AdminLeyoutWrapper ref={ref}>
      <div className="app-container">
        {/* Slider page */}
        {ekranSize !== undefined && ekranSize < 1010 ? <MenuLeyout /> : null}

        <SliderMenu />
        {/* Slider page end */}

        {/* Outlet All Pages  */}
        <Outlet />
        {/* Outlet All Pages end */}
      </div>
    </AdminLeyoutWrapper>
  );
}

const AdminLeyoutWrapper = styled.div`
  //  style...
`;

export default LeyoutMenu;
