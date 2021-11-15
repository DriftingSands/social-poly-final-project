import React from "react";
import PostCreation from "../../Components/PostCreation/PostCreation";
import { PostsPageWrapper } from "./PostStyles";
import { useTheme } from "@mui/material/styles";

export default function Posts() {
  const theme = useTheme();
  return (
    <PostsPageWrapper theme={theme}>
      <PostCreation />
    </PostsPageWrapper>
  );
}
