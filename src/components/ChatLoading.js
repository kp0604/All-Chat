import React from 'react'
import {Box,Skeleton} from '@mui/material'

export default function ChatLoading() {
   
   let arr = [] 

  for(let i = 0; i<=5;i++){
      arr.push(<Box display='inline-flex' width="100%">
      <Skeleton variant="circular" width={40} height={40} sx={{mr:2}}/>
      <Box width="100%">
      <Skeleton variant="text" width={'100%'} />
      <Skeleton variant="text" width={'70%'} />
      </Box>
    </Box>)
  }  

  return arr
}
