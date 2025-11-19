import { ACCOUNT_NAME, SERVICE_ID } from 'constants/constants';
import * as Keychain from 'react-native-keychain';

interface AuthData {
    token: string;
    user: any;
}

export const saveAuthData = async (token: string, user: any) => {
    try {
        if (!token || token.trim() === '') {
            throw new Error('Cannot save empty or null token');
        }
        const authData: AuthData = { token, user };
        await Keychain.setGenericPassword(ACCOUNT_NAME, JSON.stringify(authData), { service: SERVICE_ID });
        console.log('Auth data saved securely in Keychain');
    } catch (error) {
        console.error('Error saving auth data to Keychain:', error);
        throw error;
    }
};

export const saveToken = async (token: string) => {
    try {
        if (!token || token.trim() === '') {
            throw new Error('Cannot save empty or null token');
        }
        await Keychain.setGenericPassword(ACCOUNT_NAME, token, { service: SERVICE_ID });
        console.log('Token saved securely in Keychain');
    } catch (error) {
        console.error('Error saving token to Keychain:', error);
        throw error;
    }
};

export const saveUser = async (user: any) => {
    try {
        if (!user) {
            throw new Error('Cannot save empty or null user');
        }
        const userJson = JSON.stringify(user);
        await Keychain.setGenericPassword(ACCOUNT_NAME, userJson, { service: SERVICE_ID });
        console.log('User data saved securely in Keychain');
    } catch (error) {
        console.error('Error saving user to Keychain:', error);
        throw error;
    }
};

export const getAuthData = async (): Promise<{ token: string; user: any } | null> => {
    try {
        const credentials = await Keychain.getGenericPassword({ service: SERVICE_ID });
        if (credentials) {
            console.log('Auth data retrieved from Keychain');
            try {
                const authData = JSON.parse(credentials.password);
                if (authData.token && authData.user) {
                    return authData;
                }
            } catch {
                // If it's not JSON (old format with just token), return null
                return null;
            }
        }
        return null;
    } catch (error) {
        console.error('Error getting auth data from Keychain:', error);
        return null;
    }
};

export const getToken = async () => {
    try {
        const credentials = await Keychain.getGenericPassword({ service: SERVICE_ID });
        if (credentials) {
            console.log('Token retrieved from Keychain');
            // Try to parse as JSON first
            try {
                const authData = JSON.parse(credentials.password);
                return authData.token || credentials.password;
            } catch {
                return credentials.password;
            }
        }
        return null;
    } catch (error) {
        console.error('Error getting token from Keychain:', error);
        return null;
    }
};

export const getUser = async () => {
    try {
        const credentials = await Keychain.getGenericPassword({ service: SERVICE_ID });
        if (credentials) {
            console.log('User data retrieved from Keychain');
            try {
                const authData = JSON.parse(credentials.password);
                return authData.user || null;
            } catch {
                return null;
            }
        }
        return null;
    } catch (error) {
        console.error('Error getting user from Keychain:', error);
        return null;
    }
};

export const deleteToken = async () => {
    try {
        await Keychain.resetGenericPassword({ service: SERVICE_ID });
        console.log('Auth data deleted from Keychain');
    } catch (error) {
        console.error('Error deleting auth data from Keychain:', error);
        throw error;
    }
};

