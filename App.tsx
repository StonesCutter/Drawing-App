import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Components
import DrawingBoard from "./screens/drawingBoard/DrawingBoard";
import ImageGallery from "./components/hookComponents/imageGallery/ImageGallery";
import Tutorial from "./components/hookComponents/tutorial/Tutorial";

//Utils
import { colors } from "./utils/palette";
import { setStorage, getStorage } from "./utils/asyncStorageUtils";

interface State {
  tutorialEnded: boolean;
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [state, setState] = useState<State>({
    tutorialEnded: false,
  });

  let tutorialFromStorage = null;

  async function initializeLocalStorage() {
    //let dataFromStorage = await getData();
    tutorialFromStorage = await getStorage("tutorial");
    tutorialFromStorage.data === false
      ? await setStorage(false, "tutorial")
      : console.log("Local storage tutorial esiste già");

    //console.log("tutorialFromStorageInit:", tutorialFromStorage);

    setState({
      ...state,
      tutorialEnded: tutorialFromStorage !== null ? tutorialFromStorage : false,
    });
  }

  function endTutorial() {
    setState({
      ...state,
      tutorialEnded: true,
    });
  }

  useEffect(() => {
    if (!state.tutorialEnded) {
      initializeLocalStorage();
    }
    if (state.tutorialEnded) {
      setStorage(state.tutorialEnded, "tutorial");
    }
  }, [state.tutorialEnded]);

  return (
    <View style={styles.container}>
      {!state.tutorialEnded && <Tutorial callbackInput={endTutorial} />}
      <StatusBar style="auto" />
      {state.tutorialEnded && (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: true,
              tabBarActiveTintColor: colors.dark_moderate,
              tabBarInactiveTintColor: colors.dark,
              tabBarActiveBackgroundColor: colors.light,
              tabBarInactiveBackgroundColor: colors.standard,
            }}
            initialRouteName="DrawingBoard"
          >
            <Tab.Screen
              name="DrawingBoard"
              component={DrawingBoard}
              options={{
                headerShown: true,
                title: "Drawing Board",
                tabBarIcon: () => (
                  <Entypo name="round-brush" size={36} color={colors.dark} />
                ),
              }}
            />

            <Tab.Screen
              options={{
                headerShown: true,
                title: "Image Gallery",
                tabBarIcon: () => (
                  <MaterialCommunityIcons
                    name="view-gallery"
                    size={36}
                    color={colors.dark}
                  />
                ),
              }}
              name="ImageGallery"
              component={ImageGallery}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
