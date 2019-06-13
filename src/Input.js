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
const calculateFlexValue = ({ inlineLabel, multiline, numberOfLines }) => {
  let flex = 1
  if (multiline && numberOfLines > 0) flex = numberOfLines + 1
  if (inlineLabel) flex = 0.5

  return flex
}

/**
 * Decide how the text should be aligned for the input. This decision is based upon
 * the field properties. A multiline input should start top and not centered.
 *
 * @param {Object} props
 * @returns {string}
 */
const determineTextOrientation = ({ multiline, numberOfLines }) => {
  let orientation = 'center'
  if (multiline && numberOfLines > 1) orientation = 'top'

  return (orientation)
}

// When doing stacked labels we want the input to be greedy
const InputWrapper = ({ children, inlineLabel, multiline, numberOfLines, }) => <View style={{
  flex: calculateFlexValue({ inlineLabel, multiline, numberOfLines }),
  justifyContent: 'center',
}}>{children}</View>

InputWrapper.defaultProps = {
  theme: defaultTheme
}

class Input extends React.Component {
  render() {
    const { inlineLabel, multiline, numberOfLines, theme = defaultTheme, ...rest } = this.props

    return (
      <InputWrapper
        inlineLabel={inlineLabel}
        multiline={multiline}
        numberOfLines={numberOfLines}
      >
        <TextInput
          allowFontScaling
          numberOfLines={numberOfLines}
          placeholderTextColor={this.props.theme.BaseInput.placeholderColor}
          style={{
            color: theme.Input.color,
            flex: inlineLabel ? .5 : 1,
            fontSize: theme.BaseInput.fontSize,
            height: Platform.OS == 'android' ? theme.BaseInput.lineHeight * 2 : theme.BaseInput.lineHeight,
            lineHeight: theme.BaseInput.lineHeight,
            textAlignVertical: determineTextOrientation({ multiline, numberOfLines }),
          }}
          {...rest}
        />
      </InputWrapper>
    )
  }
}

// Input.propTypes = {
//   ...TextInput.propTypes,
//   inlineLabel: PropTypes.bool.isRequired
// }

Input.defaultProps = {
  componentName: 'Input',
  inlineLabel: true,
  theme: defaultTheme
}

export default Input
