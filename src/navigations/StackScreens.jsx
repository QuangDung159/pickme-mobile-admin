/* eslint-disable no-unused-vars */
import { ScreenName, ScreenTitle, Theme } from '@constants/index';
import Header from '@containers/Header';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import {
    CashHistory, CashInRequest, CashOutRequest, CashOutRequestDetail, Menu, Notification,
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

export const CashInRequestScreen = () => (
    <Stack.Screen
        name={ScreenName.CASH_IN_REQUEST}
        component={CashInRequest}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CASH_IN_REQUEST}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const CashOutRequestScreen = () => (
    <Stack.Screen
        name={ScreenName.CASH_OUT_REQUEST}
        component={CashOutRequest}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CASH_OUT_REQUEST}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const CashHistoryScreen = () => (
    <Stack.Screen
        name={ScreenName.CASH_HISTORY}
        component={CashHistory}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CASH_HISTORY}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const CashOutRequestDetailScreen = () => (
    <Stack.Screen
        name={ScreenName.CASH_OUT_REQUEST_DETAIL}
        component={CashOutRequestDetail}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CASH_OUT_REQUEST_DETAIL}
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
