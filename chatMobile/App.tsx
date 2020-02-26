import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('2', { name: 'Jane' })}
      />
      <Text style={styles.title}>
        The title and onPress handler are required. It is recommended to set
        accessibilityLabel to help make your app usable by everyone.
      </Text>
      <Button
        title='Press me'
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </View>
  )
}
function HomeScreen1({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title='Go toprofile'
        onPress={() => navigation.navigate('1', { name: 'Jane' })}
      />
      <Button
        title='Go toprofile'
        onPress={() => navigation.navigate('2', { name: 'Jane' })}
      />
    </SafeAreaView>
  )
}
const Stack = createStackNavigator()
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert
} from 'react-native'
import Constants from 'expo-constants'

function Separator() {
  return <View style={styles.separator} />
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='1'
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name='2'
            component={HomeScreen1}
            options={{ title: 'Welcome' }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <Separator />
      <View>
        <Text style={styles.title}>
          Adjust the color in a way that looks standard on each platform. On
          iOS, the color prop controls the color of the text. On Android, the
          color adjusts the backgroud color of the button.
        </Text>
        <Button
          title='Press me'
          color='#f194ff'
          onPress={() => Alert.alert('Button with adjusted color pressed')}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          All interaction for the component are disabled.
        </Text>
        <Button
          title='Press me'
          disabled
          onPress={() => Alert.alert('Cannot press this one')}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          This layout strategy lets the title define the width of the button.
        </Text>
        <View style={styles.fixToText}>
          <Button
            title='Left button'
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title='Right button'
            onPress={() => Alert.alert('Right button pressed')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
  title: {
    textAlign: 'center',
    marginVertical: 8
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})
