import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import Logo from '../../assets/movie.png'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [nip, setNip] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (value) => {
       console.log('data login', value.nip);
        try {
            const response = await axios.post(
                'http://192.168.43.41:3200/Users/login',{
                    nip: value.nip,
                    password: value.password
                })
                console.log('response', response.data);
                if(response.data.status == 200){
                    ToastAndroid.show('Login Success', ToastAndroid.SHORT);
                    navigation.navigate('HomepageScreen')
                    AsyncStorage.setItem('password', value.password)
                    AsyncStorage.setItem('nip', value.nip)
                    AsyncStorage.setItem('nama', response.data.users.nama)
                }
        } catch (error) {
            console.log('error', error.message);
            ToastAndroid.show('Periksa Kembali NIP dan Password anda', ToastAndroid.SHORT);
        }
    }
    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
            />
            <Text
                style={{
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: 'bold'
                }}
            >
                Movie App
            </Text>
            <View>
                <TextInput
                    placeholder="Nip"
                    placeholderTextColor="#fff"
                    style={styles.input}
                    value={nip}
                    onChangeText={(e) => setNip(e)}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    style={styles.input}
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                />
                <TouchableOpacity
                    style={styles.buttonLogin}
                    // onPress={() => navigation.navigate('HomeScreen')}
                    onPress={ async () => {
                        await handleLogin({ nip, password });
                    }}
                >
                    <Text
                        style={styles.textLogin}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
                <Text style={styles.text}>Don't have an account?
                    <Text
                        style={{ fontWeight: 'bold' }}
                        onPress={() => navigation.navigate('RegisterScreen')}
                    >
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 150,
        height: 150
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#333',
        borderRadius: 10,
        color: '#fff',
        paddingHorizontal: 20,
        marginBottom: 10
    },
    buttonLogin: {
        width: 300,
        height: 50,
        backgroundColor: '#f2ed46',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textLogin: {
        color: '#000',
        fontSize: 20,
    },
    text: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
    },
})

export default LoginScreen
