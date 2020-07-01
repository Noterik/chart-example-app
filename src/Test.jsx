import React from "react";
import { useTheme } from "styled-components";

const Test = () => {
  const theme = useTheme();

  console.log("theme = " ,theme);

  return <span>test</span>
}

export default Test;