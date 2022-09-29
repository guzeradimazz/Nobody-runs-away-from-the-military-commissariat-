import React, { useContext } from 'react'
import { View, StyleSheet, Text, Pressable, Image } from 'react-native'
import { ThemeContext } from '../utils/themeContext'

export const Home = ({ navigation }) => {

    const theme = useContext(ThemeContext)
    return (
        <View style={[styles.container,{backgroundColor:theme.background}]}>
            <Text style={[styles.text,{color:theme.color}]}>Tabata timer</Text>
            <Pressable
                style={[styles.mainScreenButton,{backgroundColor:theme.background,}]}
                onPress={() => navigation.navigate('TimersList')}
            >
                <View style={{ justifyContent: 'center' }}>
                    <Text style={[styles.textLtl,{color:theme.color}]}>
                        Get started coach potato!
                    </Text>
                </View>
            </Pressable>

            <Pressable
                style={styles.mainScreenSetting}
                onPress={() => navigation.navigate('Settings')}
            >
                <View style={{ justifyContent: 'center' }}>
                    <Image
                        style={styles.picture}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/668/668293.png'
                        }}
                    />
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#524d3e',
        fontWeight: 'bold',
        fontSize: 40,
        textTransform: 'uppercase',
        marginBottom: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        borderRadius: 9
    },
    mainScreenButton: {
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        borderRadius: 15,
        height: 50,
        justifyContent: 'center'
    },
    mainScreenSetting: {
        width: 70,
        height: 70,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        borderRadius: 15,
        marginTop: 100
    },
    textLtl: {
        color: '#524d3e',
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    picture: {
        width: 70,
        height: 70
    }
})
