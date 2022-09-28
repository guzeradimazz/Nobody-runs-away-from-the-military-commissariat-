import React from "react";

export const theme = {
    ligth: {
        theme:'light',
        color: 'black',
        background: '#e3f6fa',
        rippleColor:'#4f5b6e',
    },
    dark: {
        theme:'dark',
        color: '#e3f6fa',
        background: '#4f5b6e',
        rippleColor:'#e3f6fa',
    }
}

export const ThemeContext = React.createContext({})
