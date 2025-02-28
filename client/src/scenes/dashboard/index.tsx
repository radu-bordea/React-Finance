import { Box, useMediaQuery } from "@mui/material";
import Charts from "./charts";
import Predictions from "./predictions";

// grid layout for desktop
const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b c"
  "d d d"
  "d d d"
  "d d d"
  "d d d"
  "d d d"
  "d d d"
`;

//grid layout for mobile
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "60px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Charts />
      <Predictions />
    </Box>
  );
};

export default Dashboard;
