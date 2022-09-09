import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { InsetShadow } from 'react-native-inset-shadow'

export const Timer = ({ navigation, shadowProps }) => {
    const [sound, setSound] = useState(true)
    const [play, setPlay] = useState(false)
    return (
        <View style={styles.container}>
            <View style={styles.containerLine}>
                <Pressable
                    style={styles.mainScreenButton}
                    onPress={() => navigation.navigate('Home')}
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
            <View style={styles.navs}>
                <View style={styles.nav}>
                    <Pressable style={styles.timerBtn} onPress={() => {}}>
                        <Text
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}
                        >
                            Prepare
                        </Text>
                    </Pressable>
                    <Pressable style={styles.timerBtn} onPress={() => {}}>
                        <Text
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}
                        >
                            work
                        </Text>
                    </Pressable>
                    <Pressable style={styles.timerBtn} onPress={() => {}}>
                        <Text
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}
                        >
                            rest
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.nav}>
                    <Pressable style={styles.timerBtn} onPress={() => {}}>
                        <Text
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}
                        >
                            tabatas
                        </Text>
                    </Pressable>
                    <Pressable style={styles.timerBtn} onPress={() => {}}>
                        <Text
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}
                        >
                            cycles
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.body}></View>
            <View style={styles.navLast}>
                {play ? (
                    <Pressable
                        style={styles.timerBtnLow}
                        onPress={() => {
                            setPlay(!play)
                        }}
                    >
                        <Image
                            style={styles.picture2}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/2920/2920686.png'
                            }}
                        />
                    </Pressable>
                ) : (
                    <Pressable
                        style={styles.timerBtnLow}
                        onPress={() => {
                            setPlay(!play)
                        }}
                    >
                        <Image
                            style={styles.picture2}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/5577/5577228.png'
                            }}
                        />
                    </Pressable>
                )}
                <Pressable style={styles.timerBtnLow} onPress={() => {}}>
                    <Image
                        style={styles.picture}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2618/2618245.png'
                        }}
                    />
                </Pressable>
                {sound ? (
                    <Pressable
                        style={styles.timerBtnLow}
                        onPress={() => {
                            setSound(!sound)
                        }}
                    >
                        <Image
                            style={styles.picture}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/727/727240.png'
                            }}
                        />
                    </Pressable>
                ) : (
                    <Pressable
                        style={styles.timerBtnLow}
                        onPress={() => {
                            setSound(!sound)
                        }}
                    >
                        <Image
                            style={styles.picture}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/59/59284.png'
                            }}
                        />
                    </Pressable>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    timerBtn: {
        backgroundColor: '#e3f6fa',
        height: 40,
        width: 90,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        width: '80%',
        borderWidth: 1,
        height: 300,
        marginTop: -100
    },
    navs: {
        flexDirection: 'column',
        width: '80%',
        height: '20%',
        marginBottom: 30,
        justifyContent: 'center'
    },
    navLast: {
        width: '80%',
        marginBottom: 30,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    nav: {
        backgroundColor: '#e3f6fa',
        height: 50,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    picture2: {
        width: 35,
        height: 35
    },
    picture: {
        width: 40,
        height: 40
    },
    containerLine: {
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        backgroundColor: '#e3f6fa',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    },
    textLtl: {
        color: '#524d3e',
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'uppercase',
        textAlign: 'center'
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
