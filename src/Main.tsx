import React, { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { CallScreen } from "./components/CallScreen";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useGetStream } from "./services/useGetStream";

const apiKey = "k7txasr9xj4r";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY3VpZGFkb3IyNiIsImV4cCI6MTcxNTk5MTM4MiwiaWF0IjoxNzE1OTYyNTgyfQ.6h_37aRIedi9PXD1McxE0L4RhoNICSfcORWxPvPHf7Q"
const userId = "cuidador26";

const user = {
  id: userId,
  name: "cuidador",
  image: `https://getstream.io/random_png/?id=${userId}&name=Mission+Vao`,
};
const client = new StreamVideoClient({ apiKey, user, token });

const Main = () => {
  const { data } = useGetStream();

  const [state, setState] = useState({
    activeScreen: "home",
    callKey: Date.now(), // Initialize the key based on the current timestamp
  });

  const goToCallScreen = () => {
    setState((prevState) => ({
      ...prevState,
      activeScreen: "call-screen",
      callKey: Date.now(), // Update the key with a new timestamp
    }));
  };

  const goToHomeScreen = () => {
    setState((prevState) => ({
      ...prevState,
      activeScreen: "home",
    }));
  };


  console.log("data", data)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StreamVideo client={client}>
        {state.activeScreen === "call-screen" ? (
          <CallScreen goToHomeScreen={goToHomeScreen} key={state.callKey} callId={state.callKey} agentId={data?.agentId || ""} />
        ) : (
          <HomeScreen goToCallScreen={goToCallScreen} />
        )}
      </StreamVideo>
    </GestureHandlerRootView>
  );
};

export default Main;
