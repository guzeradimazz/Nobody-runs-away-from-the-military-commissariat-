import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './Components/Home'
import { Timer } from './Components/Timer'
import { Settings } from './Components/Settings'

import { useState, useEffect } from 'react'
import { EventRegister } from 'react-native-event-listeners'
import { ThemeContext } from './utils/themeContext'
import { theme } from './utils/themeContext'

const Stack = createNativeStackNavigator()

export default function App() {
    const [mode, setMode] = useState(false)

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
                        {(props) => <Home {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name='Timer'>
                        {(props) => <Timer {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name='Settings'>
                        {(props) => <Settings {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeContext.Provider>
    )
}
