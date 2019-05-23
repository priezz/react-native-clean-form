import React from 'react'
import { View } from 'react-native'
import defaultTheme from './Theme'

const ButtonGroup = ({ children, theme }) => <View style={{
  height: theme.Button.height,
}}>{children}</View>

ButtonGroup.defaultProps = {
  theme: defaultTheme,
  componentName: 'ButtonGroup'
}

export default ButtonGroup
