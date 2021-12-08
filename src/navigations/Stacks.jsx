/* eslint-disable no-unused-vars */
import { ScreenName, Theme } from '@constants/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    CashHistoryScreen, CashInRequestScreen, CashOutRequestScreen, MenuScreen, NotificationScreen,
    OnboardingScreen, ValidationRequestScreen
} from './StackScreens';
import TabIcon from './TabIcon';

const { COLORS } = Theme;

const Stack = createStackNavigator();

const MenuStack = () => (
    <Stack.Navigator mode="card" headerMode="screen">
        {MenuScreen()}
        {CashInRequestScreen()}
        {CashOutRequestScreen()}
        {CashHistoryScreen()}
        {ValidationRequestScreen()}
    </Stack.Navigator>
);

const NotificationStack = () => (
    <Stack.Navigator mode="card" headerMode="screen">
        {NotificationScreen()}
        {CashInRequestScreen()}
        {CashOutRequestScreen()}
        {CashHistoryScreen()}
        {ValidationRequestScreen()}
    </Stack.Navigator>
);

const OnboardingStack = () => (
    <Stack.Navigator initialRouteName={ScreenName.ONBOARDING} mode="card" headerMode="none">
        {OnboardingScreen()}
        {MenuScreen()}
    </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const BottomTabMenuStack = () => {
    const numberMessageUnread = useSelector(
        (state) => state.messageReducer.numberMessageUnread
    );

    let numberMessageUnreadDisplay = 0;
    if (numberMessageUnread > 99) {
        numberMessageUnreadDisplay = '99+';
    } else if (numberMessageUnread > 0) {
        numberMessageUnreadDisplay = numberMessageUnread;
    }

    const numberNotificationUnread = useSelector(
        (state) => state.notificationReducer.numberNotificationUnread
    );

    const tabOptions = {};
    let numberNotiDisplay = 0;

    if (numberNotificationUnread !== 0) {
        if (numberNotificationUnread > 99) {
            numberNotiDisplay = '99+';
        } else {
            numberNotiDisplay = numberNotificationUnread;
        }

        tabOptions.tabBarBadge = numberNotiDisplay;
    }

    return (
        <Tab.Navigator
            initialRouteName={ScreenName.MENU}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => (
                    <TabIcon route={route} color={color} focused={focused} size={24} />
                ),
            })}
            tabBarOptions={{
                activeTintColor: COLORS.ACTIVE,
                inactiveTintColor: COLORS.DEFAULT,
                showLabel: false,
                activeBackgroundColor: COLORS.BASE,
                inactiveBackgroundColor: COLORS.BASE
            }}
        >
            <Tab.Screen
                name={ScreenName.MENU}
                component={MenuStack}
            />
            <Tab.Screen
                name={ScreenName.NOTIFICATION}
                component={NotificationStack}
                options={tabOptions}
            />
        </Tab.Navigator>
    );
};

export default function AppStack() {
    return (
        <Stack.Navigator mode="card" headerMode="none">
            <Stack.Screen name={ScreenName.ONBOARDING} component={OnboardingStack} />
            <Stack.Screen
                name={ScreenName.APP}
                component={BottomTabMenuStack}
            />
        </Stack.Navigator>
    );
}
