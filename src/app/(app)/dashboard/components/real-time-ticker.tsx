"use client"

const tickerItems = [
    { type: "New Case", details: "Ward B, Patient #482, MRSA", level: "purple" },
    { type: "New Exposure", details: "ICU, Staff #102", level: "yellow" },
    { type: "Cleared", details: "Patient #312, VRE", level: "green" },
    { type: "New Case", details: "Surgical, Patient #519, C. diff", level: "purple" },
    { type: "Lab Alert", details: "Sample #991, C. auris", level: "purple" },
    { type: "New Exposure", details: "Ward C, Patient #604", level: "yellow" },
];

const TickerItem = ({ item }: { item: typeof tickerItems[0] }) => {
    const colorClasses = {
        purple: "bg-primary",
        yellow: "bg-yellow-500",
        green: "bg-green-500",
    };

    return (
        <div className="flex items-center space-x-2 flex-shrink-0 px-4">
            <div className={`w-2.5 h-2.5 rounded-full ${colorClasses[item.level as keyof typeof colorClasses]}`}></div>
            <span className="font-semibold text-sm">{item.type}:</span>
            <span className="text-sm text-muted-foreground">{item.details}</span>
        </div>
    );
};

export default function RealTimeTicker() {
    return (
        <div className="relative w-full h-10 flex items-center bg-muted/50 rounded-lg overflow-hidden border">
            <div className="absolute inset-0 flex items-center animate-ticker">
                {tickerItems.map((item, index) => (
                    <TickerItem key={index} item={item} />
                ))}
                 {tickerItems.map((item, index) => (
                    <TickerItem key={`clone-${index}`} item={item} />
                ))}
            </div>
            <style jsx>{`
                @keyframes ticker {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-ticker {
                    animation: ticker 40s linear infinite;
                    width: max-content;
                }
            `}</style>
        </div>
    );
}
