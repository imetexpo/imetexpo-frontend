// app/admin/settings/page.tsx
"use client";

import { useState } from "react";
import { Save, Globe, Bell, Shield, Palette, Mail, Lock, Users, Database, Server, MailCheck } from "lucide-react";
import LoadingDots from '@/components/ui/LoadingDots';
import toast from "react-hot-toast";

interface SettingSection {
    id: string;
    title: string;
    icon: any;
    description: string;
}

const sections: SettingSection[] = [
    { id: "general", title: "General Settings", icon: Globe, description: "Site title, exhibition dates, and venue" },
    { id: "notifications", title: "Notifications", icon: Bell, description: "Email and dashboard notification preferences" },
    { id: "security", title: "Security & Auth", icon: Shield, description: "Authentication, session, and access control" },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState("general");
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            toast.success("Settings saved successfully!");
        }, 800);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
                <p className="text-sm text-gray-500 mt-1">Manage exhibition parameters, notification preferences, and admin credentials</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="lg:w-64 space-y-1.5">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition text-left cursor-pointer ${
                                    isActive
                                        ? "bg-[#003A77] text-white font-medium shadow-sm"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-white bg-white/50 border border-transparent hover:border-gray-200"
                                }`}
                            >
                                <Icon size={18} className={isActive ? "text-white" : "text-[#003A77]"} />
                                <div>
                                    <p className="text-sm font-semibold leading-tight">{section.title}</p>
                                    <p className={`text-[11px] mt-0.5 leading-tight ${isActive ? "text-white/80" : "text-gray-400"}`}>
                                        {section.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl border border-gray-200/80 shadow-xs p-6">
                    {/* General Settings */}
                    {activeSection === "general" && (
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Exhibition Information</h2>
                            <div className="space-y-4 max-w-2xl">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Exhibition Official Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="IndiaMET 2027"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Tagline / Industry Sector
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="International Exhibition on Industrial Metrology & Testing Technologies"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Exhibition Dates
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="May 13-15, 2027"
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Venue City
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Pune International Exhibition Centre (PIECC)"
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Official Support Email
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="info@indiametexpo.com"
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Contact Phone
                                        </label>
                                        <input
                                            type="tel"
                                            defaultValue="+91 20 2740 0000"
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Settings */}
                    {activeSection === "notifications" && (
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Notification Alerts</h2>
                            <div className="space-y-3.5 max-w-2xl">
                                <div className="flex items-center justify-between p-4 bg-gray-50/60 border border-gray-200/80 rounded-xl">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">New Exhibitor Registrations</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Send admin email when a new exhibitor signs up</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003A77]"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50/60 border border-gray-200/80 rounded-xl">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Payment Confirmations</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Instant alert upon verification of invoice payments</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003A77]"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50/60 border border-gray-200/80 rounded-xl">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Service Requirement Orders</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Alert when an exhibitor requests furniture, electricity, or utilities</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003A77]"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeSection === "security" && (
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Security Credentials</h2>
                            <div className="space-y-4 max-w-2xl">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50/60 border border-gray-200/80 rounded-xl mt-2">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Automatic Session Timeout</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Auto log out administrator after idle period</p>
                                    </div>
                                    <select className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00A1B1] cursor-pointer">
                                        <option>30 minutes</option>
                                        <option>1 hour</option>
                                        <option>2 hours</option>
                                        <option>Never</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm font-medium transition flex items-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
                        >
                            {saving ? (
                                <LoadingDots size="sm" tone="light" />
                            ) : (
                                <Save size={18} />
                            )}
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
