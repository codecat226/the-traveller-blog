import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BlogProps } from "../types/types";

const BlogAdmin = (props: BlogProps) => {
  const { title, author, publishDate, body } = props.blog;
  const { blog } = props;
  const navigate = useNavigate();
  const handleEdit = (blog: BlogProps) => {
    try {
      navigate("/edit-blog", { state: blog });
    } catch (error) {
      toast.error("Cannot edit blog");
    }
  };

  const handleDelete = (blog: BlogProps) => {
    try {
      navigate("/delete-blog", { state: blog });
    } catch (error) {
      console.log(error);
      toast.error("Cannot delete blog");
    }
  };

  return (
    <>
      <ToastContainer />
      <article className="blogContainer__item">
        <h2>{title}</h2>
        <h3>{author}</h3>
        <p>{publishDate}</p>
        <p>{body}</p>
        <button
          onClick={() => {
            handleEdit({ blog });
          }}
        >
          Edit this blog
        </button>
        <button
          onClick={() => {
            handleDelete({ blog });
          }}
        >
          Delete this blog
        </button>
      </article>
    </>
  );
};

export default BlogAdmin;
