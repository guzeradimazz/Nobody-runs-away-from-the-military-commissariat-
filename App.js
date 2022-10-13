import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './Components/Home'
import { Settings } from './Components/Settings'
import { useState, useEffect } from 'react'
import { EventRegister } from 'react-native-event-listeners'
import { ThemeContext } from './utils/themeContext'
import { theme } from './utils/themeContext'
import { TimersList } from './Components/TimersList'
import { TabataTimer } from './Components/TabataTimer'

import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

export default function App() {
    const [mode, setMode] = useState(false)
    const [locale,setLocale] = useState(true)

    useEffect(() => {
        let eventListener = EventRegister.addEventListener(
            'changeTheme',
            (data) => {
                setMode(data)
            }
        )
        return () => {
            EventRegister.removeEventListener(eventListener)
        }
    })

    return (
        <ThemeContext.Provider value={mode ? theme.ligth : theme.dark}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name='Home'>
                        {(props) => <Home {...props} locale={locale} />}
                    </Stack.Screen>
                    <Stack.Screen name='TimersList'>
                        {(props) => <TimersList {...props} AsyncStorage={AsyncStorage} locale={locale}/>}
                    </Stack.Screen>
                    <Stack.Screen name='Timer'>
                        {(props) => <TabataTimer {...props} locale={locale} AsyncStorage={AsyncStorage} />}
                    </Stack.Screen>
                    <Stack.Screen name='Settings'>
                        {(props) => <Settings {...props} AsyncStorage={AsyncStorage} locale={locale} setLocale={setLocale}/>}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeContext.Provider>
    )
}
