import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from './firebaseConfig';

export const configureGoogle = () => {
    console.log('Configuring Google Sign-In with WEB_CLIENT_ID:', WEB_CLIENT_ID);
    GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
        iosClientId: WEB_CLIENT_ID,
        offlineAccess: true,
        forceCodeForRefreshToken: true,
        scopes: ['profile', 'email'],
    });
};

export async function signInWithGoogle(): Promise<User | null> {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        console.log('Google Sign-In Response:', JSON.stringify(userInfo, null, 2));

        // Check what's in the response
        console.log('Response keys:', Object.keys(userInfo || {}));
        console.log('userInfo.data.idToken:', (userInfo as any)?.data?.idToken);
        console.log('userInfo.data.serverAuthCode:', (userInfo as any)?.data?.serverAuthCode);

        return userInfo ? (userInfo as any) : null;
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled sign in');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Sign in in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play services not available or outdated');
        } else {
            console.error('Google signin error:', error.code, error.message, error);
        }
        throw error;
    }
}

export async function signOutGoogle(): Promise<void> {
    try {
        await GoogleSignin.signOut();
        await GoogleSignin.revokeAccess();
    } catch (e) {
        console.warn('Sign out error', e);
    }
}
