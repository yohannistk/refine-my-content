import React from "react";

interface Props {
  title: string;
  subtitle: string;
}

const Title = ({ subtitle, title }: Props) => {
  return (
    <div className="my-9 mb-1 pb-4 pt-10 ">
      <h1 className="text-accent-foreground mb-4 text-xl font-bold md:text-4xl">
        {title}
      </h1>
      <p className="text-muted-foreground text-lg">{subtitle}</p>
    </div>
  );
};

export default Title;
