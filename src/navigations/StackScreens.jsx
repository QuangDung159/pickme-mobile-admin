/* eslint-disable no-unused-vars */
import { ScreenName, ScreenTitle, Theme } from '@constants/index';
import Header from '@containers/Header';
import { createStackNavigator } from '@react-navigation/stack';
import CashRequest from '@screens/CashRequest';
// screens
import {
    Menu, Notification,
    Onboarding
} from '@screens/index';
import ValidationRequest from '@screens/ValidationRequest';
import React from 'react';

const Stack = createStackNavigator();
const {
    COLORS
} = Theme;

export const MenuScreen = () => (
    <Stack.Screen
        name={ScreenName.MENU}
        component={Menu}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.MENU}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const NotificationScreen = () => (
    <Stack.Screen
        name={ScreenName.NOTIFICATION}
        component={Notification}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.NOTIFICATION}
                    options
                    navigation={navigation}
                    scene={scene}
                    screenNameProp={ScreenName.NOTIFICATION}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const OnboardingScreen = () => (
    <Stack.Screen
        name={ScreenName.ONBOARDING}
        component={Onboarding}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title=""
                    back
                    white
                    transparent
                    navigation={navigation}
                    scene={scene}
                    showRight={false}
                />
            ),
            headerTransparent: true
        }}
    />
);

export const CashRequestScreen = () => (
    <Stack.Screen
        name={ScreenName.CASH_REQUEST}
        component={CashRequest}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CASH_REQUEST}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const ValidationRequestScreen = () => (
    <Stack.Screen
        name={ScreenName.VALIDATION_REQUEST}
        component={ValidationRequest}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.VALIDATION_REQUEST}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);
