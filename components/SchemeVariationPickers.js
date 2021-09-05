import React from 'react';
import { Picker } from '@react-native-picker/picker'
import { View, StyleSheet } from 'react-native';

export default function SchemeVariationPickers(props) {
    return (
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={props.myScheme}
                style={styles.picker}
                onValueChange={(itemValue) => props.setMyScheme(itemValue)}
            >
                <Picker.Item label="Mono" value="mono" />
                <Picker.Item label="Contrast" value="contrast" />
                <Picker.Item label="Tetrade" value="tetrade" />
                <Picker.Item label="Triade" value="triade" />
                <Picker.Item label="Analogic" value="analogic" />
            </Picker>
            <Picker
                selectedValue={props.myVariation}
                style={styles.picker}
                onValueChange={(itemValue) => props.setMyVariation(itemValue)}
            >
                <Picker.Item label="Default" value="Default" />
                <Picker.Item label="Pastel" value="pastel" />
                <Picker.Item label="Soft" value="soft" />
                <Picker.Item label="Light" value="light" />
                <Picker.Item label="Hard" value="hard" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    pickerContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    picker: {
        height: 50, 
        width: 150, 
        alignSelf: 'center'
    }
})