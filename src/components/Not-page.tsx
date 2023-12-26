import styled from "@emotion/styled";
import { Box } from "@mui/material";

function NotPage() {
  return (
    <CateogryPageWrapper className="app-content">
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        not Page
      </Box>
    </CateogryPageWrapper>
  );
}

export default NotPage;

const CateogryPageWrapper = styled.div``;
