import React from 'react'
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import defaultTheme from './Theme'

const ButtonWrapper = ({ children }) => <View style={{
  flex: 1,
  alignSelf: 'stretch',
  flexDirection: 'column',
  justifyContent: 'center',
}}>{children}</View>

const ButtonStyle = ({ children, theme }) => <View style={{
  backgroundColor: theme.Button.backgroundColor,
  height: theme.Button.height,
}}>{children}</View>

ButtonStyle.defaultProps = {
  theme: defaultTheme
}

const ButtonTextWrapper = ({ children }) => <View style={{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}}>{children}</View>

const ButtonText = ({ children, theme }) => <Text style={{
  color: theme.Button.color,
  fontSize: theme.Button.fontSize,
  fontWeight: theme.Button.fontWeight,
}}>{children}</Text>

ButtonText.defaultProps = {
  theme: defaultTheme,
  componentName: 'Button'
}

const Button = props => {
  const { children: label, icon, iconPlacement, submitting, theme, ...rest } = props

  const Touchable = Platform.OS === 'android'
    ? TouchableNativeFeedback
    : TouchableOpacity

  const formattedLabel = Platform.OS === 'android'
    ? label.toUpperCase()
    : label

  const children = [
    formattedLabel
  ]

  let IconWrapped = null
  if (icon || submitting) {
    const IconComponent = submitting
      ? <ActivityIndicator size="small" key="icon" color={theme.Button.color} />
      : <Icon key="icon" name={icon} size={14} color={theme.Button.color} />

    const prop = iconPlacement === 'left'
      ? 'marginRight'
      : 'marginLeft'

    IconWrapped = React.createElement(View, {
      children: IconComponent,
      style: {
        [prop]: 5
      }
    })
  }

  return (
    <ButtonWrapper>
      <Touchable {...rest}>
        <ButtonStyle theme={theme}>
          <ButtonTextWrapper>
            {iconPlacement === 'left' && IconWrapped}
            <ButtonText theme={theme}>
              {children}
            </ButtonText>
            {iconPlacement === 'right' && IconWrapped}
          </ButtonTextWrapper>
        </ButtonStyle>
      </Touchable>
    </ButtonWrapper>
  )
}

// Button.propTypes = {
//   children: PropTypes.string.isRequired,
//   icon: PropTypes.string,
//   iconPlacement: PropTypes.oneOf(['left', 'right']),
//   submitting: PropTypes.bool
// }

Button.defaultProps = {
  icon: false,
  iconPlacement: 'left',
  submitting: false,
  theme: defaultTheme
}

export default Button
