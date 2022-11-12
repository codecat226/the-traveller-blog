import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import BlogAdmin from "../../components/BlogAdmin";
import { fetchBlogs } from "../../features/blogSlice";
import { fetchUser, setUser } from "../../features/userSlice";
import { refreshUser } from "../../services/userServices";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { blogs, error, loading } = useAppSelector((state) => state.blogR);
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  //get login state
  const { isLoggedIn } = useAppSelector((state) => state.userR);
  //if the user is logged in --> call refresh token from this route too

  //use useCallback so that only rerenders on dispatch
  const handleRefresh = useCallback(async () => {
    try {
      const res = await refreshUser();
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
          return <BlogAdmin key={blog.id} blog={blog} />;
        })}
      </section>
    </main>
  );
};
