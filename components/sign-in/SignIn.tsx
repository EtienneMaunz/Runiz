import * as React from 'react';
import { StyleSheet, View } from "react-native";
import { Caption, Button, TextInput, Title, useTheme } from "react-native-paper";
import AuthenticationState, { AuthenticationContext } from '../../contexts/AuthenticationContext';
import User from '../../model/User';

export default function SignIn(props) {
    const theme = useTheme();

    const { setAuthenticationState, authenticationState } = React.useContext(AuthenticationContext);

    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    function forgotPassword() {
        // TODO
        console.log("Forgot password");
    }

    function login() {
        // TODO: API -> Check credentials and generate token
        setAuthenticationState(new AuthenticationState({
            user: new User({
                userName: userName
            }),
            token: "123test"
        }));
    }

    return (
        <View style={styles.mainContainer}>
            <Title style={styles.loginTitle}>Login</Title>
            <View style={styles.loginForm}>
                <TextInput
                    mode="outlined"
                    label="Username"
                    placeholder="Type your username"
                    value={userName}
                    left={<TextInput.Icon icon="account" />}
                    onChangeText={text => setUserName(text)}
                />
                <TextInput
                    style={styles.passwordInput}
                    mode="outlined"
                    label="Password"
                    placeholder="Type your password"
                    value={password}
                    secureTextEntry
                    left={<TextInput.Icon icon="lock" />}
                    onChangeText={text => setPassword(text)}
                />
                <Caption style={styles.forgotPassword} onPress={() => forgotPassword()}>Forgot password?</Caption>
                <Button
                    disabled={!userName || !password}
                    buttonColor={theme.colors.primary}
                    style={styles.loginButton}
                    mode="contained"
                    onPress={() => login()}>LOGIN</Button>
                <Button
                    buttonColor={theme.colors.secondary}
                    style={styles.loginButton}
                    mode="contained"
                    onPress={() => props.navigation.navigate("SignUp")}>SIGN UP</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    loginTitle: {
        padding: 30,
        fontSize: 32,
        fontWeight: "bold"
    },
    loginForm: {
        width: "80%"
    },
    passwordInput: {
        marginTop: 16
    },
    forgotPassword: {
        alignSelf: "flex-end"
    },
    loginButton: {
        marginTop: 16
    }
});