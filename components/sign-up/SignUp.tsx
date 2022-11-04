import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Caption, Button, TextInput, useTheme, Title, ProgressBar, Text } from "react-native-paper";
import { getPasswordStrength, passwordStrengthOptions } from "../../utilities/PasswordStrength";

export default function SignUp(props) {
    const theme = useTheme();


    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordStrength, setPasswordStrength] = React.useState(0);
    const [passwordStrengthColor, setPasswordStrengthColor] = React.useState("");
    const [passwordValidationMessage, setPasswordValidationMessage] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [passwordConfirmValidationMessage, setPasswordConfirmValidationMessage] = React.useState("");
    const [isValidForm, setValidForm] = React.useState(false);

    function checkPasswordConfirmMatches(password: string, passwordConfirm: string) {
        if (password != passwordConfirm) {
            setPasswordConfirmValidationMessage("Passwords don't match");
            return false;
        }

        setPasswordConfirmValidationMessage("");
        return true;
    }

    function checkFormValidity(password: string, passwordConfirm: string, passwordValidationMessage: string, userName: string) {
        const passwordsMatch = checkPasswordConfirmMatches(password, passwordConfirm);

        if (!userName || !password || !passwordConfirm || !passwordsMatch) {
            setValidForm(false);
            return;
        }

        setValidForm(passwordValidationMessage !== passwordStrengthOptions[0].value);
    }

    function onPasswordChange(text: string) {
        setPassword(text);
        const passwordStrength = getPasswordStrength(text);

        setPasswordValidationMessage(passwordStrength.value);
        setPasswordStrength(passwordStrength.id / passwordStrengthOptions.length);

        switch (passwordStrength.id) {
            case 1:
                setPasswordStrengthColor("red");
                break;
            case 2:
                setPasswordStrengthColor("orange");
                break;
            case 3:
                setPasswordStrengthColor("lightgreen");
                break;
            case 4:
                setPasswordStrengthColor("green");
                break;
        }

        checkFormValidity(text, passwordConfirm, passwordStrength.value, userName);
    }

    function onPasswordConfirmChange(text: string) {
        setPasswordConfirm(text)
        checkFormValidity(password, text, passwordValidationMessage, userName);
    }

    function onUserNameChange(text: string) {
        setUserName(text);
        checkFormValidity(password, passwordConfirm, passwordValidationMessage, text);
    }

    function signUp() {
        // TODO: API -> Create new user
        props.navigation.navigate("SignIn");
    }

    return (
        <View style={styles.mainContainer}>
            <Title style={styles.signUpTitle}>Create a new account</Title>
            <View style={styles.signUpForm}>
                <TextInput
                    mode="outlined"
                    label="Username"
                    placeholder="Type your username"
                    value={userName}
                    left={<TextInput.Icon icon="account" />}
                    onChangeText={text => onUserNameChange(text)}
                />
                <TextInput
                    style={styles.passwordInput}
                    mode="outlined"
                    label="Password"
                    placeholder="Type your password"
                    value={password}
                    secureTextEntry
                    left={<TextInput.Icon icon="lock" />}
                    onChangeText={text => onPasswordChange(text)}
                />
                {password && passwordStrength && passwordStrength !== 0 &&
                    <View style={styles.passwordStrength}>
                        <ProgressBar progress={passwordStrength} color={passwordStrengthColor} />
                        <Caption style={{ color: passwordStrengthColor, alignSelf: "flex-end" }}>{passwordValidationMessage}</Caption>
                    </View>
                }
                <TextInput
                    style={styles.passwordInput}
                    mode="outlined"
                    label="Confirm password"
                    placeholder="Type your password"
                    value={passwordConfirm}
                    secureTextEntry
                    left={<TextInput.Icon icon="lock" />}
                    onChangeText={text => onPasswordConfirmChange(text)}
                />
                {passwordConfirm && passwordConfirmValidationMessage &&
                    <Caption style={{ ...styles.passwordValidationMessage, color: "red" }}>{passwordConfirmValidationMessage}</Caption>
                }
                <Button
                    disabled={!isValidForm}
                    buttonColor={theme.colors.primary}
                    style={styles.signUpButton}
                    mode="contained"
                    onPress={() => signUp()}>SIGN UP</Button>
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
    signUpTitle: {
        padding: 30,
        fontSize: 24,
        fontWeight: "bold"
    },
    signUpForm: {
        width: "80%"
    },
    passwordInput: {
        marginTop: 16
    },
    signUpButton: {
        marginTop: 20
    },
    passwordValidationMessage: {
        alignSelf: "flex-end"
    },
    passwordStrength: {
        marginTop: 8,
        flexDirection: "column",
    }
});