import 'react-native-gesture-handler';
import * as React from 'react';
import { DarkTheme as NavigationDarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Home from './components/home/Home';
import User from './components/user/User';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider, adaptNavigationTheme } from 'react-native-paper';
import { runizDarkTheme, runizLightTheme } from './styles/runniz-theme';
import DrawerContent from './components/drawer-content/DrawerContent';
import { PreferencesContext } from './contexts/PreferencesContext';
import AuthenticationState, { AuthenticationContext } from './contexts/AuthenticationContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const { LightTheme, DarkTheme } = adaptNavigationTheme({ light: DefaultTheme, dark: NavigationDarkTheme });

const CombinedLightTheme = {
  ...runizLightTheme,
  ...LightTheme,
  colors: {
    ...runizLightTheme.colors,
    ...LightTheme.colors,
  },
};

const CombinedDarkTheme = {
  ...runizDarkTheme,
  ...DarkTheme,
  colors: {
    ...runizDarkTheme.colors,
    ...DarkTheme.colors,
  },
};

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const [authenticationState, signIn] = React.useState(new AuthenticationState());
  const theme = isThemeDark ? CombinedDarkTheme : CombinedLightTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  const setAuthenticationState = React.useCallback((auth: AuthenticationState) => {
    return signIn(auth);
  }, [authenticationState]);

  const authentication = React.useMemo(
    () => ({
      setAuthenticationState,
      authenticationState
    }),
    [setAuthenticationState, authenticationState]
  );

  return (
    <AuthenticationContext.Provider value={authentication}>
      <PreferencesContext.Provider value={preferences}>
        <Provider theme={theme}>
          <NavigationContainer theme={theme}>
            {authentication.authenticationState.token ? (
              <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="Home" options={{ title: "Home" }} component={Home} />
              <Drawer.Screen name="User" options={{ title: "User details" }} component={User} />
            </Drawer.Navigator>
            ) : (
              <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name="SignIn" options={{ title: "Sign in" }} component={SignIn}/>
                <Stack.Screen name="SignUp" options={{ title: "Sign up" }} component={SignUp}/>
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </Provider>
      </PreferencesContext.Provider>
    </AuthenticationContext.Provider>
  );
}