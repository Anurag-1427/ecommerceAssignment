import { create } from 'zustand';
import { saveAuthData, deleteToken, getAuthData } from '../auth/storage';

type User = {
    id?: string;
    name?: string;
    email?: string;
    photo?: string;
} | null;

type AuthState = {
    user: User;
    token: string | null;
    isLoading: boolean;
    setAuth: (user: User, token: string) => Promise<void>;
    logout: () => Promise<void>;
    restoreSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isLoading: true,

    setAuth: async (user, token) => {
        try {
            await saveAuthData(token, user);
            set({ user, token, isLoading: false });
        } catch (error) {
            console.error('Error setting auth:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await deleteToken();
            set({ user: null, token: null, isLoading: false });
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    },

    restoreSession: async () => {
        try {
            const authData = await getAuthData();
            if (authData && authData.token && authData.user) {
                // Token and user data exist, user was logged in before
                set({
                    token: authData.token,
                    user: authData.user,
                    isLoading: false,
                });
                console.log('Session restored with user:', authData.user);
            } else {
                // No valid auth data found, user needs to login
                set({ user: null, token: null, isLoading: false });
                console.log('No valid session found');
            }
        } catch (error) {
            console.error('Error restoring session:', error);
            set({ user: null, token: null, isLoading: false });
        }
    },
}));
