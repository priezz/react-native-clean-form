import React from 'react'
import { View } from 'react-native'
import pick from 'lodash/pick'
import defaultTheme from './Theme'

/**
 * Calculate the height based on the given field properties.
 * The inline label and multiline properties affect the height.
 *
 * @param {Object} props
 * @returns {number}
 */
const calculateHeight = ({ inlineLabel, multiline, numberOfLines, theme }) => {
  let height = theme.FormGroup.height
  if (multiline) height = theme.FormGroup.height * numberOfLines
  if (!inlineLabel) height += theme.Label.stackedHeight

  return height
}

const FormGroupWrapper = ({
  border, children, error, inlineLabel, multiline, numberOfLines, theme,
}) => <View style={{
  alignItems: inlineLabel ? 'center' : 'stretch',
  borderColor: error ? theme.FormGroup.errorBorderColor : theme.FormGroup.borderColor,
  borderRadius: theme.FormGroup.borderRadius,
  borderStyle: theme.FormGroup.borderStyle,
  borderWidth: border ? theme.FormGroup.borderWidth : 0,
  flexDirection: inlineLabel ? 'row' : 'column',
  justifyContent: 'flex-start',
  height: calculateHeight({ inlineLabel, multiline, numberOfLines, theme }),
  marginBottom: theme.FormGroup.marginBottom,
  paddingTop: theme.FormGroup.paddingTop,
  paddingRight: theme.FormGroup.paddingRight,
  paddingBottom: theme.FormGroup.paddingBottom,
  paddingLeft: theme.FormGroup.paddingLeft,
}}>{children}</View>

FormGroupWrapper.defaultProps = {
  theme: defaultTheme,
  componentName: 'FormGroupWrapper'
}

const FormGroup = props => {
  const { border, error, inlineLabel, theme, multiline, numberOfLines, keyboardType, returnKeyType } = props
  const children = React.Children.map(props.children, child => {
    let subsetOfProps = {}
    if (child.componentName === 'Input') {
      const inputPropTypes = Object.keys(child.type.propTypes)
      subsetOfProps = pick(props, inputPropTypes);
    }

    return React.cloneElement(child, Object.assign({}, child.props, {
      inlineLabel, theme, ...subsetOfProps
    }))
  })

  return (
    <FormGroupWrapper border={border} error={error} inlineLabel={inlineLabel}
      multiline={multiline} numberOfLines={numberOfLines} theme={theme}>
      {children}
    </FormGroupWrapper>
  )
}

// FormGroup.propTypes = {
//   border: PropTypes.bool,
//   error: PropTypes.bool,
// }

FormGroup.defaultProps = {
  componentName: 'FormGroup',
  border: true,
  error: false,
  inlineLabel: true,
  numberOfLines: 1,
  multiline: false
}

export default FormGroup
