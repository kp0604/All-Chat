import React,{createContext,useRef,useState,useEffect} from 'react'
import { auth,db } from "../firebase_config";
import {signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth"
import { collection,addDoc,serverTimestamp,query,getDocs,where } from 'firebase/firestore';

const AuthContext = createContext(null)

function AuthState({children}) {
  
  useEffect(()=>{
    let userInfo = JSON.parse(localStorage.getItem('user'))
    setCurrentuserDb(userInfo)
  },[])

  const [currentUser, setCurrentuser] = useState(null);

   const [currentUserDb, setCurrentuserDb] = useState(null);

  const getUserDb = async () => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("userUID", "==", currentUser.uid));

    const docs = await getDocs(q);
    let userInfo = {...docs.docs[0].data(),id:`${docs.docs[0].id}`}
    localStorage.setItem('user',JSON.stringify(userInfo))
    setCurrentuserDb(userInfo)
  };

  const SignInWithGoogle = async () => {
    // Sign in using a popup.
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const q = query(collection(db, "users"), where("userUID", "==", user.uid));
    const docs = await getDocs(q);
    const colRef = collection(db,'users')

    if(docs.docs.length === 0){
      let res = addDoc(colRef,{
      userUID : user.uid,
      userName : user.displayName,
      userPhoto : user.photoURL,
      userEmail : user.email,
      myServers: [],
      serversFollowed : [],
      createdAt : serverTimestamp(),
      authProvider:'google'
    })
    console.log(res)
  }
    else{
      let userInfo = {...docs.docs[0].data(),id:`${docs.docs[0].id}`}
      localStorage.setItem('user',JSON.stringify(userInfo))
      setCurrentuserDb(userInfo)
    }
     
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
  };

  onAuthStateChanged(auth, (user) => {
    setCurrentuser(user);
  });

  const SignOut = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={[SignInWithGoogle,SignOut,currentUser,currentUserDb,getUserDb]}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext,AuthState}