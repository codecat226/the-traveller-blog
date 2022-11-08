import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchBlogs } from "../features/blogSlice";

export const Blogs = () => {
  const dispatch = useAppDispatch();
  const { blogs, error, loading } = useAppSelector((state) => state.blogR);
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  console.log(blogs);
  return (
    <main>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {blogs.map((blog) => {
        return <p>{blog.author}</p>;
      })}
    </main>
  );
};
