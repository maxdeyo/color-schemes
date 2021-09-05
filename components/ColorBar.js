import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function ColorBar(props) {
    return (
        <View style={[styles.colorContainer, {backgroundColor: '#' + props.color}]}>
            <View style={styles.colorTextWrapper}>
                <Text style={styles.colorText}>#{props.color}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})