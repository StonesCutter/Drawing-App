import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { colors } from "../../utils/palette";

const webStyle = `
.m-signature-pad {
    flex: 1;
  position: fixed;
  font-size: 10px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right:0;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
}
`;

const styles = StyleSheet.create({
  container: {
    //paddingTop: 50,
    backgroundColor: "white",
    position: "absolute",
    top: 10000,
  },
  preview: {
    width: width,
    height: height,
  },
  previewBackground: {
    width: width,
    height: height,
  },
  button: {
    position: "relative",
  },
  palette: {
    position: "relative",
    width: "90%",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  modal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  topButtonsContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    backgroundColor: colors.light,
  },
  topButtonsContainerLeft: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  topButtonsContainerRight: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 5,
    paddingRight: 5,
  },
  topButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: colors.dark_moderate,
  },
  topModalMenu: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 30,
  },
  topModalMenuLeft: {
    flexDirection: "row",
    width: "30%",
  },
  topModalMenuRight: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-around",
  },
  viewTutorialButton: {
    marginTop: 90,
  },
});

export { webStyle, styles };
