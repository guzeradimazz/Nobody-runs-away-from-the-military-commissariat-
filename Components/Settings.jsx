import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text, Switch, Pressable } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { ThemeContext } from '../utils/themeContext'
import { BackButton } from './BackButton'
import Ripple from 'react-native-material-ripple'

export const Settings = ({ navigation, AsyncStorage, locale, setLocale }) => {
    const theme = useContext(ThemeContext)
    const [mode, setMode] = useState(theme.theme == 'dark' ? true : false)

    const clearData = async () => {
        AsyncStorage.clear()
    }
    return (
        <View
            style={[
                styles.settingsWrapper,
                { backgroundColor: theme.background }
            ]}
        >
            <BackButton
                onPress={() => navigation.navigate('Home')}
                theme={theme}
            />
            <View style={styles.contentContainer}>
                <Text style={[styles.h1, { color: theme.color }]}>
                    {locale ? 'Settings' : 'Настройки'}
                </Text>
                <View style={styles.settingsLine}>
                    <Text
                        style={[styles.settingsLineTxt, { color: theme.color }]}
                    >
                        {locale
                            ? 'Enable dark mode?'
                            : 'Включить темный режим?'}
                    </Text>
                    <Switch
                        value={mode}
                        onValueChange={() => {
                            EventRegister.emit('changeTheme', mode)
                            setMode((prev) => !prev)
                        }}
                    />
                </View>

                <View style={styles.settingsLine}>
                    <Ripple
                        rippleColor={theme.color}
                        style={{
                            width: '80%',
                            alignItems: 'center',
                            height: 40,
                            justifyContent: 'center'
                        }}
                        onPress={clearData}
                    >
                        <Text
                            style={[
                                styles.settingsLineTxt,
                                { color: theme.color }
                            ]}
                        >
                            {locale ? 'Clear stored data' : 'Очистить данные'}
                        </Text>
                    </Ripple>
                </View>

                <View style={styles.settingsLine}>
                    <Text
                        style={[styles.settingsLineTxt, { color: theme.color }]}
                    >
                        {locale ? 'Change language' : 'Сменить язык'}
                    </Text>
                    <Switch
                        value={locale}
                        onValueChange={() => {
                            setLocale((prev) => !prev)
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
        width: '80%',
        marginTop: 20
    },
    contentContainer: {
        width: '100%',
        height: '80%',
        marginTop: '20%',
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
    picture: {
        width: 40,
        height: 40
    }
})
