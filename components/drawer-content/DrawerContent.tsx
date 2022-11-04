import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Caption, Drawer, IconButton, Switch, Text, Title, useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthenticationState, { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import { version } from '../../package.json';

export default function DrawerContent(props) {
    const theme = useTheme();

    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
    const { setAuthenticationState, authenticationState } = React.useContext(AuthenticationContext);

    function signOut() {
        setAuthenticationState(new AuthenticationState());
    }

    return (
        <View style={styles.drawerContent}>
            <View style={styles.drawerHeader}>
                <View style={{ position: "relative" }}>
                    {authenticationState.user?.picture ? (
                        <Avatar.Image
                            source={{ uri: authenticationState.user?.picture }}
                            size={60}/>
                    ) : (
                        <Avatar.Text
                            color={theme.colors.onPrimary}
                            label={authenticationState.user?.initials}
                            size={60}/>
                    )}
                    <IconButton
                        style={styles.editAccountButton}
                        icon="account-edit"
                        iconColor={theme.colors.onBackground}
                        size={24}
                        onPress={() => props.navigation.navigate("User")}
                    />
                </View>
                <View style={styles.userInfos}>
                    <Title numberOfLines={1} style={styles.userName}>{authenticationState.user?.userName}</Title>
                    <Caption numberOfLines={1}>{authenticationState.user?.email}</Caption>
                </View>
            </View>
            <DrawerContentScrollView>
                <Drawer.Section>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="home"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => { props.navigation.navigate("Home") }}
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
            <View>
                <Drawer.Section>
                    <Title>Preferences</Title>
                    <View style={styles.preferencesView}>
                        <Text>Dark theme</Text>
                        <Switch
                            onValueChange={() => toggleTheme()}
                            color={theme.colors.primary}
                            value={isThemeDark}
                        />
                    </View>
                </Drawer.Section>
                <Drawer.Section>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign Out"
                        onPress={() => signOut()}
                    />
                </Drawer.Section>
                <View style={styles.versionContainer}>
                    <Text>Runiz version {version}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        padding: 8
    },
    drawerHeader: {
        flexDirection: "row",
    },
    userInfos: {
        marginLeft: 10
    },
    userName: {
        fontSize: 18,
        width: 180
    },
    email: {
        width: 160
    },
    versionContainer: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "center"
    },
    editAccountButton: {
        position: "absolute",
        left: 26,
        top: 26,
        zIndex: 2
    },
    preferencesView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});