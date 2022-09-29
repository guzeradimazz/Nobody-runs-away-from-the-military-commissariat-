import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Pressable,
    Image,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity
} from 'react-native'
import { ThemeContext } from '../utils/themeContext'
import axios from 'axios'
import { Loading } from './Loading'

export const TimersList = ({ navigation }) => {
    const theme = useContext(ThemeContext)

    const [isLoading, setIsLoading] = useState(true)
    const [timers, setTimers] = useState([])

    const fetchTimers = () => {
        setIsLoading(true)
        axios
            .get('https://633472fc301bbc0a6211dfea.mockapi.io/Timers')
            .then(({ data }) => {
                setTimers(data)
            })
            .catch((err) => {
                console.log(err)
                alert('Error to get timers!!!')
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
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
