// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getAdminToken, getAdminUser } from '@/lib/api/auth';

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = getAdminToken();
        const storedUser = getAdminUser();

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
            setIsAuthenticated(true);
        } else {
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
        }

        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success && data.data) {
                const { token, user } = data.data;

                // Store in localStorage both formats for seamless compatibility
                localStorage.setItem('adminToken', token);
                localStorage.setItem('adminUser', JSON.stringify(user));
                localStorage.setItem('admin_token', token);
                localStorage.setItem('admin_user', JSON.stringify(user));

                setToken(token);
                setUser(user);
                setIsAuthenticated(true);

                return { success: true, data: { token, user }, user };
            } else {
                const errMsg = data.error || data.message || 'Invalid email or password';
                setError(errMsg);
                return { success: false, error: errMsg };
            }
        } catch (err: any) {
            const errMsg = err.message || 'Login failed. Please check your credentials.';
            setError(errMsg);
            return { success: false, error: errMsg };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        loading: isLoading,
        error,
        login,
        logout,
    };
}
