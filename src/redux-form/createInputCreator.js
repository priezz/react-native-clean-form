import React from 'react'
import { View, Text } from 'react-native'
import { FormGroup, Label } from '../../index'
import defaultTheme from '../Theme'

const ErrorMessage = ({ children, theme }) => <Text style={{
  color: theme.ErrorMessage.color,
  fontSize: theme.ErrorMessage.fontSize,
  marginBottom: theme.ErrorMessage.marginBottom,
  textAlign: theme.ErrorMessage.textAlign,
}}>{children}</Text>

ErrorMessage.defaultProps = {
  theme: defaultTheme
}

const render = renderComponent => props => {
  const { border, input: { onChange, ...restInput }, label, inlineLabel, theme, meta: { touched, error } } = props

  return (
    <View>
      <FormGroup border={border} inlineLabel={inlineLabel} theme={theme} error={touched && !!error} {...props} >
        <Label theme={theme}>{label}</Label>
        {renderComponent(props)}
      </FormGroup>
      {touched && error && <ErrorMessage theme={theme}>{error}</ErrorMessage>}
    </View>
  )
}


const createInputCreator = ReduxFormFieldComponent => (name, renderFunction, PropTypesOverrides = {}, defaultProps = {}) => {
  const Component = render(renderFunction)
  Component.displayName = name

  const FieldWrapper = props => {
    const { component, name, ...rest } = props

    return <ReduxFormFieldComponent name={name} component={Component} {...rest} />
  }

  FieldWrapper.displayName = 'FieldWrapper'
  // FieldWrapper.propTypes = Object.assign({
  //   border: PropTypes.bool,
  //   inlineLabel: PropTypes.bool,
  //   label: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired
  // }, PropTypesOverrides)
  FieldWrapper.defaultProps = Object.assign({
    border: FormGroup.defaultProps.border,
    inlineLabel: FormGroup.defaultProps.inlineLabel
  }, defaultProps)

  return FieldWrapper
}

export default createInputCreator
