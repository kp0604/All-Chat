import React, { useContext, useEffect, createContext,useState } from "react";
import {useParams} from 'react-router-dom'

const CurChanStateContext = createContext(null);

function CurrentChannelState({ children }) {

  const [curChanId, setCurChanId] = useState(null);
  const [loadingChat,setloadingChat] = useState(false)

  const params = useParams()

  useEffect(()=> params&&params.channelId?(setCurChanId(params.channelId)):setCurChanId(null),[params.channelId])

  return (
    <CurChanStateContext.Provider value={[curChanId,setloadingChat,loadingChat]}>
      {children}
    </CurChanStateContext.Provider>
  );
}

export { CurChanStateContext, CurrentChannelState };