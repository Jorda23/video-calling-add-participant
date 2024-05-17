import { CallingState, useCallStateHooks } from '@stream-io/video-react-native-sdk';
import React, { useEffect } from 'react'

export const CallStateValue = () => {
    const { useCallCallingState } = useCallStateHooks();

    const callingState = useCallCallingState();



    useEffect(() => {
        console.log("callingState---->", callingState);

    }, [callingState])
    
  return (
    <></>
  )
}
