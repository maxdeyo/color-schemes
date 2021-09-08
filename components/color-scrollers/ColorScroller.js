import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import ColorBar from './ColorBar'

export default function ColorScroller(props) {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView>
                {
                    props.colors.map((color, index) => {
                        return (
                            <ColorBar key={index.toString()+color} color={color} onPress={()=>props.selectColor(index)} />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    safeAreaContainer: {
        paddingTop: 10,
        flex: 5
    }
})