import React from 'react'
import { Platform, TextInput, View } from 'react-native'
import defaultTheme from './Theme'

/**
 * Calculates the flex value based on the inlineLabel and numberOfLines
 * properties.
 *
 * @param {Object} props
 * @returns {number}
 */
const calculateFlexValue = ({ inlineLabel, multiline, numberOfLines }) => inlineLabel
  ? 0.5
  : multiline && numberOfLines > 0
    ? numberOfLines + 1
    : 1

/**
 * Decide how the text should be aligned for the input. This decision is based upon
 * the field properties. A multiline input should start top and not centered.
 *
 * @param {Object} props
 * @returns {string}
 */
const determineTextAlignment = ({ multiline, numberOfLines }) => {
  let orientation = 'center'
  if (multiline && numberOfLines > 1) orientation = 'top'

  return (orientation)
}

class Input extends React.Component {
  render() {
    const { inlineLabel = true, multiline, numberOfLines, theme = defaultTheme, ...rest } = this.props
    console.log('[Input/render]', this.props)
    return <TextInput
      allowFontScaling
      multiline={numberOfLines > 1}
      numberOfLines={numberOfLines}
      placeholderTextColor={this.props.theme.BaseInput.placeholderColor}
      style={{
        height: (theme.Input.lineHeight || theme.BaseInput.lineHeight) * (Platform.OS == 'android' ? 2.2 : 1.1),
        flex: calculateFlexValue({ inlineLabel, multiline, numberOfLines }),
        textAlignVertical: determineTextAlignment({ multiline, numberOfLines }),
        ...theme.BaseInput,
        ...theme.Input,
      }}
      {...rest}
    />
  }
}

export default Input
