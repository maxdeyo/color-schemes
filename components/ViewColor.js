import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button, Portal, Modal, ActivityIndicator, IconButton } from 'react-native-paper';
import Slider from './Slider';

const colorGenerator = require('../util/colorGenerator');

export default function ViewColor(props) {
    const [hex, setHex] = React.useState(props.colors[props.selectedColorIndex]);
    const [rgb, setRGB] = React.useState(colorGenerator.hexToRgb('#'+props.colors[props.selectedColorIndex]));
    const [contrast, setContrast] = React.useState('white');
    React.useEffect(() => {
        setRGB(colorGenerator.hexToRgb('#'+props.colors[props.selectedColorIndex]));
    }, [props.selectedColorIndex])
    React.useEffect(() => {
        if (rgb !== null) {
            let hex = colorGenerator.rgbToHex(rgb.r, rgb.g, rgb.b);
            setHex(hex);
            let contrast = colorGenerator.setContrast(rgb.r, rgb.g, rgb.b);
            setContrast(contrast);
        }
    }, [rgb]);


    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={()=>props.hideModal()} contentContainerStyle={styles.modal}>
                {
                    rgb ?
                    <View style={{ flex: 1 }}>
                        <View style={[styles.container, { backgroundColor: '#' + hex }]}>
                        <IconButton
                            icon="close"
                            style={[styles.fab]}
                            color={contrast}
                            onPress={()=>props.hideModal()}
                        />
                            <Text style={[styles.text, { color: contrast }]} selectable={true}>{'#' + hex}</Text>
                            <Slider
                                title={'R: ' + Math.round(rgb.r).toString()}
                                setValue={(val) => setRGB({ ...rgb, r: val })}
                                maxValue={255}
                                value={rgb.r}
                                color={contrast}/>
                            <Slider
                                title={'G: ' + Math.round(rgb.g).toString()}
                                setValue={(val) => setRGB({ ...rgb, g: val })}
                                maxValue={255}
                                value={rgb.g}
                                color={contrast}/>
                            <Slider
                                title={'B: ' + Math.round(rgb.b).toString()}
                                setValue={(val) => setRGB({ ...rgb, b: val })}
                                maxValue={255}
                                value={rgb.b}
                                color={contrast}/>
                        </View>
                        <Button
                            style={styles.saveButton}
                            color={'#' + hex}
                            mode='contained'
                            onPress={() =>props.setColor(hex)}>
                            Save
                        </Button>
                        <Button
                            style={styles.saveButton}
                            color={'#' + hex}
                            mode='contained'
                            onPress={() => props.deleteColor()}>
                            Delete
                        </Button>
                    </View>
                    : <ActivityIndicator animating={true} />
}
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        flexDirection: 'column',
        alignContent: 'space-around',
        justifyContent: 'space-evenly',
        padding: 100
    },
    color: {
        flex: 4
    },
    textField: {
        color: 'black',
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center'
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    saveButton: {
        flex: 1,
        justifyContent: 'center'
    },
    modal: {
        flex: 1,
        backgroundColor: 'white'
    },
    fab: {
        position: 'absolute', 
        right: 30, 
        top: 30
    }
})