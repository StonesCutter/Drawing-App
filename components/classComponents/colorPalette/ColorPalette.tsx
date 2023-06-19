import { Component } from "react";
import { View } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

//Utils
import customEventBus from "../../../customEventBus/customEventBus";

interface ColorPaletteProps {}

interface ColorPaletteState {
  currentColor: string;
  swatchesOnly: boolean;
  swatchesEnabled: boolean;
  swatchesLast: boolean;
  disc: boolean;
  picker: ColorPicker | null;
  backgroundSelected: boolean;
}

class ColorPalette extends Component<ColorPaletteProps, ColorPaletteState> {
  constructor(props: ColorPaletteProps) {
    super(props);
    this.state = {
      currentColor: "#FFFFFF",
      swatchesOnly: false,
      swatchesEnabled: true,
      swatchesLast: true,
      disc: false,
      picker: null,
      backgroundSelected: false,
    };
  }

  onColorChange = (color: string) => {
    console.log("on COLOR CHANGE SCATTATO");
    if (color !== this.state.currentColor) {
      this.setState({ currentColor: color });
    }
  };

  onColorChangeComplete = (color: string) => {
    this.dispatchEventColor();
  };

  setPickerRef = (ref: ColorPicker | null) => {
    this.setState({ picker: ref });
  };

  revertPicker = () => {
    if (this.state.picker) {
      this.state.picker.revert();
    }
  };

  dispatchEventColor = () => {
    if (this.state.currentColor !== "#ffffff") {
      this.state.backgroundSelected
        ? customEventBus.dispatchEvent(
            "changeBackgroundColorEvent",
            this.state.currentColor
          )
        : customEventBus.dispatchEvent(
            "changeColorEvent",
            this.state.currentColor
          );
    }
  };

  selectBackground = () => {
    const isSelected = this.state.backgroundSelected;
    this.setState({ backgroundSelected: !isSelected });
  };

  render() {
    return (
      <View style={{ height: "50%" }}>
        <ColorPicker
          ref={this.setPickerRef}
          color={this.state.currentColor}
          swatchesOnly={this.state.swatchesOnly}
          onColorChange={this.onColorChange}
          onColorChangeComplete={this.onColorChangeComplete}
          thumbSize={30}
          sliderSize={30}
          noSnap={true}
          row={false}
          swatchesLast={this.state.swatchesLast}
          swatches={this.state.swatchesEnabled}
          discrete={this.state.disc}
        />
      </View>
    );
  }
}

export default ColorPalette;
