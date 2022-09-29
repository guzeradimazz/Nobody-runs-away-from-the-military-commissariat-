import { useContext } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ThemeContext } from '../utils/themeContext'

export const Loading = () => {
    const theme = useContext(ThemeContext)
    return (
        <View
            style={[
                styles.settingsWrapper,
                {
                    backgroundColor: theme.background,
                    justifyContent: 'center'
                }
            ]}
        >
            <ActivityIndicator color={'#fff'} size={'large'} />
            <Text
                style={{
                    fontSize: 30,
                    color: '#fff',
                    fontWeight: 'bold',
                    marginTop: 20
                }}
            >
                Loading...
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    settingsWrapper: {
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
})
