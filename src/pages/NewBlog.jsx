import { Formik } from "formik";
import NewBlogFormik from "../components/NewBlogFormik";
import { AddBlog } from "../auth/firebase";

export default function NewBlog() {
  const id = new Date().getTime();
  return (
    <Formik
      initialValues={{ title: "", imgUrl: "", content: "", id }}
      onSubmit={(values, actions) => {
        // console.log(values);
        AddBlog(values);
        actions.resetForm();
      }}
      component={(props) => <NewBlogFormik {...props} />}
    ></Formik>
  );
}
