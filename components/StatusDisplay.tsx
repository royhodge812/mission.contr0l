
import React from 'react';
import { MicIcon, BrainCircuitIcon, CheckCircleIcon, RocketIcon } from './Icons';

type AppStatus = 'idle' | 'listening' | 'processing' | 'success' | 'error';

interface StatusDisplayProps {
  status: AppStatus;
}

const statusConfig = {
    idle: {
        icon: RocketIcon,
        text: "Ready to define your mission.",
        color: "text-gray-400",
        pulse: false,
    },
    listening: {
        icon: MicIcon,
        text: "Listening to your mission brief...",
        color: "text-red-400",
        pulse: true,
    },
    processing: {
        icon: BrainCircuitIcon,
        text: "AI is crafting your webpage...",
        color: "text-blue-400",
        pulse: true,
    },
    success: {
        icon: CheckCircleIcon,
        text: "Mission page is ready for deployment!",
        color: "text-green-400",
        pulse: false,
    },
    error: {
        icon: CheckCircleIcon,
        text: "Mission aborted. Please try again.",
        color: "text-red-400",
        pulse: false,
    }
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className={`relative h-16 w-16 flex items-center justify-center ${config.color}`}>
                {config.pulse && <div className={`absolute inset-0 rounded-full bg-current opacity-20 animate-ping`}></div>}
                <Icon className="relative h-10 w-10"/>
            </div>
            <p className={`text-xl font-medium ${config.color}`}>{config.text}</p>
        </div>
    );
}
