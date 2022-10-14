import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ThemeContext } from '../utils/themeContext'
import { Loading } from './Loading'
import { BackButton } from './BackButton'
import { Audio } from 'expo-av'
import { ButtonForTimer, ButtonForNavbar } from './Buttons'
import CircularProgress from 'react-native-circular-progress-indicator'

export const TabataTimer = ({ navigation, route, locale, AsyncStorage }) => {
    // States
    const theme = useContext(ThemeContext)

    const [isLoading, setIsLoading] = useState(true)

    const [play, setPlay] = useState(false)
    const [sound, setSound] = useState(true)
    const [beep2, setBeep] = useState()

    const [timers, setTimers] = useState({
        timersWithoutCurrent: [],
        currentTimer: {}
    })

    const [percent, setPercent] = useState({
        percent: 100,
        percentUp: 1,
        percentLow: 1
    })

    const [targetSeconds, setTargetSeconds] = useState(0)
    const [needToCalc, setNeedToCalc] = useState(false)

    const [stage, setStage] = useState({ color: '#fff', stage: 'wait' })
    const [counterCycles, setCounterCycles] = useState(0)
    const {
        prepareSecondsIN,
        workSecondsIN,
        restSecondsIN,
        tabatasIN,
        idIN,
        nameIN
    } = route.params

    const playSound = async () => {
        if (!sound) {
            const { beep } = await Audio.Sound.createAsync(
                require('../assets/sound/beep.mp3'),
                { shouldPlay: true }
            )
            setBeep(beep)
            try {
                await beep2.playAsync()
            } catch (err) {}
        }
    }

    const [timer, setTimer] = useState({
        minutes: 0,
        seconds: 0,
        prepareSeconds: 0,
        workSeconds: 0,
        restSeconds: 0,
        tabatas: 0
    })

    const saveTimers = async () => {
        AsyncStorage.clear()
        await AsyncStorage.setItem(
            'timers',
            JSON.stringify([
                ...timers.timersWithoutCurrent,
                timers.currentTimer
            ])
        )

        navigation.navigate('TimersList')
    }
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
    const updateInterval = () => {
        setCounterCycles((prev) => prev + 1)
        setPercent((prev) => {
            return {
                ...prev,
                percentUp: timer.minutes * 60 + timer.seconds
            }
        })
        if (timer.seconds > 0) {
            setTimer((prev) => {
                return {
                    ...prev,
                    seconds: prev.seconds - 1
                }
            })
        } else if (timer.seconds == 0 && timer.minutes >= 1) {
            setTimer((prev) => {
                return {
                    ...prev,
                    minutes: prev.minutes - 1,
                    seconds: 59
                }
            })
        } else if (timer.seconds == 0 && timer.minutes == 0) {
            alert('COMPLETE')
            setNeedToCalc(true)
            setPlay((prev) => !prev)
            setStage((prev) => {
                return {
                    ...prev,
                    color: 'pink',
                    stage: 'prepare'
                }
            })
            setPercent((prev) => {
                return {
                    ...prev,
                    percent: 100
                }
            })
        }
    }
    const handleIncrement = () => {
        if (targetSeconds == 1) {
            if (timer.prepareSeconds < 10) {
                setTimer((prev) => {
                    return {
                        ...prev,
                        prepareSeconds: prev.prepareSeconds + 1
                    }
                })
                setTimers((prev) => {
                    const copy = prev
                    copy.currentTimer.prepareSeconds += 1
                    return copy
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
                setTimers((prev) => {
                    const copy = prev
                    copy.currentTimer.workSeconds += 1
                    return copy
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
                setTimers((prev) => {
                    const copy = prev
                    copy.currentTimer.restSeconds += 1
                    return copy
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
                setTimers((prev) => {
                    const copy = prev
                    copy.currentTimer.tabatas += 1
                    return copy
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
                setTimers((prev) => {
                    const copy = prev
                    copy.currentTimer.prepareSeconds -= 1
                    return copy
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
                setTimers((prev) => {
                    const copy = prev
                    copy.currentTimer.workSeconds -= 1
                    return copy
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
                setTimers((prev) => {
                    const copy = prev
                    copy.currentTimer.restSeconds -= 1
                    return copy
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
                setTimers((prev) => {
                    const copy = prev
                    copy.currentTimer.tabatas -= 1
                    return copy
                })
                setNeedToCalc(true)
            } else setTimer((prev) => prev)
        }
    }
    const handleReset = () => {
        setPlay(false)
        setCounterCycles(0)
        setTimer((prev) => {
            return {
                ...prev,
                prepareSeconds: prepareSecondsIN,
                workSeconds: workSecondsIN,
                restSeconds: restSecondsIN,
                tabatas: tabatasIN
            }
        })
        setPercent((prev) => {
            return {
                ...prev,
                percent: 100
            }
        })
        setNeedToCalc(true)
        setStage((prev) => {
            return {
                ...prev,
                color: 'pink',
                stage: 'prepare'
            }
        })
    }

    const getTimers = async () => {
        await AsyncStorage.getItem('timers', (err, result) => {
            const data = JSON.parse(result)
            const currentItem = data.filter((item) => {
                return item.id == idIN
            })
            const withoutCurrent = data.filter((item) => {
                return item.id != idIN
            })
            setTimers((prev) => {
                return {
                    ...prev,
                    timersWithoutCurrent: withoutCurrent,
                    currentTimer: currentItem[0]
                }
            })
        }).catch((err) => console.log(err))
    }
    // Useeffect

    useEffect(() => {
        setPercent((prev) => {
            return {
                ...prev,
                percent: Math.round((prev.percentUp / prev.percentLow) * 100)
            }
        })
    }, [percent.percentUp])

    useEffect(() => {
        return beep2
            ? () => {
                  beep2.unloadAsync()
              }
            : undefined
    }, [beep2])

    useEffect(() => {
        getTimers()
        setCounterCycles(0)
    }, [])

    useEffect(() => {
        setTimer((prev) => {
            return {
                ...prev,
                prepareSeconds: timers.currentTimer.prepareSeconds,
                workSeconds: timers.currentTimer.workSeconds,
                restSeconds: timers.currentTimer.restSeconds,
                tabatas: timers.currentTimer.tabatas
            }
        })
        setNeedToCalc(true)
    }, [timers.currentTimer])

    useEffect(() => {
        if (needToCalc) calculateTime()
        setPercent((prev) => {
            return {
                ...prev,
                percentLow: timer.minutes * 60 + timer.seconds
            }
        })
    }, [needToCalc])

    useEffect(() => {
        playSound()
    }, [stage.stage])

    useEffect(() => {
        if (counterCycles <= timer.prepareSeconds) {
            setStage((prev) => {
                return {
                    ...prev,
                    color: 'pink',
                    stage: 'prepare'
                }
            })
        } else {
            const tempVar =
                (counterCycles - timer.prepareSeconds) %
                (timer.workSeconds + timer.restSeconds)
            if (tempVar <= timer.workSeconds) {
                setStage((prev) => {
                    return {
                        ...prev,
                        color: 'yellow',
                        stage: 'work'
                    }
                })
            } else {
                setStage((prev) => {
                    return {
                        ...prev,
                        color: 'orange',
                        stage: 'rest'
                    }
                })
            }
        }
    }, [counterCycles])

    useEffect(() => {
        let interval
        if (play) {
            interval = setInterval(updateInterval, 1000)
        } else clearInterval(interval)
        return () => clearInterval(interval)
    }, [play, timer])

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
                <BackButton onPress={saveTimers} theme={theme} />
                <View style={styles.navs}>
                    <View
                        style={[
                            styles.nav,
                            { backgroundColor: theme.background }
                        ]}
                    >
                        <ButtonForNavbar
                            onPress={() => {
                                setTargetSeconds((prev) => (prev = 1))
                            }}
                            shadowColor='pink'
                            theme={theme}
                            title={locale ? 'Prepare' : 'Разогрев'}
                            seconds={timer.prepareSeconds}
                        />
                        <ButtonForNavbar
                            onPress={() => {
                                setTargetSeconds((prev) => (prev = 2))
                            }}
                            shadowColor='yellow'
                            theme={theme}
                            title={locale ? 'Work' : 'Работа'}
                            seconds={timer.workSeconds}
                        />
                        <ButtonForNavbar
                            onPress={() => {
                                setTargetSeconds((prev) => (prev = 3))
                            }}
                            shadowColor='orange'
                            theme={theme}
                            title={locale ? 'Rest' : 'Отдых'}
                            seconds={timer.restSeconds}
                        />
                    </View>
                    <View
                        style={[
                            styles.nav,
                            { backgroundColor: theme.background }
                        ]}
                    >
                        <ButtonForNavbar
                            onPress={() => {
                                setTargetSeconds((prev) => (prev = 4))
                            }}
                            shadowColor='#34ebd2'
                            theme={theme}
                            title={locale ? 'tabatas' : 'Табаты'}
                            seconds={timer.tabatas}
                        />
                    </View>
                </View>
                <View style={styles.body}>
                    <View
                        style={[
                            styles.backCircleShadow,
                            {
                                shadowColor: stage.color,
                                borderColor: stage.color
                            }
                        ]}
                    ></View>
                    <CircularProgress
                        activeStrokeColor={stage.color}
                        progressValueColor={stage.color}
                        radius={160}
                        value={percent.percent}
                        fontSize={30}
                        title={
                            timer.seconds < 10
                                ? `${timer.minutes}:0${timer.seconds}`
                                : `${timer.minutes}:${timer.seconds}`
                        }
                        titleColor={stage.color}
                        titleStyle={{ fontWeight: 'bold' }}
                        valueSuffix={'%'}
                        inActiveStrokeColor='#000'
                        inActiveStrokeOpacity={0.2}
                    />
                </View>
                <View style={styles.navLast}>
                    <ButtonForTimer
                        img={
                            'https://cdn-icons-png.flaticon.com/512/2801/2801932.png'
                        }
                        theme={theme}
                        play={play}
                        onPress={handleDecrement}
                    />
                    <ButtonForTimer
                        img={
                            'https://cdn-icons-png.flaticon.com/512/748/748113.png'
                        }
                        theme={theme}
                        play={play}
                        onPress={handleIncrement}
                    />
                </View>
                <View style={styles.navLast}>
                    {play ? (
                        <ButtonForTimer
                            img={
                                'https://cdn-icons-png.flaticon.com/512/2920/2920686.png'
                            }
                            theme={theme}
                            onPress={() => {
                                setPlay(!play)
                            }}
                        />
                    ) : (
                        <ButtonForTimer
                            img={
                                'https://cdn-icons-png.flaticon.com/512/5577/5577228.png'
                            }
                            theme={theme}
                            onPress={() => {
                                setPlay(!play)
                            }}
                        />
                    )}
                    <ButtonForTimer
                        img={
                            'https://cdn-icons-png.flaticon.com/512/2618/2618245.png'
                        }
                        theme={theme}
                        onPress={handleReset}
                    />
                    {sound ? (
                        <ButtonForTimer
                            img={
                                'https://cdn-icons-png.flaticon.com/512/727/727240.png'
                            }
                            theme={theme}
                            onPress={() => {
                                setSound(!sound)
                            }}
                        />
                    ) : (
                        <ButtonForTimer
                            img={
                                'https://cdn-icons-png.flaticon.com/512/59/59284.png'
                            }
                            theme={theme}
                            onPress={() => {
                                setSound(!sound)
                            }}
                        />
                    )}
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    backCircleShadow: {
        width: 320,
        height: 320,
        position: 'absolute',
        zIndex: 0,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        borderWidth: 10,
        shadowRadius: 9,
        elevation: 14,
        borderRadius: '160%'
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
        width: '90%',
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
        width: '100%',
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    picture: {
        width: 40,
        height: 40
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    }
})
