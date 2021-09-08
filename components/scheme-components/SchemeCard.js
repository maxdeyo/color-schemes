import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';

export default function SchemeCard({ colors, openModal }) {
    return (
        <View style={styles.schemeComponent}>
            <TouchableHighlight
                onPress={openModal}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {
                        colors.map((color) => {
                            return (
                                <View
                                    style={[styles.color, { backgroundColor: '#' + color }]}
                                />
                            )
                        })
                    }
                </View>
            </TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    schemeComponent: {
        height: 100,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14
    },
    color: {
        flex: 1
    }
})