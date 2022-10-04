import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Pressable,
    Image,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { ThemeContext } from '../utils/themeContext'
import { Loading } from './Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ColorPicker from 'react-native-color-picker-ios'


export const TimersList = ({ navigation }) => {
    const theme = useContext(ThemeContext)

    const [timerName, setTimerName] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [timers, setTimers] = useState([])

    useEffect(() => {
        console.log(timers)
    })

    const selectColor = () => {
        ColorPicker.showColorPicker(
            (color) => {
                console.log(color)
            }
        )
    }
    const addTimer = async () => {
        if (timerName) {
            const id = 'id' + Math.random().toString(16).slice(2)
            const newTimer = {
                name: timerName,
                prepareSeconds: 3,
                workSeconds: 30,
                restSeconds: 7,
                tabatas: 2,
                id: id
            }

            try {
                timers
                    ? setTimers([...timers, newTimer])
                    : setTimers([newTimer])
                const output = JSON.stringify(timers)
                await AsyncStorage.setItem('timers', output)
                setTimerName('')
            } catch (error) {
                console.log(error)
            }
        } else alert('Input is empty')
    }
    const getTimers = async () => {
        try {
            const data = await AsyncStorage.getItem('timers')
            const output = JSON.parse(data)
            setTimers(output)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function fetchTimers() {
            await getTimers()
            setIsLoading(false)
        }
        fetchTimers()
    }, [])

    if (isLoading) return <Loading />
    else
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
                <View
                    style={{
                        flex: 1,
                        width: '90%',
                        height: '80%',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            width: '90%',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}
                        >
                            <TextInput
                                value={timerName}
                                onChangeText={(data) => setTimerName(data)}
                                style={styles.input}
                            />
                            <Pressable
                                onPress={selectColor}
                                style={{
                                    backgroundColor: '#fff',
                                    height: 50,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    width: '20%'
                                }}
                            >
                                <Text style={{ textAlign: 'center' }}>
                                    Color
                                </Text>
                            </Pressable>
                        </View>
                        <Pressable
                            onPress={addTimer}
                            style={{
                                backgroundColor: theme.background,
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.color,
                                    padding: 10,
                                    fontSize: 22
                                }}
                                t
                            >
                                Add
                            </Text>
                        </Pressable>
                    </View>
                    <FlatList
                        display='flex'
                        flexDirection='column'
                        paddingLeft={10}
                        paddingRight={10}
                        marginBottom={50}
                        width={350}
                        height={100}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={isLoading}
                        //         onRefresh={fetchTimers}
                        //     />
                        // }
                        extraData={timers}
                        data={timers}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Timer', {
                                        prepareSecondsIN: item.prepareSeconds,
                                        workSecondsIN: item.workSeconds,
                                        restSecondsIN: item.restSeconds,
                                        tabatasIN: item.tabatas
                                    })
                                }}
                            >
                                <View
                                    style={[
                                        styles.listItem,
                                        { backgroundColor: theme.background }
                                    ]}
                                >
                                    <View style={styles.listItemWrapper}>
                                        <Text
                                            style={[, { color: theme.color }]}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        width: '75%',
        height: 50,
        marginTop: 20,
        fontSize: 22,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 5
    },
    listItemWrapper: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    list: {
        marginTop: 50,
        flexDirection: 'column',
        width: '100%'
    },
    listItem: {
        backgroundColor: '#e3f6fa',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        borderRadius: 15
    },
    settingsWrapper: {
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
