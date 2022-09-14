import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'

export const Timer = ({ navigation }) => {
    const [sound, setSound] = useState(true)
    const [play, setPlay] = useState(false)

    const [prepareSeconds, setPrepareSeconds] = useState(3)
    const [workSeconds, setWorkSeconds] = useState(30)
    const [restSeconds, setRestSeconds] = useState(10)

    const [targetSeconds, setTargetSeconds] = useState(0)

    const [tabatas, setTabatas] = useState(1)

    const [fullSeconds, setFullSeconds] = useState(0)
    const [fullMinutes, setFullMinutes] = useState(0)

    const handleIncrement = () => {
        if (targetSeconds == 1) {
            prepareSeconds < 10
                ? setPrepareSeconds(prepareSeconds + 1)
                : setPrepareSeconds(prepareSeconds)
        }
        if (targetSeconds == 2) {
            workSeconds < 45
                ? setWorkSeconds(workSeconds + 1)
                : setWorkSeconds(workSeconds)
        }
        if (targetSeconds == 3) {
            restSeconds < 15
                ? setRestSeconds(restSeconds + 1)
                : setRestSeconds(restSeconds)
        }
        if (targetSeconds == 4) {
            tabatas < 10 ? setTabatas(tabatas + 1) : setTabatas(tabatas)
        }
    }

    const handleDecrement = () => {
        if (targetSeconds == 1) {
            prepareSeconds > 3
                ? setPrepareSeconds(prepareSeconds - 1)
                : setPrepareSeconds(prepareSeconds)
        }
        if (targetSeconds == 2) {
            workSeconds > 15
                ? setWorkSeconds(workSeconds - 1)
                : setWorkSeconds(workSeconds)
        }
        if (targetSeconds == 3) {
            restSeconds > 5
                ? setRestSeconds(restSeconds - 1)
                : setRestSeconds(restSeconds)
        }
        if (targetSeconds == 4) {
            tabatas > 1 ? setTabatas(tabatas - 1) : setTabatas(tabatas)
        }
    }

    const resetTabata = () => {
        setPlay(false)
        setPrepareSeconds(3)
        setWorkSeconds(30)
        setRestSeconds(10)
        setTargetSeconds(0)
        setTabatas(1)
    }
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
                    <Ripple
                        rippleDuration={1200}
                        rippleColor={'#58736c'}
                        style={styles.timerBtn}
                        onPress={() => {
                            setTargetSeconds(1)
                        }}
                    >
                        <Text
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}
                        >
                            Prepare
                        </Text>
                        <Text>{prepareSeconds}</Text>
                    </Ripple>
                    <Ripple
                        rippleDuration={1200}
                        rippleColor={'#58736c'}
                        style={styles.timerBtn}
                        onPress={() => {
                            setTargetSeconds(2)
                        }}
                    >
                        <Text
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}
                        >
                            work
                        </Text>
                        <Text>{workSeconds}</Text>
                    </Ripple>
                    <Ripple
                        rippleDuration={1200}
                        rippleColor={'#58736c'}
                        style={styles.timerBtn}
                        onPress={() => {
                            setTargetSeconds(3)
                        }}
                    >
                        <Text
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}
                        >
                            rest
                        </Text>
                        <Text>{restSeconds}</Text>
                    </Ripple>
                </View>
                <View style={styles.nav}>
                    <Ripple
                        rippleDuration={1200}
                        rippleColor={'#58736c'}
                        style={styles.timerBtn}
                        onPress={() => {
                            setTargetSeconds(4)
                        }}
                    >
                        <Text
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}
                        >
                            tabatas
                        </Text>
                        <Text>{tabatas}</Text>
                    </Ripple>
                </View>
            </View>
            <View style={styles.body}>
                <Text
                    style={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 30
                    }}
                >
                    {fullMinutes}:{fullSeconds}
                </Text>
            </View>
            <View style={styles.navLast}>
                <Ripple
                    rippleDuration={1200}
                    rippleColor={'#58736c'}
                    style={styles.timerBtnLow}
                    onPress={handleDecrement}
                >
                    <Image
                        style={styles.picture2}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2801/2801932.png'
                        }}
                    />
                </Ripple>
                <Ripple
                    rippleDuration={1200}
                    rippleColor={'#58736c'}
                    style={styles.timerBtnLow}
                    onPress={handleIncrement}
                >
                    <Image
                        style={styles.picture2}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/748/748113.png'
                        }}
                    />
                </Ripple>
            </View>
            <View style={styles.navLast}>
                {play ? (
                    <Ripple
                        rippleDuration={1200}
                        rippleColor={'#58736c'}
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
                    </Ripple>
                ) : (
                    <Ripple
                        rippleDuration={1200}
                        rippleColor={'#58736c'}
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
                    </Ripple>
                )}
                <Ripple
                    rippleDuration={1200}
                    rippleColor={'#58736c'}
                    style={styles.timerBtnLow}
                    onPress={resetTabata}
                >
                    <Image
                        style={styles.picture}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2618/2618245.png'
                        }}
                    />
                </Ripple>
                {sound ? (
                    <Ripple
                        rippleDuration={1200}
                        rippleColor={'#58736c'}
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
                    </Ripple>
                ) : (
                    <Ripple
                        rippleDuration={1200}
                        rippleColor={'#58736c'}
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
                    </Ripple>
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
    body: {
        width: '80%',
        borderWidth: 1,
        height: 300,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navs: {
        flexDirection: 'column',
        width: '80%',
        height: '20%',
        marginTop: 80,
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
