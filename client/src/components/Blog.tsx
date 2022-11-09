import React from "react";
import { BlogProps } from "../types/types";

const Blog = (props: BlogProps) => {
  const { title, author, publishDate, body } = props.blog;
  return (
    <article className="blogContainer__item">
      <h2>{title}</h2>
      <h3>{author}</h3>
      <p>{publishDate}</p>
      <p>{body}</p>
    </article>
  );
};

export default Blog;
