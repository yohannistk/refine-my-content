import { UseCase as UseCaseType } from "@/custom";
import React from "react";

interface Props {
  useCase: UseCaseType[];
}
const UseCase = (props: Props) => {
  return (
    <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
      {props.useCase.map((use) => {
        return (
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xl font-bold">{use.title}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {use.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default UseCase;
