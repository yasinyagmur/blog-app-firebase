import { Formik } from "formik";
import NewBlogFormik from "../components/NewBlogFormik";
import { AddBlog } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

export default function NewBlog() {
  const id = new Date().getTime();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ title: "", imgUrl: "", content: "", id }}
      onSubmit={(values, actions) => {
        // console.log(values);
        AddBlog(values);
        actions.resetForm();
        navigate("/");
      }}
      component={(props) => <NewBlogFormik {...props} />}
    ></Formik>
  );
}
