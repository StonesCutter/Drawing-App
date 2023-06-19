import * as React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Slider } from '..';
// styles
import { aboveThumbStyles, componentThumbStyles, customStyles, customStyles2, customStyles3, customStyles4, customStyles5, customStyles6, customStyles7, customStyles8, customStyles9, iosStyles, styles, trackMarkStyles, } from './styles';
const thumbImage = require('./img/thumb.png');
const DEFAULT_VALUE = 0.2;
const CustomThumb = () => (React.createElement(View, { style: componentThumbStyles.container },
    React.createElement(Text, null, "Any")));
const renderAboveThumbComponent = (value) => {
    return (React.createElement(View, { style: aboveThumbStyles.container },
        React.createElement(Text, null, value)));
};
const renderBelowThumbComponent = (value) => {
    return (React.createElement(View, { style: aboveThumbStyles.container },
        React.createElement(Text, null, value)));
};
const SliderContainer = (props) => {
    const { caption, sliderValue, trackMarks } = props;
    const [value, setValue] = React.useState(sliderValue ? sliderValue : DEFAULT_VALUE);
    let renderTrackMarkComponent;
    if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
        renderTrackMarkComponent = (index) => {
            const currentMarkValue = trackMarks[index];
            const style = currentMarkValue >
                Math.max(Array.isArray(value) ? value[0] : value)
                ? trackMarkStyles.activeMark
                : trackMarkStyles.inactiveMark;
            return React.createElement(View, { style: style });
        };
    }
    const renderChildren = () => {
        return React.Children.map(props.children, (child) => {
            if (child) {
                return React.cloneElement(child, {
                    onValueChange: setValue,
                    renderTrackMarkComponent,
                    trackMarks,
                    value,
                });
            }
            return child;
        });
    };
    return (React.createElement(View, { style: styles.sliderContainer },
        React.createElement(View, { style: styles.titleContainer },
            React.createElement(Text, null, caption),
            React.createElement(Text, null, Array.isArray(value) ? value.join(' - ') : value)),
        renderChildren()));
};
const CustomTrackSlider = (props) => {
    const commonStyle = {
        height: 15,
        position: 'absolute',
        top: -5,
        bottom: 0,
        left: 0,
        right: 0,
    };
    const VeryComplicatedLogicComponent = () => (React.createElement(View, { style: {
            backgroundImage: 'linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%)',
            ...commonStyle,
        } }));
    const EvenMoreComplicatedLogicComponent = () => (React.createElement(View, { style: {
            backgroundImage: 'linear-gradient(90deg, #d53369 0%, #daae51 100%)',
            ...commonStyle,
        } }));
    return (React.createElement(Slider, { ...props, renderMinimumTrackComponent: VeryComplicatedLogicComponent, renderMaximumTrackComponent: EvenMoreComplicatedLogicComponent }));
};
const App = () => (React.createElement(SafeAreaView, null,
    React.createElement(ScrollView, { contentContainerStyle: styles.container },
        React.createElement(SliderContainer, { caption: "<Slider/> to test the start from zero - symmetric" },
            React.createElement(Slider, { value: DEFAULT_VALUE, minimumValue: -1, maximumValue: 1, step: 0.01, startFromZero: true, trackClickable: true })),
        React.createElement(SliderContainer, { caption: "<Slider/> to test the start from zero - asymmetric" },
            React.createElement(Slider, { value: DEFAULT_VALUE, minimumValue: -0.4, maximumValue: 1, step: 0.01, startFromZero: true, trackClickable: true })),
        React.createElement(SliderContainer, { caption: "<Slider/> to test click rounding" },
            React.createElement(Slider, { value: 3, minimumValue: 1, maximumValue: 5, step: 1, trackClickable: true })),
        React.createElement(SliderContainer, { caption: "<Slider/> with default style" },
            React.createElement(Slider, null)),
        React.createElement(SliderContainer, { caption: "<Slider/> with track marks", sliderValue: [1], trackMarks: [3, 7, 11] },
            React.createElement(Slider, { maximumValue: 17, minimumValue: 0, step: 1 })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom thumb component" },
            React.createElement(Slider, { animateTransitions: true, renderThumbComponent: CustomThumb, trackStyle: customStyles.track })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom above thumb component" },
            React.createElement(Slider, { animateTransitions: true, renderAboveThumbComponent: renderAboveThumbComponent })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom below thumb component" },
            React.createElement(Slider, { animateTransitions: true, renderBelowThumbComponent: renderBelowThumbComponent })),
        React.createElement(SliderContainer, { caption: "<Slider/> 2 thumbs, min, max, and custom tint", sliderValue: [6, 18] },
            React.createElement(Slider, { animateTransitions: true, maximumTrackTintColor: "#d3d3d3", maximumValue: 20, minimumTrackTintColor: "#1fb28a", minimumValue: 4, step: 2, thumbTintColor: "#1a9274" })),
        React.createElement(SliderContainer, { caption: "<Slider/> with min, max and custom tints" },
            React.createElement(Slider, { animateTransitions: true, maximumTrackTintColor: "#d3d3d3", maximumValue: 42, minimumTrackTintColor: "#1fb28a", minimumValue: -10, thumbTintColor: "#1a9274" })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom style" },
            React.createElement(Slider, { animateTransitions: true, maximumTrackTintColor: "#b7b7b7", minimumTrackTintColor: "#1073ff", thumbStyle: iosStyles.thumb, trackStyle: iosStyles.track })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom style #2" },
            React.createElement(Slider, { animateTransitions: true, minimumTrackTintColor: "#30a935", thumbStyle: customStyles2.thumb, trackStyle: customStyles2.track })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom style #3" },
            React.createElement(Slider, { animateTransitions: true, minimumTrackTintColor: "#eecba8", thumbStyle: customStyles3.thumb, trackStyle: customStyles3.track })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom style #4" },
            React.createElement(Slider, { animateTransitions: true, minimumTrackTintColor: "#d14ba6", thumbStyle: customStyles4.thumb, trackStyle: customStyles4.track })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom style #5" },
            React.createElement(Slider, { animateTransitions: true, minimumTrackTintColor: "#ec4c46", thumbStyle: customStyles5.thumb, trackStyle: customStyles5.track })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom style #6" },
            React.createElement(Slider, { animateTransitions: true, minimumTrackTintColor: "#e6a954", thumbStyle: customStyles6.thumb, trackStyle: customStyles6.track })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom style #7" },
            React.createElement(Slider, { animateTransitions: true, minimumTrackTintColor: "#2f2f2f", thumbStyle: customStyles7.thumb, trackStyle: customStyles7.track })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom style #8 and thumbTouchSize" },
            React.createElement(Slider, { animateTransitions: true, containerStyle: customStyles8.container, minimumTrackTintColor: "#31a4db", thumbStyle: customStyles8.thumb, thumbTouchSize: {
                    width: 50,
                    height: 40,
                }, trackStyle: customStyles8.track })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom style #9 and thumbImage" },
            React.createElement(Slider, { animateTransitions: true, minimumTrackTintColor: "#13a9d6", thumbImage: thumbImage, thumbStyle: customStyles9.thumb, thumbTintColor: "#0c6692" })),
        React.createElement(SliderContainer, { caption: "<Slider/> with custom minimumTrack" },
            React.createElement(CustomTrackSlider, null)))));
export default App;
//# sourceMappingURL=Slider.js.map