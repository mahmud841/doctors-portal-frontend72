import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";


//initialize firebase app here 
initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  const auth = getAuth();

//************************* */ Handle Registration Part 

  const registerUser = (email, password) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError('');
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        setAuthError(error.message);
        // ..
      })
      //finally bosate hobe catch er pore semicolon er pore
      .finally(() => setIsLoading(false));
  }
  // **********************Sign in with email and  PASSWORD 

const loginUser = (email, password, location, history) => {
  setIsLoading(true);
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const destination = location?.state?.from || '/';
    history.replace(destination);
    setAuthError('');
  })
  .catch((error) => {
    setAuthError(error.message);
    console.log(error);
    
  })
  .finally(() => setIsLoading(false));

}


// observer user state function 
/* avabe o kora jai 
onAuthStateChanged function using 
useEffect(() =>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
     setUser(user);
    } else {
      setUser({});
    }

});
},[]) */
useEffect(() =>{
   const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
     setUser(user);
    } else {
      setUser({});
    }
    setIsLoading(false)
});
return () => unsubscribe;
},[])




  const logOut = () => {
    // logout button a click korle true hobe 
    setIsLoading(true);
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    })
    .finally(() => setIsLoading(false));
    ;
  }

  return {
    user,
    isLoading,
    authError,
    registerUser,
    loginUser,
    logOut,
  }
}


export default useFirebase;