/* eslint-disable no-unused-vars */
import { ScreenName, ScreenTitle, Theme } from '@constants/index';
import Header from '@containers/Header';
import { createStackNavigator } from '@react-navigation/stack';
import CashOut from '@screens/CashOut';
import ChangePassword from '@screens/ChangePassword';
import Policy from '@screens/Policy';
// screens
import {
    BookingDetail,
    CashIn,
    ConversationList, CreateAccount, CreateBooking,
    ForgotPassword,
    Home,
    LeaderBoard, Menu, Message, Notification,
    Onboarding, PartnerData, Personal,
    Profile, Settings, SignInWithOTP, SignUp,
    Support, UpdateInfoAccount,
    Verification
} from '@screens/index';
import React from 'react';

const Stack = createStackNavigator();
const {
    COLORS
} = Theme;

export const PersonalScreen = () => (
    <Stack.Screen
        name={ScreenName.PERSONAL}
        component={Personal}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.PERSONAL}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const CashOutScreen = () => (
    <Stack.Screen
        name={ScreenName.CASH_OUT}
        component={CashOut}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CASH_OUT}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const UpdateInfoAccountScreen = () => (
    <Stack.Screen
        name={ScreenName.UPDATE_INFO_ACCOUNT}
        component={UpdateInfoAccount}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.UPDATE_INFO_ACCOUNT}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const ProfileScreen = () => (
    <Stack.Screen
        name={ScreenName.PROFILE}
        component={Profile}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.PROFILE}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const HomeScreen = () => (
    <Stack.Screen
        name={ScreenName.HOME}
        component={Home}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.HOME}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const LeaderBoardScreen = () => (
    <Stack.Screen
        name={ScreenName.LEADER_BOARD}
        component={LeaderBoard}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.LEADER_BOARD}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

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

export const CreateBookingScreen = () => (
    <Stack.Screen
        name={ScreenName.CREATE_BOOKING}
        component={CreateBooking}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CREATE_BOOKING}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const BookingDetailScreen = () => (
    <Stack.Screen
        name={ScreenName.BOOKING_DETAIL}
        component={BookingDetail}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.BOOKING_DETAIL}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const CashInScreen = () => (
    <Stack.Screen
        name={ScreenName.CASH_IN}
        component={CashIn}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CASH_IN}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const CreateAccountScreen = () => (
    <Stack.Screen
        name={ScreenName.CREATE_ACCOUNT}
        component={CreateAccount}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CREATE_ACCOUNT}
                    options
                    navigation={navigation}
                    scene={scene}
                    showRight={false}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const MessageScreen = () => (
    <Stack.Screen
        name={ScreenName.MESSAGE}
        component={Message}
        options={
            ({ route, navigation, scene }) => ({
                header: () => (
                    <Header
                        title={route.params.name}
                        options
                        navigation={navigation}
                        scene={scene}
                        screenNameProp={ScreenName.MESSAGE}
                        userStatus={route.params.userStatus}
                    />
                ),
                cardStyle: { backgroundColor: COLORS.BASE }
            })
        }
    />
);

export const ConversationListScreen = () => (
    <Stack.Screen
        name={ScreenName.CONVERSATION_LIST}
        component={ConversationList}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CONVERSATION_LIST}
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

export const SettingsScreen = () => (
    <Stack.Screen
        name={ScreenName.SETTINGS}
        component={Settings}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.SETTINGS}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const ChangePasswordScreen = () => (
    <Stack.Screen
        name={ScreenName.CHANGE_PASSWORD}
        component={ChangePassword}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.CHANGE_PASSWORD}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const SignUpScreen = () => (
    <Stack.Screen
        name={ScreenName.SIGN_UP}
        component={SignUp}
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

export const PartnerDataScreen = () => (
    <Stack.Screen
        name={ScreenName.PARTNER_DATA}
        component={PartnerData}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.PARTNER_DATA}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const SignInWithOTPScreen = () => (
    <Stack.Screen
        name={ScreenName.SIGN_IN_WITH_OTP}
        component={SignInWithOTP}
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

export const ForgotPasswordScreen = () => (
    <Stack.Screen
        name={ScreenName.FORGOT_PASSWORD}
        component={ForgotPassword}
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

export const SupportScreen = () => (
    <Stack.Screen
        name={ScreenName.SUPPORT}
        component={Support}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.SUPPORT}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const VerificationScreen = () => (
    <Stack.Screen
        name={ScreenName.VERIFICATION}
        component={Verification}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.VERIFICATION}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);

export const PolicyScreen = () => (
    <Stack.Screen
        name={ScreenName.POLICY}
        component={Policy}
        options={{
            header: ({ navigation, scene }) => (
                <Header
                    title={ScreenTitle.POLICY}
                    options
                    navigation={navigation}
                    scene={scene}
                />
            ),
            cardStyle: { backgroundColor: COLORS.BASE }
        }}
    />
);
