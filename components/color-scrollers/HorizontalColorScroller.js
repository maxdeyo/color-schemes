import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-paper'

export default function HorizontalColorScroller(props){
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.colorWrapper}>
                {
                    props.colors.map((color, key) => {
                        return (
                            <TouchableHighlight key={key} style={styles.color} onPress={()=>props.selectColor(key)} >
                                <View key={key} style={[styles.color, {backgroundColor: '#'+color}]}/>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        </SafeAreaView>
    )
}

const Color = () => <View key={key} style={[styles.color, {backgroundColor: '#'+color}]}/>;

const styles = StyleSheet.create({
    safeAreaContainer: {
        paddingTop: 10,
        flex: 5
    },
    colorWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    color: {
        height: '100%',
        flex: 1
    }
})