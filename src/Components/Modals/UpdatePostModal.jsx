import React from "react";
import "./style.css";
import Button from "../../Components/Buttons/Button";
import Modal from "react-bootstrap/Modal";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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
function UpdatePostModal({
  showModal,
  handleCloseModal,
  currentPost,
  handleChangeData,
  handleUpdatePost,
}) {
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPost.id} - {currentPost.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              title: currentPost.title,
              body: currentPost.body,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleUpdatePost(values);
            }}
          >
            {({ errors, touched, isValid, values }) => (
              <Form>
                <div className="edit-post-form">
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
                  <div className="modalFooter">
                    <Button
                      color="secondary"
                      icon={faClose}
                      text="Close"
                      onClick={handleCloseModal}
                    />
                    <Button
                      color="primary"
                      icon={faEdit}
                      text="Update"
                      type="submit"
                      disabled={!isValid || !values.title || !values.body}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdatePostModal;
