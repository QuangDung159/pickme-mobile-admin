import { IconFamily, Theme } from '@constants/index';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import ProfileInfoItem from './ProfileInfoItem';

const {
    SIZES,
} = Theme;

export default function SubInfoProfile({ user }) {
    return (
        <View
            style={{
                width: SIZES.WIDTH_BASE * 0.9,
                alignSelf: 'center',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <ProfileInfoItem
                    fontSize={SIZES.FONT_H3}
                    iconName={user.isMale ? 'male' : 'female'}
                    iconFamily={IconFamily.FONTISTO}
                    content={`${user.isMale ? 'Nam' : 'Nữ'}`}
                    iconSize={18}
                />
                <ProfileInfoItem
                    fontSize={SIZES.FONT_H3}
                    iconName="birthday-cake"
                    iconFamily={IconFamily.FONT_AWESOME}
                    content={moment(user.dob).format('YYYY').toString().toLowerCase() !== 'invalid date'
                        ? moment(user.dob).format('YYYY').toString()
                        : '1990'}
                    iconSize={18}
                />
                <ProfileInfoItem
                    fontSize={SIZES.FONT_H3}
                    iconName="weight"
                    iconFamily={IconFamily.FONT_AWESOME_5}
                    content={`${user.weight} kg`}
                    iconSize={18}
                />
                <ProfileInfoItem
                    fontSize={SIZES.FONT_H3}
                    iconName="human-male-height"
                    iconFamily={IconFamily.MATERIAL_COMMUNITY_ICONS}
                    content={`${user.height} cm`}
                    iconSize={18}
                />
            </View>
            <ProfileInfoItem
                fontSize={SIZES.FONT_H3}
                iconName="home"
                iconFamily={IconFamily.FONT_AWESOME_5}
                content={`${user.homeTown || 'N/a'}`}
                iconSize={18}
            />
            <ProfileInfoItem
                fontSize={SIZES.FONT_H3}
                iconName="badminton"
                iconFamily={IconFamily.MATERIAL_COMMUNITY_ICONS}
                content={`${user.interests || 'N/a'}`}
                iconSize={18}
                containerStyle={{ alignItems: 'flex-start' }}
                iconContainerStyle={{
                    marginTop: 3
                }}
                contentTextStyle={{ width: SIZES.WIDTH_BASE * 0.9 - 25 }}
            />
        </View>
    );
}

SubInfoProfile.propTypes = {
    user: PropTypes.object.isRequired
};
