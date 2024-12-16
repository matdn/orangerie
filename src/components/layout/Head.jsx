import React from "react";
import { HeadProvider, Title, Meta, Link } from "react-head";

const Head = ({ title, description, favicon }) => {
  
  return (
    <HeadProvider>
      <Meta charSet="UTF-8" />
      <Title>{title || "Emeraude Escape"}</Title>
      <Meta name="description" content={description || ""} />
      <Meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <Link rel="icon" href={favicon} />
    </HeadProvider>
  )
};

export default Head;
