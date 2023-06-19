import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { styles } from "./buttonStyle";

//Icons
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  iconName: string;
}

function CustomButton({ onPress, iconName }: Props) {
  let icon = null;
  switch (iconName) {
    case "undo":
      icon = <Ionicons name="arrow-undo" size={24} color="white" />;
      break;
    case "redo":
      icon = <Ionicons name="arrow-redo" size={24} color="white" />;
      break;
    case "erase":
      icon = <FontAwesome5 name="eraser" size={24} color="white" />;
      break;
    case "draw":
      icon = <FontAwesome5 name="paint-brush" size={24} color="white" />;
      break;
    case "delete":
      icon = <MaterialIcons name="delete" size={24} color="white" />;
      break;
    case "menu":
      icon = <Ionicons name="ios-menu" size={36} color="white" />;
      break;
    case "closeMenu":
      icon = <Ionicons name="arrow-back-sharp" size={36} color="white" />;
      break;
    case "imageBackground":
      icon = (
        <MaterialCommunityIcons name="image-plus" size={24} color="white" />
      );
      break;
    case "photoBackground":
      icon = <MaterialIcons name="add-a-photo" size={24} color="white" />;
      break;
    case "clearBackground":
      icon = (
        <MaterialCommunityIcons name="sticker-remove" size={24} color="white" />
      );
      break;
    case "save":
      icon = <Ionicons name="save" size={24} color="white" />;
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity style={styles.topButton} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
}

export default CustomButton;
