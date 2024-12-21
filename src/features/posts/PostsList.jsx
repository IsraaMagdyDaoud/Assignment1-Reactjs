import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "./style.css";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "./slices/postsSlice";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Buttons/Button";
import UpdatePostModal from "../../Components/Modals/UpdatePostModal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
const validationSchema = Yup.object({
  title: Yup.string()
    .min(10, "must be at least 10 characters")
    .max(100, "cannot exceed 100 characters")
    .required("required"),
  body: Yup.string()
    .min(50, "must be at least 50 characters")
    .max(500, "cannot exceed 500 characters")
    .required("required"),
});
function PostsList() {
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    title: "",
    body: "",
  });

  const isEffectRun = useRef(false); // Track if effect has run
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (!isEffectRun.current) {
      dispatch(fetchPosts());
      isEffectRun.current = true;
    }
  }, [dispatch]);
  const handleAddPost = (values, { resetForm }) => {
    dispatch(addPost(values)).then(() => {
      resetForm();
      toast.success("Post added successfully");
    });
  };

  const handleDelete = (postId) => {
    console.log("Deleting post with id:", postId);
    dispatch(deletePost(postId))
      .then(() => {
        toast.success("Post deleted successfully");
      })
      .catch(() => {
        toast.error("Error deleting post");
      });
  };
  const handleShowModal = (post) => {
    // console.log(post)
    setCurrentPost(post);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleUpdatePost = (updatedValues) => {
    const updatedPostData = {
      title: updatedValues.title,
      body: updatedValues.body,
    };
    // console.log(updatedPostData);
    dispatch(
      updatePost({ id: currentPost.id, updatedData: updatedPostData })
    ).then(() => {
      setShowModal(false);
      toast.success("Post has been updated successfully");
    });
  };
  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5>
                        <Link to="/details" className="link">
                          {post.id} - {post.title}
                        </Link>
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <Button
                          color="primary"
                          icon={faEdit}
                          text="Update"
                          onClick={() => handleShowModal(post)}
                        />
                        <Button
                          color="danger"
                          icon={faTrash}
                          text="Delete"
                          onClick={() => handleDelete(post.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-lg-4">
              <div className="add-post-form">
                <Formik
                  initialValues={newPost}
                  validationSchema={validationSchema}
                  onSubmit={handleAddPost}
                >
                  {({ errors, touched, isValid, values }) => (
                    <Form>
                      <div>
                        <Field
                          type="text"
                          name="title"
                          className="form-control mb-2"
                          placeholder="Title"
                        />
                        {touched.title && errors.title && (
                          <div className="text-danger">{errors.title}</div>
                        )}
                      </div>

                      <div>
                        <Field
                          name="body"
                          as="textarea"
                          rows="4"
                          className="form-control mb-2"
                          placeholder="Body"
                        />
                        {touched.body && errors.body && (
                          <div className="text-danger">{errors.body}</div>
                        )}
                      </div>

                      <Button
                        color="success"
                        icon={faPlus}
                        text="Add Post"
                        type="submit"
                        disabled={!isValid || !values.body || !values.title}
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdatePostModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        currentPost={currentPost}
        handleChangeData={setCurrentPost}
        handleUpdatePost={handleUpdatePost}
      />
      <ToastContainer />
    </>
  );
}

export default PostsList;
