import React, { PureComponent } from 'react';
import { IconCustom } from '@components/uiComponents';
import { IconFamily, ScreenName } from '@constants/index';

export default class TabIcon extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: 'home',
            family: IconFamily.FONT_AWESOME,
            size: 24
        };
    }

    componentDidMount() {
        this.configIcon();
    }

    configIcon = () => {
        const { route } = this.props;

        switch (route.name) {
            case ScreenName.NOTIFICATION: {
                this.setState({
                    name: 'notifications-active',
                    family: IconFamily.MATERIAL_ICONS,
                    size: 28
                });
                break;
            }
            case ScreenName.MENU: {
                this.setState({
                    name: 'md-menu',
                    family: IconFamily.IONICONS,
                    size: 38
                });
                break;
            }
            default: {
                this.setState({
                    name: 'home',
                    family: IconFamily.FONT_AWESOME
                });
                break;
            }
        }
    }

    render() {
        const {
            name, family, size
        } = this.state;

        const { color } = this.props;
        return (
            <IconCustom name={name} size={size} color={color} family={family} />
        );
    }
}
