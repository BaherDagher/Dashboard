'use client';
import { FaEnvelope, FaShoppingCart, FaUserPlus, FaChartBar } from 'react-icons/fa';

const cards = [
    {
        title: '15,639',
        subtitle: 'Emails Sent',
        percent: '+18%',
        icon: <FaEnvelope className="text-blue-500 text-xl" />,
    },
    {
        title: '468,325',
        subtitle: 'Sales Obtained',
        percent: '+25%',
        icon: <FaShoppingCart className="text-orange-500 text-xl" />,
    },
    {
        title: '37,931',
        subtitle: 'New Clients',
        percent: '+7%',
        icon: <FaUserPlus className="text-blue-700 text-xl" />,
    },
    {
        title: '1,532,731',
        subtitle: 'Traffic Received',
        percent: '+48%',
        icon: <FaChartBar className="text-orange-400 text-xl" />,
    },
];

const HomeRow1 = () => {
    return (
        <div className="flex flex-wrap gap-4 w-full">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-center flex-1 min-w-[200px] bg-white shadow rounded-2xl p-3"
                >
                    <div className="mb-1">{card.icon}</div>
                    <h2 className="text-lg font-semibold">{card.title}</h2>
                    <p className="text-gray-500 text-xs">{card.subtitle}</p>
                    <p className="text-green-600 mt-0.5 text-sm font-medium">{card.percent}</p>
                </div>
            ))}
        </div>
    );
};

export default HomeRow1;