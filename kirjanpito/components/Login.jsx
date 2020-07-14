import React, { useState } from 'react';
import theme from '../theme';
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../reducers/loginReducer';

const Login = () => {
  const isLogin = useSelector((state) => state.login.isLogin);
  const [key, setKey] = useState('');
  const dispatch = useDispatch();
  const submitLogin = async (key) => {
    dispatch(signIn(key));
    console.log('isLogin', isLogin);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.loginFrame}>
          <View style={styles.textFrame}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Kirjautumistunnus:
            </Text>
          </View>
          <TextInput
            style={styles.loginInput}
            onChangeText={(text) => setKey(text)}
          />
          <View style={styles.buttonFrame}>
            <Button title='Kirjaudu' onPress={() => submitLogin(key)} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4ca165',
    opacity: 0.8,
    flex: 1,
  },
  loginFrame: {
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width * 0.9,
    maxWidth: 400,
    height: 200,
    backgroundColor: theme.colors.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textFrame: {
    width: window.width * 0.82,
    maxWidth: 390,
    marginBottom: 4,
  },
  loginInput: {
    backgroundColor: 'white',
    width: window.width * 0.82,
    maxWidth: 390,
    height: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  buttonFrame: {
    marginTop: 5,
    width: window.width * 0.82,
    maxWidth: 390,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
});
