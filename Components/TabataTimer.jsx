import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import CircularProgress from 'react-native-circular-progress-indicator'
import { ThemeContext } from '../utils/themeContext'
import { Loading } from './Loading'
import { BackButton } from './BackButton'

export const TabataTimer = ({ navigation, route }) => {
    const theme = useContext(ThemeContext)
    const [isLoading, setIsLoading] = useState(true)
    const [play, setPlay] = useState(false)
    const [sound, setSound] = useState(true)

    const [targetSeconds, setTargetSeconds] = useState(0)
    const [needToCalc, setNeedToCalc] = useState(false)

    const { prepareSecondsIN, workSecondsIN, restSecondsIN, tabatasIN } =
        route.params

    const [timer, setTimer] = useState({
        minutes: 0,
        seconds: 0,
        prepareSeconds: prepareSecondsIN,
        workSeconds: workSecondsIN,
        restSeconds: restSecondsIN,
        tabatas: tabatasIN
    })

    const calculateTime = () => {
        const tempVariable =
            timer.prepareSeconds +
            timer.tabatas * (timer.workSeconds + timer.restSeconds)
        const minutes = Number((tempVariable / 60).toString().split('.')[0])
        const seconds = Number(tempVariable - minutes * 60)
        setTimer((prev) => {
            return {
                ...prev,
                minutes: minutes,
                seconds: seconds
            }
        })
        setNeedToCalc(false)
    }

    useEffect(() => {
        calculateTime()
    }, [])
    useEffect(() => {
        if (needToCalc) calculateTime()
    }, [needToCalc])

    const handleIncrement = () => {
        if (targetSeconds == 1) {
            if (timer.prepareSeconds < 10) {
                setTimer((prev) => {
                    return {
                        ...prev,
                        prepareSeconds: prev.prepareSeconds + 1
                    }
                })
                setNeedToCalc(true)
            } else setTimer((prev) => prev)
        } else if (targetSeconds == 2) {
            if (timer.workSeconds < 45) {
                setTimer((prev) => {
                    return {
                        ...prev,
                        workSeconds: prev.workSeconds + 1
                    }
                })
                setNeedToCalc(true)
            } else setTimer((prev) => prev)
        } else if (targetSeconds == 3) {
            if (timer.restSeconds < 15) {
                setTimer((prev) => {
                    return {
                        ...prev,
                        restSeconds: prev.restSeconds + 1
                    }
                })
                setNeedToCalc(true)
            } else setTimer((prev) => prev)
        } else if (targetSeconds == 4) {
            if (timer.tabatas < 5) {
                setTimer((prev) => {
                    return {
                        ...prev,
                        tabatas: prev.tabatas + 1
                    }
                })
                setNeedToCalc(true)
            } else setTimer((prev) => prev)
        }
    }
    const handleDecrement = () => {
        if (targetSeconds == 1) {
            if (timer.prepareSeconds > 3) {
                setTimer((prev) => {
                    return {
                        ...prev,
                        prepareSeconds: prev.prepareSeconds - 1
                    }
                })
                setNeedToCalc(true)
            } else setTimer((prev) => prev)
        } else if (targetSeconds == 2) {
            if (timer.workSeconds > 30) {
                setTimer((prev) => {
                    return {
                        ...prev,
                        workSeconds: prev.workSeconds - 1
                    }
                })
                setNeedToCalc(true)
            } else setTimer((prev) => prev)
        } else if (targetSeconds == 3) {
            if (timer.restSeconds > 5) {
                setTimer((prev) => {
                    return {
                        ...prev,
                        restSeconds: prev.restSeconds - 1
                    }
                })
                setNeedToCalc(true)
            } else setTimer((prev) => prev)
        } else if (targetSeconds == 4) {
            if (timer.tabatas > 2) {
                setTimer((prev) => {
                    return {
                        ...prev,
                        tabatas: prev.tabatas - 1
                    }
                })
                setNeedToCalc(true)
            } else setTimer((prev) => prev)
        }
    }

    if (isLoading) {
        setTimeout(() => {
            setIsLoading(false)
        }, 300)
        return <Loading />
    } else
        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background }
                ]}
            >
                <BackButton
                    onPress={() => navigation.navigate('TimersList')}
                    theme={theme}
                />
                <View style={styles.navs}>
                    <View
                        style={[
                            styles.nav,
                            { backgroundColor: theme.background }
                        ]}
                    >
                        <Ripple
                            disabled={play ? true : false}
                            rippleDuration={1200}
                            rippleColor={theme.rippleColor}
                            style={[
                                styles.timerBtn,
                                {
                                    backgroundColor: theme.background,
                                    shadowColor: 'blue',
                                    shadowOpacity: 0.8
                                }
                            ]}
                            onPress={() => {
                                setTargetSeconds((prev) => (prev = 1))
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.color,
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: 17
                                }}
                            >
                                Prepare
                            </Text>
                            <Text style={{ color: theme.color }}>
                                {timer.prepareSeconds}
                            </Text>
                        </Ripple>
                        <Ripple
                            disabled={play ? true : false}
                            rippleDuration={1200}
                            rippleColor={theme.rippleColor}
                            style={[
                                styles.timerBtn,
                                {
                                    backgroundColor: theme.background,
                                    shadowColor: 'pink',
                                    shadowOpacity: 0.8
                                }
                            ]}
                            onPress={() => {
                                setTargetSeconds((prev) => (prev = 2))
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.color,
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: 17
                                }}
                            >
                                work
                            </Text>
                            <Text style={{ color: theme.color }}>
                                {timer.workSeconds}
                            </Text>
                        </Ripple>
                        <Ripple
                            disabled={play ? true : false}
                            rippleDuration={1200}
                            rippleColor={theme.rippleColor}
                            style={[
                                styles.timerBtn,
                                {
                                    backgroundColor: theme.background,
                                    shadowColor: 'red',
                                    shadowOpacity: 0.8
                                }
                            ]}
                            onPress={() => {
                                setTargetSeconds((prev) => (prev = 3))
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.color,
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: 17
                                }}
                            >
                                rest
                            </Text>
                            <Text style={{ color: theme.color }}>
                                {timer.restSeconds}
                            </Text>
                        </Ripple>
                    </View>
                    <View
                        style={[
                            styles.nav,
                            { backgroundColor: theme.background }
                        ]}
                    >
                        <Ripple
                            disabled={play ? true : false}
                            rippleDuration={1200}
                            rippleColor={theme.rippleColor}
                            style={[
                                styles.timerBtn,
                                { backgroundColor: theme.background }
                            ]}
                            onPress={() => {
                                setTargetSeconds((prev) => (prev = 4))
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.color,
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: 17
                                }}
                            >
                                tabatas
                            </Text>
                            <Text style={{ color: theme.color }}>
                                {timer.tabatas}
                            </Text>
                        </Ripple>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={{ color: theme.color }}>
                        {timer.minutes}:{timer.seconds}
                    </Text>
                </View>
                <View style={styles.navLast}>
                    <Ripple
                        disabled={play ? true : false}
                        rippleDuration={1200}
                        rippleColor={theme.rippleColor}
                        style={[
                            styles.timerBtnLow,
                            { backgroundColor: theme.background }
                        ]}
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
                        disabled={play ? true : false}
                        rippleDuration={1200}
                        rippleColor={theme.rippleColor}
                        style={[
                            styles.timerBtnLow,
                            { backgroundColor: theme.background }
                        ]}
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
                            rippleColor={theme.rippleColor}
                            style={[
                                styles.timerBtnLow,
                                { backgroundColor: theme.background }
                            ]}
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
                            rippleColor={theme.rippleColor}
                            style={[
                                styles.timerBtnLow,
                                { backgroundColor: theme.background }
                            ]}
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
                        rippleColor={theme.rippleColor}
                        style={[
                            styles.timerBtnLow,
                            { backgroundColor: theme.background }
                        ]}
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
                            rippleColor={theme.rippleColor}
                            style={[
                                styles.timerBtnLow,
                                { backgroundColor: theme.background }
                            ]}
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
                            rippleColor={theme.rippleColor}
                            style={[
                                styles.timerBtnLow,
                                { backgroundColor: theme.background }
                            ]}
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
    }
})
