import React from 'react'
import {Switch as BaseSwitch} from 'react-native'
import defaultTheme from './Theme'

export default class Switch extends React.PureComponent {
    static defaultProps = {
        ...BaseSwitch.defaultProps,
        theme: defaultTheme,
    }

    static propTypes = BaseSwitch.propTypes

    render() {
        const {Switch: switchTheme = {}} = this.props.theme
        return <BaseSwitch
            {...this.props}
            onTintColor={switchTheme.onTintColor}
            thumbTintColor={switchTheme.thumbTintColor}
            tintColor={switchTheme.tintColor}
        />
    }
}
