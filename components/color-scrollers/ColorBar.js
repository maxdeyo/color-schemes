import React from 'react';
import { View, StyleSheet, Text, Pressable, TouchableHighlight } from 'react-native';

const colorGenerator = require('../../util/colorGenerator');

export default function ColorBar(props) {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <View style={[styles.colorContainer, { backgroundColor: '#' + props.color }]}>
                    <Text style={[styles.colorText, { color: colorGenerator.hexSetContrast('#' + props.color) }]}>#{props.color}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    pressable: {
        flex: 3
    },
    colorContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorTextWrapper: {
        backgroundColor: '#afaaaa33',
        flex: 1,
        borderRadius: 50,
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    colorText: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 28,
        fontWeight: '100'
    },
    deleteText: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20,
        fontWeight: '100'
    }
})