import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

//Components
import Sign from "../../components/sign/Sign";

function DrawingBoard() {
  const [signature, setSignature] = useState("");

  const handleSignOK = (signature: string) => {
    setSignature(signature);
  };

  return (
    <View style={styles.container}>
      <Sign text="Please sign below" onOK={handleSignOK} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DrawingBoard;
