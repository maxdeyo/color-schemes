import React from 'react';
import Slider from '@react-native-community/slider';
import { View, StyleSheet } from 'react-native';

export default function HueSlider(props) {
    return (
        <View style={styles.sliderContainer}>
            <Slider
                style={styles.main}
                minimumValue={0}
                maximumValue={359}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                onValueChange={(val) => props.setHue(val)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: { 
        width: 200, 
        height: 40, 
        justifyContent: 'center' 
    },
    sliderContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});