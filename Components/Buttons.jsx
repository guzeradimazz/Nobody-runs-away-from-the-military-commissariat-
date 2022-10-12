import React from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import Ripple from 'react-native-material-ripple'

export const ButtonForTimer = ({ play, img, theme, onPress }) => {
    return (
        <Ripple
            borderRadius={15}
            disabled={play ? true : false}
            rippleDuration={1200}
            rippleColor={theme.rippleColor}
            style={[styles.timerBtnLow, { backgroundColor: theme.background }]}
            onPress={onPress}
        >
            <Image
                style={styles.picture2}
                source={{
                    uri: img
                }}
            />
        </Ripple>
    )
}
export const ButtonForNavbar = ({
    play,
    theme,
    onPress,
    title,
    seconds,
    shadowColor
}) => {
    return (
        <Ripple
            disabled={play ? true : false}
            rippleDuration={1200}
            rippleColor={theme.rippleColor}
            style={[
                styles.timerBtn,
                {
                    backgroundColor: theme.background,
                    shadowColor: shadowColor,
                    shadowOpacity: 0.8
                }
            ]}
            onPress={onPress}
        >
            <Text
                style={{
                    color: theme.color,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 17
                }}
            >
                {title}
            </Text>
            <Text style={{ color: theme.color }}>{seconds}</Text>
        </Ripple>
    )
}
const styles = StyleSheet.create({
    timerBtn: {
        backgroundColor: '#e3f6fa',
        height: 60,
        width: 100,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timerBtnLow: {
        backgroundColor: '#e3f6fa',
        height: 50,
        width: 50,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    picture2: {
        width: 35,
        height: 35
    }
})
