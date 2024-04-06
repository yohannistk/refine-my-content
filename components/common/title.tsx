import React from "react";

interface Props {
  title: string;
  subtitle: string;
}

const Title = ({ subtitle, title }: Props) => {
  return (
    <div className="mb-1 py-4 text-start">
      <h1 className="text-accent-foreground mb-4 text-xl font-bold md:text-4xl">
        {title}
      </h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default Title;
