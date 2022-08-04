import * as React from "react";

import { Formik } from "formik";
import NewBlogFormik from "../components/NewBlogFormik";

export default function NewBlog() {
  return (
    <Formik
      initialValues={{ title: "", imgUrl: "", content: "" }}
      onSubmit={(values, actions) => {
        alert(`${values.title},
        ${values.imgUrl}
        ${values.content}`);
        actions.resetForm();
      }}
      component={(props) => <NewBlogFormik {...props} />}
    ></Formik>
  );
}
