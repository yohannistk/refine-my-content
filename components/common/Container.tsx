import React, { PropsWithChildren } from "react";

const Container = (props: PropsWithChildren) => {
  return (
    <div className="container mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:my-4">
      {props.children}
    </div>
  );
};

export default Container;
