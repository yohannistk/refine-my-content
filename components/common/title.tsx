import React from "react";

interface Props {
  title: string;
  subtitle: string;
}

const Title = ({ subtitle, title }: Props) => {
  return (
    <div className="my-9 mb-1 pb-4 pt-10 text-center">
      <h1 className="text-accent-foreground mb-4 text-xl font-medium md:text-4xl">
        {title}
      </h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default Title;
