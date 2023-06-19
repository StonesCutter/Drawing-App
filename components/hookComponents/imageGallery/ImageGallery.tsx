import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./imageGalleryStyle";
//Utils

interface ImageData {
  id: string;
  uri: string;
}

interface State {
  refreshBool: boolean;
  showModal: boolean;
  imageToShow: string;
}

function ImageGallery() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [state, setState] = useState<State>({
    refreshBool: false,
    showModal: false,
    imageToShow: "",
  });

  async function retrieveDrawings() {
    // Request permission to access device's photos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access media library denied");
      return;
    }

    // Get the album named "Drawings"
    const album = await MediaLibrary.getAlbumAsync("Drawings");
    if (!album) {
      console.log("Album not found");
      return;
    }

    // Get all the assets (i.e., images) in the album
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      album: album,
    });

    // Process the images to make them smaller and update state
    const processedImages = await Promise.all(
      media.assets.map(async (asset) => {
        const processedAsset = await ImageManipulator.manipulateAsync(
          asset.uri,
          [{ resize: { width: 500 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        return { id: asset.id, uri: processedAsset.uri };
      })
    );
    setImages(processedImages);
  }

  function refreshGallery() {
    const refresh = state?.refreshBool;
    setState({
      ...state,
      refreshBool: !refresh,
    });
  }

  function showImage(uri: string) {
    setState({
      ...state,
      imageToShow: uri,
      showModal: true,
    });
  }

  function closeImage() {
    setState({
      ...state,
      imageToShow: "",
      showModal: false,
    });
  }

  useEffect(() => {
    retrieveDrawings();
  }, [state]);

  return (
    <View style={styles.container}>
      {images.length > 0 ? (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={function () {
                showImage(item.uri);
              }}
            >
              <Image source={{ uri: item.uri }} style={styles.image} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View>
          <Text>Images loading</Text>
        </View>
      )}
      <Button title="Refresh" onPress={refreshGallery} />
      <Modal
        animationType="fade"
        transparent={false}
        visible={state.showModal}
        style={styles.modal}
      >
        <View style={styles.modal}>
          <View style={styles.modalX}>
            <TouchableOpacity style={styles.topButton} onPress={closeImage}>
              <AntDesign name="closecircle" size={36} color="black" />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: state.imageToShow,
            }}
            style={{ width: 300, height: 300 }}
          />
        </View>
      </Modal>
    </View>
  );
}

export default ImageGallery;
