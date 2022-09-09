import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './Components/Home'
import { Timer } from './Components/Timer'
import { Settings } from './Components/Settings'

const Stack = createNativeStackNavigator()

export default function App() {
    const shadowProps = {
        left: true,
        top: true,
        right: false,
        bottom: false,
        shadowColor: '#fff',
        shadowRadius: 15,
        shadowOffset: 10,
        shadowOpacity: 1,
        elevation: 1
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='Home'>
                    {(props) => <Home {...props} shadowProps={shadowProps} />}
                </Stack.Screen>
                <Stack.Screen name='Timer'>
                    {(props) => <Timer {...props} shadowProps={shadowProps} />}
                </Stack.Screen>
                <Stack.Screen name='Settings'>
                    {(props) => (<Settings {...props} shadowProps={shadowProps} />)}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
