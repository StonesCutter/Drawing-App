import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerResult } from "expo-image-picker/build/ImagePicker.types";
import { captureRef } from "react-native-view-shot";
import { View, LayoutChangeEvent } from "react-native";

//Utils
import { showAlert } from "../generalUtils";

type MyState = {
  image: string;
  showModal: boolean;
  bgPicture: string;
  width: number;
  yTopBar: number;
  yBottomBar: number;
  colourBrush: string;
  sizeBrush: number;
  bgColor: string;
};

type MySetState = React.Dispatch<React.SetStateAction<MyState>>;

async function saveImageToGallery(base64Image: string) {
  if (!base64Image) {
    console.log("No base64 image provided.");
    return;
  }

  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Media library permission not granted.");
      return;
    }

    let pureBase64Encoded = base64Image.substring(base64Image.indexOf(","));

    const { uri } = await ImageManipulator.manipulateAsync(
      `data:image/png;base64,${pureBase64Encoded}`,
      [],
      { compress: 0.7, format: ImageManipulator.SaveFormat.PNG }
    );

    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.createAlbumAsync("Drawings", asset, false);

    const assets: MediaLibrary.PagedInfo<MediaLibrary.Asset> =
      await MediaLibrary.getAssetsAsync({ album: album.id });

    const assetData = assets.totalCount > 0 ? assets.assets[0] : null;
    const albumPath = assetData
      ? assetData.uri.substring(0, assetData.uri.lastIndexOf("/"))
      : "file:///storage/emulated/0/Pictures";

    showAlert("image uploaded", "Image saved to gallery successfully", "OK");
  } catch (error) {
    showAlert(
      "Error while uploading",
      "Error while saving image to gallery, try again later",
      "OK"
    );
    console.log("Error saving image to gallery:", error);
  }
}

async function pickImage() {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [2, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    console.log("result succeded");
    let base64Picture = await urlToBase64(result.assets[0].uri);
    return base64Picture;
  }
}

async function urlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("Error: Unable to convert image to base64");
      }
    };
    reader.onerror = () => {
      reject("Error: Unable to convert image to base64");
    };
    reader.readAsDataURL(blob);
  });
}

async function takePicture(): Promise<string | undefined> {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission not granted");
      return;
    }

    const image: ImagePickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      base64: false,
      exif: true,
    });

    if (image.canceled !== true && image.assets.length > 0) {
      const asset = image.assets[0];
      const fileUri = asset.uri;
      let base64Picture = await urlToBase64(fileUri);
      return base64Picture;
    }
  } catch (error) {
    console.error(error);
  }
}

function showModal(
  state: MyState,
  setState: MySetState,
  isColorBrushChanged: boolean,
  brushSize: number,
  colorSelected: string
) {
  let value = state.showModal;
  let colorBrushChanged = isColorBrushChanged;
  let previousBrushColor = state.colourBrush;
  isColorBrushChanged = false;
  console.log(
    "colorBrushChanged :",
    colorBrushChanged,
    "isColorBrushChanged :",
    isColorBrushChanged
  );
  setState({
    ...state,
    showModal: !value,
    sizeBrush: brushSize,
    colourBrush: colorBrushChanged ? colorSelected : previousBrushColor,
  });
}

async function storeImagePicked(state: MyState, setState: MySetState) {
  let img = "";
  let imgPicked = await pickImage();
  if (imgPicked !== null && imgPicked !== undefined) {
    img = imgPicked;
  }

  console.log("Immagine bg scelta: ", img);
  setState({
    ...state,
    bgPicture: img,
  });
}

function takeScreenshot(viewRef: React.RefObject<View>) {
  captureRef(viewRef, {
    format: "jpg",
    quality: 0.8,
    result: "base64",
  }).then(
    (base64) => {
      console.log("Image saved to", base64);
      saveImageToGallery(base64);
    },
    (error) => console.error("Oops, snapshot failed", error)
  );
}

async function handleSizes(
  state: MyState,
  setState: MySetState,
  topBarRef: React.RefObject<View>,
  bottomBarRef: React.RefObject<View>,
  event: LayoutChangeEvent
) {
  let bottomY = 0;
  let topY = 0;
  const { width } = event.nativeEvent.layout;

  const topBarPromise = new Promise<void>((resolve) => {
    topBarRef.current?.measureInWindow((x, y, width, height) => {
      topY = y + height;
      resolve();
    });
  });

  const bottomBarPromise = new Promise<void>((resolve) => {
    bottomBarRef.current?.measureInWindow((x, y, width, height) => {
      bottomY = y;
      resolve();
    });
  });

  await Promise.all([topBarPromise, bottomBarPromise]);

  setState({
    ...state,
    width: width,
    yTopBar: topY,
    yBottomBar: bottomY,
  });
}

async function shootBackgroundPicture(state: MyState, setState: MySetState) {
  let pictureTaken = "";
  const pictureShot = await takePicture();
  console.log("picture taken", pictureShot);
  if (typeof pictureShot === "undefined") {
    pictureTaken = "";
  } else {
    pictureTaken = pictureShot;
  }

  setState({
    ...state,
    bgPicture: pictureTaken,
  });
}

export {
  saveImageToGallery,
  takePicture,
  showModal,
  storeImagePicked,
  takeScreenshot,
  handleSizes,
  shootBackgroundPicture,
};
