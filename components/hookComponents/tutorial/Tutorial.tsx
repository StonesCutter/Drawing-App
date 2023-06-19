import React, { useState, FC } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

//Images
import DrawingBoard from "../../../screens/drawingBoard/DrawingBoard";
import tutorial1 from "../../../assets/images/tutorial/tutorial1.jpg";
import tutorial2 from "../../../assets/images/tutorial/tutorial2.jpg";
import tutorial3 from "../../../assets/images/tutorial/tutorial3.jpg";

//Style
import { styles } from "./tutorialStyle";

interface Slide {
  key: number;
  title: string;
  text: string;
  image: any;
  backgroundColor: string;
}

interface TutorialProps {
  callbackInput: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

const slides: Slide[] = [
  {
    key: 1,
    title: "Draw what you want",
    text: "Choose the brush, the eraser and customize them from the menu",
    image: tutorial1,
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Customize your painting",
    text: "Customize your brush or set a background image",
    image: tutorial2,
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Gallery",
    text: "Admire your masterpieces!",
    image: tutorial3,
    backgroundColor: "#22bcb5",
  },
];

const Tutorial: FC<TutorialProps> = ({ callbackInput }) => {
  const [showRealApp, setShowRealApp] = useState<boolean>(false);

  const renderItem = ({ item }: { item: Slide }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={{ height: 400, width: 200 }} />
        <Text style={styles.text}>{item.text}</Text>
        {item.title === "Gallery" && (
          <Button onPress={callbackInput} title="Continue" />
        )}
      </View>
    );
  };

  const handleDone = () => {
    setShowRealApp(true);
  };

  if (showRealApp) {
    return <DrawingBoard />;
  } else {
    return (
      <AppIntroSlider<Slide>
        renderItem={renderItem}
        data={slides}
        onDone={handleDone}
      />
    );
  }
};

export default Tutorial;
