import { Theme } from '@constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';

const {
    FONT: {
        TEXT_REGULAR,
        TEXT_BOLD
    },
    SIZES,
    COLORS
} = Theme;

export default function StepIndicator({
    type, buttonText, content
}) {
    let indicatorStyle = styles.stepIndicatorCurrent;
    let buttonFontColor = COLORS.BASE;
    switch (type) {
        case 'next': {
            indicatorStyle = styles.stepIndicatorNext;
            break;
        }
        case 'prev': {
            indicatorStyle = styles.stepIndicatorPrev;
            break;
        }
        default: {
            buttonFontColor = COLORS.ACTIVE;
            break;
        }
    }
    return (
        <View
            style={{
                flexDirection: 'row'
            }}
        >
            <View
                style={styles.stepIndicatorContainer}
            >
                <CustomButton
                    buttonStyle={indicatorStyle}
                    labelStyle={{
                        fontFamily: TEXT_BOLD,
                        fontSize: SIZES.FONT_H4,
                        color: buttonFontColor
                    }}
                    label={buttonText}
                />
            </View>

            <View
                style={styles.contentContainer}
            >
                <Text
                    style={{
                        color: COLORS.DEFAULT,
                        fontSize: SIZES.FONT_H3,
                        fontFamily: TEXT_REGULAR
                    }}
                >
                    {content}
                </Text>
            </View>
        </View>
    );
}

StepIndicator.propTypes = {
    type: PropTypes.oneOf(['next', 'current', 'prev']),
    buttonText: PropTypes.string,
    content: PropTypes.string
};

StepIndicator.defaultProps = {
    type: 'current',
    buttonText: '1',
    content: 'Booking was rejected'
};

const styles = StyleSheet.create({
    stepIndicatorCurrent: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        marginHorizontal: 5,
        backgroundColor: COLORS.TRANSPARENT,
        borderColor: COLORS.ACTIVE,
        borderWidth: 3,
    },
    stepIndicatorNext: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        marginHorizontal: 5,
        backgroundColor: COLORS.INPUT,
        borderWidth: 0,
    },
    stepIndicatorPrev: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        marginHorizontal: 5,
        backgroundColor: COLORS.ACTIVE,
        borderWidth: 0
    },
    stepIndicatorContainer: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    contentContainer: {
        marginLeft: 10,
        alignSelf: 'center',
        width: SIZES.WIDTH_BASE * 0.8
    }
});
