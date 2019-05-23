import React from 'react'
import { Text, View } from 'react-native'
import defaultTheme from './Theme'

const FieldsetLabelText = ({ children, theme }) => <Text style={{
  color: theme.Fieldset.labelColor,
  fontSize: theme.Fieldset.labelSize,
  fontWeight: theme.Fieldset.labelWeight,
  height: theme.Fieldset.labelHeight,
}}>{children}</Text>

FieldsetLabelText.defaultProps = {
  theme: defaultTheme
}

const FieldsetLabel = ({ children }) => <View><FieldsetLabelText>
  {children}
</FieldsetLabelText></View>

const FieldsetWrapper = ({ children, last, theme }) => <View style={{
  borderBottomColor: theme.Fieldset.borderBottomColor,
  borderBottomWidth: last ? 0 : theme.Fieldset.borderBottomWidth,
  paddingTop: theme.Fieldset.paddingTop,
  paddingRight: theme.Fieldset.paddingRight,
  paddingBottom: theme.Fieldset.paddingBottom,
  paddingLeft: theme.Fieldset.paddingLeft,
}}>{children}</View>

FieldsetWrapper.defaultProps = {
  theme: defaultTheme
}

const FieldsetFormWrapper = ({ children }) => <View>{children}</View>

const Fieldset = props => {
  const { children, label, last, theme } = props

  return (
    <FieldsetWrapper last={last} theme={theme}>
      { /* text-transform is for some reason not supported in react native https://github.com/facebook/react-native/issues/2088 */}
      {label && <FieldsetLabel>{label.toUpperCase()}</FieldsetLabel>}
      <FieldsetFormWrapper>
        {children}
      </FieldsetFormWrapper>
    </FieldsetWrapper>
  )
}

// Fieldset.propTypes = {
//   last: PropTypes.bool,
//   label: PropTypes.string
// }

Fieldset.defaultProps = {
  componentName: 'Fieldset',
  last: false,
  label: false,
  theme: defaultTheme
}

export default Fieldset
