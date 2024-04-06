import Container from "@/components/common/Container";
import { features } from "@/data/app_data";
import React from "react";
import SingleApp from "../components/single-app";

const DashBoard = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {features.map((feature) => {
          return <SingleApp feature={feature} />;
        })}
      </div>
    </Container>
  );
};

export default DashBoard;
