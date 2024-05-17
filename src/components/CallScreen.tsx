import React, { useEffect } from "react";
import {
  Call,
  StreamCall,
  useStreamVideoClient,
  CallContent,
} from "@stream-io/video-react-native-sdk";
import { Button, Text, View, StyleSheet } from "react-native";
import { CallStateValue } from "./CallStateValue";

type Props = { goToHomeScreen: () => void; callId: number; agentId: string };

export const CallScreen = ({ goToHomeScreen, callId, agentId }: Props) => {
  const [call, setCall] = React.useState<Call | null>(null);
  const [members, setMembers] = React.useState([{ user_id: "cuidador26" }, { user_id: "web4" }]);
  const client = useStreamVideoClient();

  useEffect(() => {
    console.log("members", members);
    const call = client.call("default", callId.toString());
    call
      .getOrCreate({
        ring: true,
        data: { members: [{ user_id: "cuidador26" }, { user_id: "web4" }] },
      })
      .then(() => setCall(call));
  }, [client, members]);

  const addMember = async (newMemberId) => {
    if (call) {
      await call.updateCallMembers({
        update_members: [{ user_id: newMemberId },{ user_id: "cuidador26" }, { user_id: "web4" }],
      });
      // setMembers([...members, { user_id: newMemberId }]);
    }
  };

  if (!call) {
    return <Text>Joining call...</Text>;
  }

  return (
    <StreamCall call={call}>
      <View style={styles.container}>
        <Text style={styles.text}>Here we will add Video Calling UI</Text>
        <CallStateValue />
        <Button
          title="Go back"
          onPress={() => {
            goToHomeScreen(), call.endCall();
          }}
        />
        <Button
          title="Add Member"
          onPress={() => addMember("paciente12")}
        />
        <CallContent onHangupCallHandler={goToHomeScreen} />
      </View>
    </StreamCall>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
