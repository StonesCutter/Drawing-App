import React, { useRef, FC, useState, useEffect } from "react";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  Text,
  LayoutChangeEvent,
  Button,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

//Utils
import {
  storeImagePicked,
  shootBackgroundPicture,
  showModal,
  takeScreenshot,
  handleSizes,
} from "../../utils/signUtils/signUtils";
import customEventBus from "../../customEventBus/customEventBus";
import { setStorage } from "../../utils/asyncStorageUtils";

//Style
import { webStyle, styles } from "./signStyle";

//Components
import ColorPalette from "../classComponents/colorPalette/ColorPalette";
import CustomButton from "../button/Button";

interface SignProps {
  text: string;
  onOK(signature: string): void;
}

interface State {
  image: string;
  showModal: boolean;
  bgPicture: string;
  width: number;
  yTopBar: number;
  yBottomBar: number;
  colourBrush: string;
  sizeBrush: number;
  bgColor: string;
}

type MyEventData = {
  id: number;
  name: string;
};

let listenerDeleted = (event: Event) => console.log("Listener deleted");
let colorSelected = "#000000";
let colorBackground = "#FFFFFF";
let brushSize = 1;
let isColorBrushChanged = false;

const Sign: FC<SignProps> = ({ text, onOK }) => {
  const ref = useRef<SignatureViewRef>(null);
  const viewRef = useRef<View>(null);
  const topBarRef = useRef<View>(null);
  const bottomBarRef = useRef<View>(null);

  const [state, setState] = useState<State>({
    image: "https://reactnative.dev/img/tiny_logo.png",
    showModal: false,
    bgPicture: "",
    bgColor: "#FFFFFF",
    width: 0,
    yTopBar: 0,
    yBottomBar: 0,
    colourBrush: "#000000",
    sizeBrush: 1,
  });

  const handleOK = (signature: string) => {
    onOK(signature);
    setState({
      ...state,
      image: signature,
    });
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  function handleClear() {
    console.log("clear success!");
  }

  const handleEnd = () => {
    ref.current?.readSignature();
  };

  const handleData = (data: string) => {};

  function handleUndo() {
    ref.current?.undo();
  }

  function handleRedo() {
    ref.current?.redo();
  }

  function handleChangeColor() {
    ref.current?.changePenColor(state.colourBrush);
  }

  function handleChangeSize() {
    ref.current?.changePenSize(state.sizeBrush, state.sizeBrush);
  }

  function handleErase() {
    ref.current?.erase();
  }

  function handleDraw() {
    ref.current?.draw();
  }

  function clearAll() {
    ref.current?.clearSignature();
  }

  function handleTakeScreenshot() {
    takeScreenshot(viewRef);
  }

  function handleShowModal() {
    showModal(state, setState, isColorBrushChanged, brushSize, colorSelected);
  }

  function handleStoreImagePicked() {
    storeImagePicked(state, setState);
  }

  function handleHandleSize(event: LayoutChangeEvent) {
    handleSizes(state, setState, topBarRef, bottomBarRef, event);
  }

  function handleShootBackgroundPicture() {
    shootBackgroundPicture(state, setState);
  }
  async function clearBackgroundPicture() {
    setState({
      ...state,
      bgPicture: "",
    });
  }

  function changeBrushSize(value: number | number[]) {
    const size = Array.isArray(value) ? value[0] : value;
    brushSize = size;
  }

  function viewTutorial() {
    setStorage(false, "tutorial");
  }

  useEffect(() => {
    customEventBus.on<MyEventData>("changeColorEvent", (data: MyEventData) => {
      isColorBrushChanged = true;
      colorSelected = data.toString();
    });

    customEventBus.on<MyEventData>(
      "changeBackgroundColorEvent",
      (data: MyEventData) => {
        colorBackground = data.toString();
      }
    );

    return () => {
      customEventBus.remove("changeColorEvent", listenerDeleted);
      customEventBus.remove("changeBackgroundColorEvent", listenerDeleted);
    };
  }, []);

  useEffect(() => {
    console.log("cambiato lo stato");
    handleChangeColor();
    handleChangeSize();
  }, [state]);

  return (
    <>
      <View style={styles.topButtonsContainer} ref={topBarRef}>
        <View style={styles.topButtonsContainerLeft}>
          <CustomButton onPress={handleUndo} iconName={"undo"} />
          <CustomButton onPress={handleRedo} iconName={"redo"} />
          <CustomButton onPress={handleErase} iconName={"erase"} />
          <CustomButton onPress={handleDraw} iconName={"draw"} />
          <CustomButton onPress={clearAll} iconName={"delete"} />
        </View>
        <View style={styles.topButtonsContainerRight}>
          <CustomButton onPress={handleShowModal} iconName={"menu"} />
        </View>
      </View>

      {state.bgPicture !== "" && (
        <SignatureScreen
          ref={ref}
          onEnd={handleEnd}
          onOK={handleOK}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onGetData={handleData}
          descriptionText={text}
          penColor={state.colourBrush}
          bgSrc={state.bgPicture}
          bgWidth={state.width}
          bgHeight={state.yBottomBar - state.yTopBar}
          webStyle={webStyle}
        />
      )}

      {state.bgPicture === "" && (
        <SignatureScreen
          ref={ref}
          onEnd={handleEnd}
          onOK={handleOK}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onGetData={handleData}
          descriptionText={text}
          penColor={state.colourBrush}
          backgroundColor={"white"}
          webStyle={webStyle}
        />
      )}
      <View ref={bottomBarRef}></View>
      <View ref={viewRef} style={styles.container}>
        {state.bgPicture !== "" && (
          <Image
            style={styles.previewBackground}
            source={{
              uri: state.bgPicture,
            }}
          />
        )}

        {state.bgPicture === "" && (
          <Image
            style={styles.previewBackground}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Wolf%E2%80%93Lundmark%E2%80%93Melotte_%28transparent_background%29.png/1200px-Wolf%E2%80%93Lundmark%E2%80%93Melotte_%28transparent_background%29.png",
            }}
          />
        )}

        <Image
          style={[styles.preview, { position: "absolute", zIndex: 1 }]}
          source={{
            uri: state.image,
          }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={state?.showModal}
      >
        <TouchableOpacity style={styles.modalBackground}>
          <View style={styles.modal} onLayout={handleHandleSize}>
            <View style={styles.topModalMenu}>
              <View style={styles.topModalMenuLeft}>
                <CustomButton
                  onPress={handleShowModal}
                  iconName={"closeMenu"}
                />
              </View>
              <View style={styles.topModalMenuRight}>
                <CustomButton
                  onPress={handleStoreImagePicked}
                  iconName={"imageBackground"}
                />
                <CustomButton
                  onPress={handleShootBackgroundPicture}
                  iconName={"photoBackground"}
                />
                <CustomButton
                  onPress={clearBackgroundPicture}
                  iconName={"clearBackground"}
                />
                <CustomButton
                  onPress={handleTakeScreenshot}
                  iconName={"save"}
                />
              </View>
            </View>
            <Text style={styles.modalText}>Brush size</Text>
            <View style={styles.palette}>
              <Slider
                value={state.sizeBrush}
                onValueChange={(value) => changeBrushSize(value)}
                step={1}
                minimumValue={1}
                maximumValue={20}
              />

              <ColorPalette />
              <View style={styles.viewTutorialButton}>
                <Button
                  title={"View again the tutorial"}
                  onPress={viewTutorial}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default Sign;
