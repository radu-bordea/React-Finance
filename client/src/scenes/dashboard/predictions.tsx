import DashboardBox from "@/components/DashboardBox";
import { useTheme } from "@emotion/react";
import { useState } from "react";

type Props = {};

const Predictions = (props: Props) => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);

  return (
    <>
      <DashboardBox gridArea="d"></DashboardBox>
    </>
  );
};

export default Predictions;
