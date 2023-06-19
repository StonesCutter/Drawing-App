import { Alert, AlertButton } from "react-native";

function showAlert(title: string, message: string, okMessage: string): void {
  const okButton: AlertButton = {
    text: okMessage,
    onPress: () => console.log("OK Pressed"),
  };

  Alert.alert(title, message, [okButton]);
}

export { showAlert };
