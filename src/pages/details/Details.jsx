import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../features/posts/slices/postsSlice";
import styles from "./Details.module.css";
function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts]);

  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsBox}>
        <h1 className={styles.detailsTitle}>{post.title}</h1>
        <p className={styles.detailsBody}>{post.body}</p>
      </div>
    </div>
  );
}

export default Details;
