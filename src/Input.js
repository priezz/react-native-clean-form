import React from 'react'
import { TextInput, View } from 'react-native'
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

// Subtract the border of the form group to have a full height input
const StyledInput = ({ children, inlineLabel, multiline, numberOfLines, placeholderTextColor, theme }) => <TextInput style={{
  flex: inlineLabel ? .5 : 1,
  color: theme.Input.color,
  fontSize: theme.BaseInput.fontSize,
  lineHeight: theme.BaseInput.lineHeight,
  textAlignVertical: determineTextOrientation({ multiline, numberOfLines }),
}}>{children}</TextInput>

StyledInput.defaultProps = {
  theme: defaultTheme
}

class Input extends React.Component {
  render() {
    return (
      <InputWrapper
        inlineLabel={this.props.inlineLabel}
        multiline={this.props.multiline}
        numberOfLines={this.props.numberOfLines}>
        <StyledInput
          inlineLabel={this.props.inlineLabel}
          placeholderTextColor={this.props.theme.BaseInput.placeholderColor}
          {...this.props} />
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
