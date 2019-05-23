import React, { Component } from 'react'
import {
  Platform,
  View,
} from 'react-native'
import Picker from 'react-native-universal-picker'
import defaultTheme from './Theme'

// TODO: FIXME
const HaveNoIdeaWhyThisIsNeeded = 3

const LabelIconWrapper = ({ children, inlineLabel, theme }) => <View style={{
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  height: inlineLabel
    ? theme.FormGroup.height - theme.FormGroup.borderWidth * 2
    : theme.FormGroup.height - HaveNoIdeaWhyThisIsNeeded,
}}>{children}</View>

LabelIconWrapper.defaultProps = {
  theme: defaultTheme
}

const SelectWrapper = ({ children, inlineLabel, theme }) => <View style={{
  flex: inlineLabel ? .5 : 1,
  height: inlineLabel
    ? theme.FormGroup.height - theme.FormGroup.borderWidth * 2
    : theme.FormGroup.height - HaveNoIdeaWhyThisIsNeeded,
}}>{children}</View>

SelectWrapper.defaultProps = {
  theme: defaultTheme
}

export default class Select extends Component {
  // static propTypes = {
  //   labelKey: PropTypes.string,
  //   placeholder: PropTypes.string,
  //   onValueChange: PropTypes.func,
  //   options: PropTypes.array.isRequired,
  //   valueKey: PropTypes.string
  // }

  static defaultProps = {
    componentName: 'Select',
    placeholder: '',
    labelKey: 'label',
    valueKey: 'value',
    value: ''
  }

  state = {
    value: this.props.value
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) this.onValueChange(nextProps.value)
  }

  onValueChange = (newValue) => {
    if (typeof this.props.onValueChange === 'function') this.props.onValueChange(newValue)
    this.setState({ value: newValue })
  }

  render() {
    const {
      inlineLabel,
      labelKey,
      options,
      onValueChange,
      placeholder,
      valueKey,
      theme,
      ...rest
    } = this.props
    const { value } = this.state

    return <SelectWrapper inlineLabel={inlineLabel} theme={theme}>
      <Picker
        onValueChange={this.onValueChange}
        selectedValue={value}
        style={{
          height: theme.FormGroup.height,
          ...(Platform.OS === 'ios'
            ? {
              marginLeft: 0,
            }
            : {
              color: value ? theme.Input.color : theme.BaseInput.placeholderColor,
              // Ugly workaround, can't find the reason for the padding
              marginLeft: -7,
            }
          ),
        }}
        itemStyle={{
          // color: value ? theme.Input.color : theme.BaseInput.placeholderColor,
          color: theme.Input.color,
          fontSize: theme.BaseInput.fontSize,
          paddingTop: 6,
        }}
        {...rest}>
        {[{ label: placeholder }, ...options].map(option => <Picker.Item
          key={value || 'undefined'}
          label={option[labelKey]}
          value={option[valueKey]} />
        )}
      </Picker>
    </SelectWrapper>
  }
}
