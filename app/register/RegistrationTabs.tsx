"use client";

import { MessageSquare, Home, Star, FileText } from "lucide-react";
import {
  RegistrationTab,
  REGISTRATION_TABS,
  buildRegisterUrl,
} from "./registrationRoutes";

const TAB_LABELS: Record<RegistrationTab, string> = {
  enquiry: "Enquiry",
  exhibitor: "Exhibitor",
  sponsor: "Sponsor",
  brochure: "Brochure",
};

const TAB_ICONS: Record<RegistrationTab, React.ComponentType<{ className?: string }>> = {
  enquiry: MessageSquare,
  exhibitor: Home,
  sponsor: Star,
  brochure: FileText,
};

interface RegistrationTabsProps {
  activeTab: RegistrationTab;
  onTabChange: (tab: RegistrationTab) => void;
}

export default function RegistrationTabs({ activeTab, onTabChange }: RegistrationTabsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
      {REGISTRATION_TABS.map((tab) => {
        const Icon = TAB_ICONS[tab];
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`flex items-center justify-center gap-2 py-4 px-3 text-sm font-bold uppercase tracking-wide transition-colors ${
              isActive
                ? "bg-[#CC9808] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon className="w-4 h-4" />
            {TAB_LABELS[tab]}
          </button>
        );
      })}
    </div>
  );
}