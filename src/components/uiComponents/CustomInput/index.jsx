import { IconFamily, Theme } from '@constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import IconCustom from '../IconCustom';

const {
    FONT: {
        TEXT_REGULAR,
        TEXT_BOLD
    },
    SIZES,
    COLORS
} = Theme;

CustomInput.propTypes = {
    label: PropTypes.string,
    inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    rightIcon: PropTypes.object,
    onPressRightIcon: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    editable: PropTypes.bool
};

CustomInput.defaultProps = {
    label: '',
    inputStyle: {},
    labelStyle: {},
    containerStyle: {},
    rightIcon: null,
    onPressRightIcon: null,
    value: '',
    editable: true
};

export default function CustomInput({
    label,
    labelStyle, inputStyle,
    containerStyle,
    onPressRightIcon,
    value,
    editable,
    ref,
    rightIcon, ...props
}) {
    const renderTextInputBase = () => (
        <TextInput
            style={
                [
                    {
                        borderColor: COLORS.ACTIVE,
                        borderWidth: 1,
                        borderRadius: 20,
                        height: 36,
                        paddingHorizontal: 10,
                        fontFamily: TEXT_BOLD,
                        fontSize: SIZES.FONT_H3,
                        color: COLORS.DEFAULT,
                        width: SIZES.WIDTH_BASE * 0.9,
                        textAlign: 'center',
                        backgroundColor: editable || COLORS.INPUT
                    },
                    inputStyle,
                ]
            }
            value={value?.toString() || ''}
            placeholderTextColor={COLORS.PLACE_HOLDER}
            ref={ref}
            autoCapitalize="none"
            {...props}
        />
    );

    const renderTextInputByRight = () => {
        if (rightIcon) {
            const {
                size, color, name, family
            } = rightIcon;
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <View
                        style={{
                            flex: 9
                        }}
                    >
                        {renderTextInputBase()}
                    </View>

                    <View
                        style={{
                            width: SIZES.WIDTH_BASE * 0.1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            marginRight: 10,
                            flex: 1,
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => {
                                if (onPressRightIcon) onPressRightIcon();
                            }}
                        >
                            <IconCustom
                                size={size || 30}
                                color={color || COLORS.DEFAULT}
                                name={name || 'home'}
                                family={family || IconFamily.FONT_AWESOME}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }

        return (
            <>
                {renderTextInputBase()}
            </>
        );
    };

    return (
        <View
            style={!rightIcon ? containerStyle : [containerStyle, {
                width: SIZES.WIDTH_BASE * 0.9
            }]}
        >
            {label !== '' && (
                <Text
                    style={
                        [
                            {
                                fontFamily: TEXT_REGULAR,
                                fontSize: SIZES.FONT_H3,
                                color: COLORS.ACTIVE,
                                marginBottom: 3
                            },
                            labelStyle
                        ]
                    }
                >
                    {label}
                </Text>
            )}
            {renderTextInputByRight()}
        </View>
    );
}
