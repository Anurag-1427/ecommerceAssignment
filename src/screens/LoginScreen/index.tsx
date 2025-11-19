import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { configureGoogle, signInWithGoogle } from '../../auth/GoogleAuth';
import { useAuthStore } from '../../store/auth.store';
import { assets } from 'assets';
import { style } from './styles';

const {width} = Dimensions.get('window');
const styles = style(width);

const LoginScreen = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    configureGoogle();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const info: any = await signInWithGoogle();
      console.log('Full Google response:', JSON.stringify(info, null, 2));
      
      if (info) {
        let token = (info as any).data.idToken;
        
        if (!token || token.trim() === '') {
          console.warn('No standard token found, creating fallback...');
          token = (info as any).user?.email || 
                  (info as any).email || 
                  (info as any).id || 
                  (info as any).user?.id || 
                  'guest_token';
        }
        
        console.log('Token to use:', token);
        
        if (!token || token.trim() === '') {
          console.log('Sign-in Error, Could not get token from Google Sign-In. Response: ' + JSON.stringify(info));
          return;
        }
        
        await setAuth({
          id: (info as any)?.data?.user?.id,
          name: (info as any)?.data?.user?.name,
          email: (info as any)?.data?.user?.email,
          photo: (info as any)?.data?.user?.photo,
        }, token);
      }
    } catch (e: any) {
      console.error('Sign-in error:', e);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🛍️</Text>
          </View>
          <Text style={styles.appName}>ShopHub</Text>
          <Text style={styles.tagline}>Your Ultimate Shopping Destination</Text>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeSubtitle}>Sign in to your account and discover amazing deals</Text>
        </View>

        {/* Sign In Section */}
        <View style={styles.signinSection}>
          <Text style={styles.signinTitle}>Sign In</Text>
          
          <TouchableOpacity
            style={styles.googleButtonLarge}
            onPress={handleGoogleSignIn}
            activeOpacity={0.8}
          >
            <Image source={assets.images.googleLogo} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            By signing in, you agree to our{' '}
            <Text style={styles.footerLink}>Terms & Conditions</Text>
            {' '}and{' '}
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
