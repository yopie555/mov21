import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Logo from '../../assets/movie.png'
import axios from 'axios'

const RegisterScreen = () => {
    const [name, setName] = React.useState('')
    const [nip, setNip] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigation = useNavigation();
    const handleRegister = async (value) => {
        console.log('data register', value);
        try {
            const response = await axios.post('http://192.168.43.41:3200/Users', {
                nip: value.nip,
                nama: value.name,
                password: value.password
            })
            if (response.data.status == 200) {
                console.log('response', response.data)
                navigation.navigate('LoginScreen')
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Nip"
                    placeholderTextColor="white"
                    value={nip}
                    onChangeText={(e) => setNip(e)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nama"
                    placeholderTextColor="white"
                    value={name}
                    onChangeText={(e) => setName(e)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                />
                <TouchableOpacity
                    style={styles.button}
                    // onPress={() => navigation.navigate('LoginScreen')}
                    onPress={async () => {
                        handleRegister({
                            nip: nip,
                            name: name,
                            password: password
                        })
                    }}
                >
                    <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Already have an account?
                    <Text
                        style={{ fontWeight: 'bold' }}
                        onPress={() => navigation.goBack()}
                    > Sign in</Text>
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
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#333',
        borderRadius: 10,
        color: 'white',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#f2ed46',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
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

export default RegisterScreen