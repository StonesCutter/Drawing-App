import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  topButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modalX: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

export { styles };
