import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ColorBar from './ColorBar'

export default function ColorScroller(props) {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView>
                {
                    props.colors.map((color) => {
                        return (
                            <ColorBar color={color}/>
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