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
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";

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
    toastSuccessNotify("Registered successfully!");
    navigate("/");
    console.log(userCredential);
  } catch (error) {
    toastErrorNotify(error.message);
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
    toastSuccessNotify("Logged in successfully!");
    console.log(userCredential);
  } catch (error) {
    toastErrorNotify(error.message);
    console.log(error);
  }
};

export const userObserver = (setCurrentUser) => {
  //? Kullan??c??n??n signin olup olmad??????n?? takip eden ve kullan??c?? de??i??ti??inde yeni kullan??c??y?? response olarak d??nen firebase metodu
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
  toastSuccessNotify("Logged out successfully!");
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Google ile giri??i enable yap
//* => Authentication => sign-in-method => Authorized domains => add domain
//! Projeyi deploy ettikten sonra google sign-in ??al????mas?? i??in domain listesine deploy linkini ekle
export const signUpProvider = (navigate) => {
  //? Google ile giri?? yap??lmas?? i??in kullan??lan firebase metodu
  const provider = new GoogleAuthProvider();
  //? A????l??r pencere ile giri?? yap??lmas?? i??in kullan??lan firebase metodu
  signInWithPopup(auth, provider)
    .then((result) => {
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    })
    .catch((error) => {
      toastWarnNotify(error.message);
      // Handle Errors here.
    });
};

//! ***********F??REBASE REALT??ME DATABASE***********
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
    creative: auth.currentUser.displayName,
    // id: values.id,
  });
  toastSuccessNotify("New blog creation successful");

  // console.log(auth.currentUser.email);
};

//! Get blog from database
export const useFetch = () => {
  const [blogGet, setBlogGet] = useState();
  const [isLoading, set??sLoading] = useState(true);
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
      set??sLoading(false);
    });
  }, []);
  return { blogGet, isLoading };
};

//!Delete Blog
export const deleteBlog = (id, navigate) => {
  const db = getDatabase();
  console.log(id);
  remove(ref(db, `blogapp/${id}`));
  navigate("/");
  toastSuccessNotify("Blog successfully deleted");
};
//!Edit Blog
export const EditBlogCard = (uptadeBlog, id) => {
  const db = getDatabase();
  // console.log(editTitle);
  // console.log(id);

  const updates = {};
  updates["blogapp/" + id] = uptadeBlog;
  toastSuccessNotify("Blog updated");

  return update(ref(db), updates);
};
