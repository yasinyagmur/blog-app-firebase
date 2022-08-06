import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  databaseURL: process.env.REACT_APP_databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Firebase Authentication and get a reference to the service
// console.log(auth);

export const createUser = async (email, password, navigate, displayName) => {
  //! new user create method firebase
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
    console.log(userCredential);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    console.log(userCredential);
  } catch (error) {
    console.log(error);
  }
};

export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user);
      setCurrentUser(user);
    } else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};
export const logOut = (navigate) => {
  signOut(auth);
  navigate("/");
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Google ile girişi enable yap
//* => Authentication => sign-in-method => Authorized domains => add domain
//! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
export const signUpProvider = (navigate) => {
  //? Google ile giriş yapılması için kullanılan firebase metodu
  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
  signInWithPopup(auth, provider)
    .then((result) => {
      navigate("/");
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};

//! ***********FİREBASE REALTİME DATABASE***********
//! Added NewBlog
export const AddBlog = (values) => {
  console.log(values);
  const auth = getAuth();

  const db = getDatabase();
  const blogRef = ref(db, "blogapp/");
  const newBlogRef = push(blogRef);
  set(newBlogRef, {
    title: values.title,
    imgurl: values.imgUrl,
    content: values.content,
    email: auth.currentUser.email,
    // id: values.id,
  });
  // console.log(auth.currentUser.email);
};

//! Get blog from database
export const useFetch = () => {
  const [blogGet, setBlogGet] = useState();
  const [isLoading, setİsLoading] = useState(true);
  useEffect(() => {
    const db = getDatabase();
    const blogRef = ref(db, "blogapp/");
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      const blogArray = [];
      for (let id in data) {
        blogArray.push({ id, ...data[id] });
      }
      setBlogGet(blogArray);
      setİsLoading(false);
    });
  }, []);
  return { blogGet, isLoading };
};

//!Delete Blog
export const deleteBlog = (id, navigate) => {
  const db = getDatabase();
  console.log(id);
  remove(ref(db, `blogapp${id}`));
  navigate("/");
};
//!Edit Blog
export const EditBlogCard = (uptadeBlog, id) => {
  const db = getDatabase();
  // console.log(editTitle);
  // console.log(id);

  const updates = {};
  updates["blogapp/" + id] = uptadeBlog;
  return update(ref(db), updates);

  // return update(ref(db, `blogapp` + id), {
  //   title: editTitle,
  //   imgurl: editImgUrl,
  //   content: editContent,
  // });
};
//! Search Blog
// export const SearchBlogs = (searchValue) => {
//   // console.log(searchValue);
//   return searchValue;
// };
