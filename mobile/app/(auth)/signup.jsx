import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles/signup.styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import COLORS from '../../constants/colors'
import { useRouter } from 'expo-router'
export default function Signup() {


    const router = useRouter()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSignup = () => { }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>BookWorm</Text>
                        <Text style={styles.subtitle}>Share your fav reads</Text>
                    </View>


                    <View style={styles.formContainer}>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Username</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name='person-outline' size={20} color={COLORS.primary} style={styles.inputIcon} />
                                <TextInput style={styles.input} placeholder='John doe' placeholderTextColor={COLORS.placeholderText} value={username}
                                    onChangeText={setUsername} autoCapitalize='none' />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name='mail-outline' size={20} color={COLORS.primary} style={styles.inputIcon} />
                                <TextInput style={styles.input} placeholder='johndoe@gmail.com' placeholderTextColor={COLORS.placeholderText} value={email}
                                    onChangeText={setEmail} autoCapitalize='none' />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name='lock-closed-outline' size={20} color={COLORS.primary} style={styles.inputIcon} />
                                <TextInput style={styles.input} placeholder='*****' keyboardType='default' placeholderTextColor={COLORS.placeholderText} value={password}
                                    onChangeText={setPassword} autoCapitalize='none' secureTextEntry={!showPassword} />

                                <TouchableOpacity style={styles.eyeIcon} onPress={() => {
                                    setShowPassword(!showPassword)
                                }}>
                                    <Ionicons name={`${showPassword ? "eye-outline" : "eye-off-outline"}`} size={20} color={COLORS.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
                            {
                                isLoading ? <ActivityIndicator color={"#fff"} /> : <Text style={styles.buttonText}>Sign Up</Text>
                            }
                        </TouchableOpacity>



                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => {
                                router.back()
                            }}>
                                <Text style={styles.link}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}