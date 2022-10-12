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
import { ModalColorPicker } from './ModalColorPicker'
import { BackButton } from './BackButton'

export const TimersList = ({ navigation }) => {
    const theme = useContext(ThemeContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedColor, setSelectedColor] = useState('#000')

    const [timerName, setTimerName] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [timers, setTimers] = useState([])

    async function fetchTimers() {
        setIsLoading(true)
        await getTimers()
        setIsLoading(false)
    }

    useEffect(() => {
        fetchTimers()
    }, [])

    const deleteTimer = async (item) => {
        const parsedData = await AsyncStorage.getItem('timers')
        const filteredData = JSON.parse(parsedData).filter((i) => {
            return i.id != item.id
        })
        AsyncStorage.clear()
        setTimers(filteredData)
        await AsyncStorage.setItem('timers', JSON.stringify(filteredData))
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
                id: id,
                color: selectedColor
            }

            try {
                timers
                    ? setTimers([...timers, newTimer])
                    : setTimers([newTimer])
                await AsyncStorage.setItem(
                    'timers',
                    JSON.stringify([...timers, newTimer])
                )
            } catch (err) {
                console.log(err)
            }
            setTimerName('')
        } else alert('Input is empty')
    }

    const getTimers = async () => {
        await AsyncStorage.getItem('timers', (err, result) => {
            setTimers(JSON.parse(result))
        }).catch((err) => console.log(err))
    }

    if (isLoading) return <Loading />
    else
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
                <View
                    style={{
                        flex: 1,
                        width: '90%',
                        height: '80%',
                        marginTop: '30%',
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
                            <ModalColorPicker
                                color={selectedColor}
                                setColor={setSelectedColor}
                                modalVisible={modalVisible}
                                setModalVisible={setModalVisible}
                            />
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                                style={{
                                    height: 50,
                                    justifyContent: 'center',
                                    width: '20%'
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: theme.color,
                                        fontSize: 22
                                    }}
                                >
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
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={fetchTimers}
                            />
                        }
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
                                        { backgroundColor: item.color }
                                    ]}
                                >
                                    <View style={styles.listItemWrapper}>
                                        <Text style={[{ color: '#fff' }]}>
                                            {item.name}
                                        </Text>
                                        <Pressable
                                            onPress={() => {
                                                deleteTimer(item)
                                            }}
                                        >
                                            <Image
                                                style={styles.picture}
                                                source={{
                                                    uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png'
                                                }}
                                            />
                                        </Pressable>
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
