import React from 'react';
import Slider from '@react-native-community/slider';
import { View, StyleSheet, Text } from 'react-native';

export default function SliderComponent(props) {
    return (
        <View style={styles.sliderContainer}>
            {
                props.title ?
                    <Text style={[styles.title, {color: props.color}]}>
                        {props.title}
                    </Text> : null
            }
            <Slider
                disabled={props.disabled}
                style={styles.main}
                value={props.value}
                minimumValue={0}
                maximumValue={props.maxValue}
                minimumTrackTintColor={props.color || "#000000"}
                maximumTrackTintColor={props.color || "#000000"}
                thumbTintColor={null}
                onValueChange={(val) => props.setValue(val)}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    sliderContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    title: { 
        fontSize: 24, 
        color: '#ffffff' 
    },
    main: {
        width: 200,
        height: 40,
        justifyContent: 'center'
    }
});