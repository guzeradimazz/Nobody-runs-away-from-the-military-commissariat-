import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import CircularProgress from 'react-native-circular-progress-indicator'
import { ThemeContext } from '../utils/themeContext'
import { Loading } from './Loading'
import { BackButton } from './BackButton'

export const Timer = ({ navigation, route }) => {
    const theme = useContext(ThemeContext)
    const [isLoading, setIsLoading] = useState(true)

    const { prepareSecondsIN, workSecondsIN, restSecondsIN, tabatasIN } =
        route.params

    const [sound, setSound] = useState(true)
    const [play, setPlay] = useState(false)

    const [prepareSeconds, setPrepareSeconds] = useState(prepareSecondsIN)
    const [workSeconds, setWorkSeconds] = useState(workSecondsIN)
    const [restSeconds, setRestSeconds] = useState(restSecondsIN)

    const [targetSeconds, setTargetSeconds] = useState(0)

    const [tabatas, setTabatas] = useState(tabatasIN)

    const [fullSeconds, setFullSeconds] = useState(0)
    const [fullMinutes, setFullMinutes] = useState(0)

    // const [timerPercentageUp, setTimerPercentageUp] = useState(1)
    // const [timerPercentageLow, setTimerPercentageLow] = useState(1)
    // const [timerPercentage, setTimerPercentage] = useState(100)

    const [myRender, setMyRender] = useState(0)


    const tempFunc = () => {
        setMyRender(1)
        calculateTime()
    }
    useEffect(() => {
        calculateTime()
    }, [prepareSeconds, workSeconds, restSeconds, tabatas])

    useEffect(() => {
        calculateTime()
        tempFunc()
    }, [])

    useEffect(() => {
        calculateTime()
    }, [myRender])

    const updateInterval = () => {
        if (fullSeconds > 0) {
            setFullSeconds((prev) => prev - 1)
        } else if (fullMinutes >= 1 && fullSeconds == 0) {
            setFullMinutes((prev) => prev - 1)
            setFullSeconds(59)
        } else if (fullMinutes == 0 && fullSeconds == 0) {
            setPlay(!play)
            calculateTime()
            alert('complete')
            setMyRender(2)
        }
    }
    useEffect(() => {
        let interval
        if (play) {
            interval = setInterval(updateInterval, 300)
        }
        if (!play) clearInterval(interval)
        return () => {
            clearInterval(interval)
        }
    }, [play, fullSeconds])

    const resetTabata = () => {
        setPlay(false)
        setPrepareSeconds(3)
        setWorkSeconds(30)
        setRestSeconds(10)
        setTargetSeconds(0)
        setTabatas(2)
        calculateTime()
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
                                setTargetSeconds(1)
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
                                {prepareSeconds}
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
                                setTargetSeconds(2)
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
                                {workSeconds}
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
                                setTargetSeconds(3)
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
                                {restSeconds}
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
                                setTargetSeconds(4)
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
                                {tabatas}
                            </Text>
                        </Ripple>
                    </View>
                </View>
                <View style={styles.body}>
                    {/* <CircularProgress
                            radius={160}
                            value={timerPercentage ? timerPercentage : 0}
                            textColor='#222'
                            fontSize={30}
                            title={`${fullMinutes}:${fullSeconds}`}
                            titleColor={theme.color}
                            titleStyle={{ fontWeight: 'bold' }}
                            valueSuffix={'%'}
                            inActiveStrokeColor='red'
                            inActiveStrokeOpacity={0.2}
                        /> */}
                    <Text style={{ color: theme.color }}>
                        {fullMinutes}:{fullSeconds}
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

