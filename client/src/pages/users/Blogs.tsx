import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useDebounce from "../../app/useDebounce";
import Blog from "../../components/Blog";
import Pagination from "../../components/Pagination";
import { fetchBlogs } from "../../features/blogSlice";
import { setUser } from "../../features/userSlice";
import { refreshUser } from "../../services/userServices";

export const Blogs = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(search, 1000);
  const { blogs, error } = useAppSelector((state) => state.blogR);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(2);
  const indexLast = currentPage * postsPerPage;
  const indexFirst = indexLast - postsPerPage;
  const currentPosts = blogs.slice(indexFirst, indexLast);
  const totalPosts: number = blogs.length;
  const { isLoggedIn } = useAppSelector((state) => state.userR);

  //pagination function
  const paginate = (pageN: number): void => {
    setCurrentPage(pageN);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchBlogs(search));
  }, [debouncedValue, dispatch, search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
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
          {currentPosts.map((blog) => {
            return <Blog key={blog.id} blog={blog} />;
          })}
        </section>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={totalPosts}
          paginate={paginate}
        />
      </main>
    </div>
  );
};
