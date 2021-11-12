import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signOut, onAuthStateChanged, signInWithEmailAndPassword, getIdToken } from "firebase/auth";


//initialize firebase app here 
initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState('');

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  //************************* */ Handle Registration Part 

  const registerUser = (email, password, name, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError('');
        const newUser = { email, displayName: name };
        setUser(newUser);

        // save user to the database 
        saveUser(email, name, 'POST');
        // send name to firebase after creation 
        updateProfile(auth.currentUser, {
          displayName: name,
        }).catch((error) => {
        });
        history.replace('/');
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

  //*********************Google sign In Set-up

  const signInWithGoogle = (location, history) => {
    setIsLoading(true)
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.email, user.displayName, 'PUT');
        setAuthError('');

        const destination = location?.state?.from || '/';
        history.replace(destination);

      }).catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));;
  }


  //***********observer user state function**************** 
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // *********GET JWT TOKEN*************
        getIdToken(user)
        .then(idToken => {
          // console.log(idToken);
          setToken(idToken);
          
        })
      } else {
        setUser({});
      }
      setIsLoading(false)
    });
    return () => unsubscribe;
  }, [])

//**************Data load for admin  */

useEffect(() => {
  fetch(`http://localhost:5000/users/${user.email}`)
  .then(res => res.json())
  .then(data => setAdmin(data.admin))
},[user.email])

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

//************ */
const saveUser = (email, displayName, method) => {
  const user = {email, displayName};
  fetch('http://localhost:5000/users',{
    method: method,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then()

}

  return {
    user,
    admin,
    token,
    isLoading,
    authError,
    registerUser,
    signInWithGoogle,
    loginUser,
    logOut,
  }
}


export default useFirebase;