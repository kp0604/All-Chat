import React, { useContext, useEffect, createContext,useState } from "react";
import {useParams} from 'react-router-dom'
import {
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp,
    query,
    getDoc,
    getDocs,
    doc,
  } from "firebase/firestore";
  
  import { db } from "../firebase_config";

const CurSerStateContext = createContext(null);

function CurrentServerState({ children }) {
  const [curServId, setCurServId] = useState(null);
  const [curServInfo, setCurServInfo] = useState(null);

  const params = useParams()
  useEffect(()=>params&&params.serverId?(setCurServId(params.serverId),getCurServInfo()):null,[params.serverId])  

  const docRef = doc(db, "servers", `${params.serverId}`);
  const getCurServInfo = async () => {
    const docSnap = await getDoc(docRef);
    setCurServInfo(docSnap.data());
  };
  return (
    <CurSerStateContext.Provider value={[curServInfo,curServId]}>
      {children}
    </CurSerStateContext.Provider>
  );
}

export { CurSerStateContext, CurrentServerState };
