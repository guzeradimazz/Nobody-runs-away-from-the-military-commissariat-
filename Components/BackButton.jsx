import React from 'react'
import { StyleSheet, View, Pressable, Image } from 'react-native'

export const BackButton = ({ onPress, theme }) => {
    return (
        <View style={styles.containerLine}>
            <Pressable
                style={[
                    styles.mainScreenButton,
                    { backgroundColor: theme.background }
                ]}
                onPress={onPress}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        style={styles.picture}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png'
                        }}
                    />
                </View>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    picture: {
        width: 40,
        height: 40
    },
    containerLine: {
        flexDirection: 'row'
    },
    mainScreenButton: {
        backgroundColor: '#e3f6fa',
        width: 50,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        borderRadius: 15,
        height: 50,
        justifyContent: 'center',
        position: 'absolute',
        left: -165,
        top: 50
    }
})
