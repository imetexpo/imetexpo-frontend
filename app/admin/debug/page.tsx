// app/admin/debug/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAdminToken, getAdminUser } from "@/lib/api/auth";

export default function DebugPage() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [validationResult, setValidationResult] = useState<any>(null);

    useEffect(() => {
        const storedToken = getAdminToken();
        const storedUser = getAdminUser();
        setToken(storedToken);
        setUser(storedUser);

        if (storedToken) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            })
                .then(res => res.json())
                .then(data => setValidationResult(data))
                .catch(err => setValidationResult({ error: err.message }));
        }
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Debug Console</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Admin session diagnostic data</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
                <h2 className="text-sm font-bold text-gray-900 mb-3">Token Status</h2>
                <p className="text-sm text-gray-700">Token exists: {token ? "✅ Yes" : "❌ No"}</p>
                {token && (
                    <div className="mt-3 space-y-1">
                        <p className="text-xs text-gray-600">Token value: <span className="font-mono text-gray-800">{token.substring(0, 50)}...</span></p>
                        <p className="text-xs text-gray-600">Token length: {token.length}</p>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
                <h2 className="text-sm font-bold text-gray-900 mb-3">User Data</h2>
                <pre className="text-xs text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto border border-gray-200">{JSON.stringify(user, null, 2)}</pre>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
                <h2 className="text-sm font-bold text-gray-900 mb-3">Token Validation Result</h2>
                <pre className="text-xs text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto border border-gray-200">{JSON.stringify(validationResult, null, 2)}</pre>
            </div>
        </div>
    );
}
