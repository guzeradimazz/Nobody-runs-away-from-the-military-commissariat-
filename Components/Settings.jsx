import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text, Switch, Pressable, Image } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'

import { ThemeContext } from '../utils/themeContext'

export const Settings = ({ navigation }) => {
    const theme = useContext(ThemeContext)
    const [mode, setMode] = useState(theme.theme == 'dark' ? true : false)
    return (
        <View
            style={[
                styles.settingsWrapper,
                { backgroundColor: theme.background }
            ]}
        >
            <View style={styles.containerLine}>
                <Pressable
                    style={[
                        styles.mainScreenButton,
                        { backgroundColor: theme.background }
                    ]}
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
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
            <View style={styles.contentContainer}>
                <Text style={[styles.h1, { color: theme.color }]}>
                    Settings
                </Text>
                <View style={styles.settingsLine}>
                    <Text
                        style={[styles.settingsLineTxt, { color: theme.color }]}
                    >
                        Enable dark mode?
                    </Text>
                    <Switch
                        value={mode}
                        onValueChange={() => {
                            EventRegister.emit('changeTheme', mode)
                            setMode((prev) => !prev)
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    settingsLineTxt: {
        fontSize: 20
    },
    settingsLine: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%'
    },
    contentContainer: {
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    h1: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 50
    },
    settingsWrapper: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    containerLine: {
        width: '100%',
        marginLeft: 100,
        flexDirection: 'row',
        marginTop: 70,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    picture: {
        width: 40,
        height: 40
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
        justifyContent: 'center'
    }
})
