import React from "react";

export const theme = {
    ligth: {
        theme:'light',
        color: '#424c5c',
        background: '#e3f6fa',
        rippleColor:'#424c5c',
    },
    dark: {
        theme:'dark',
        color: '#e3f6fa',
        background: '#424c5c',
        rippleColor:'#e3f6fa',
    }
}

export const ThemeContext = React.createContext({})
