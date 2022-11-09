import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Blog from "../components/Blog";
import { fetchBlogs } from "../features/blogSlice";
import { setUser } from "../features/userSlice";
import { refreshToken } from "../services/userServices";

export const Blogs = () => {
  const dispatch = useAppDispatch();
  const { blogs, error, loading } = useAppSelector((state) => state.blogR);
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  //get login state
  const { isLoggedIn } = useAppSelector((state) => state.userR);
  //if the user is logged in --> call refresh token from this route too

  //use useCallback so that only rerenders on dispatch
  const handleRefresh = useCallback(async () => {
    try {
      const res = await refreshToken();
      dispatch(setUser(res.foundUser));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        handleRefresh();
      }, 1000 * 20);
      return () => clearInterval(interval);
    }
  }, [dispatch, handleRefresh, isLoggedIn]);

  return (
    <main className="blog">
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <section className="blogContainer">
        {blogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
      </section>
    </main>
  );
};
