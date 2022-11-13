import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useDebounce from "../../app/useDebounce";
import Blog from "../../components/Blog";
import { fetchBlogs } from "../../features/blogSlice";
import { setUser } from "../../features/userSlice";
import { refreshUser } from "../../services/userServices";

export const Blogs = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(search, 1000);
  const { blogs, error } = useAppSelector((state) => state.blogR);
  useEffect(() => {
    dispatch(fetchBlogs(search));
  }, [debouncedValue, dispatch, search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
    <div className="blog">
      <main className="blog__main">
        {error && <p>Error</p>}
        <form
          className="searchBar"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="searchLabel" htmlFor="search">
            Search for a blog:
          </label>
          <input
            name="search"
            type="text"
            value={search}
            onChange={handleChange}
          />
        </form>
        <section className="blogContainer">
          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />;
          })}
        </section>
      </main>
    </div>
  );
};
