interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (current / total) * 100));

    return (
        <div className="w-full">
            <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2 uppercase tracking-widest">
                <span>Question {current}</span>
                <span>{total} Total</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
