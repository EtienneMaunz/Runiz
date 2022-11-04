import { Button, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Home(props) {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to Runiz!</Text>
      <Button
        color={ theme.colors.primary }
        title="Go to Details"
        onPress={() => props.navigation.navigate('User')}
      />
    </View>
  );
}