import { Formik } from "formik";
import NewBlogFormik from "../components/NewBlogFormik";
import { AddBlog } from "../auth/firebase";

export default function NewBlog() {
  return (
    <Formik
      initialValues={{ title: "", imgUrl: "", content: "" }}
      onSubmit={(values, actions) => {
        // console.log(values);
        AddBlog(values);
        actions.resetForm();
      }}
      component={(props) => <NewBlogFormik {...props} />}
    ></Formik>
  );
}
