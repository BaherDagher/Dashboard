'use client';

import LinePage from '@/app/(dashboard)/line/page';
import React from 'react';

const metrics = [
    {
        label: 'Total Revenue',
        value: '$25,400',
        description: 'Revenue increased by 15% compared to last month.',
        link: '#',
    },
    {
        label: 'Active Users',
        value: '1,345',
        description: 'User activity has remained steady, with a 3% increase.',
        link: '#',
    },
    {
        label: 'New Signups',
        value: '450',
        description: '25% higher than last week. Keep up the growth trend!',
        link: '#',
    },
    {
        label: 'Support Tickets',
        value: '75',
        description: '10 new tickets resolved this week.',
        link: '#',
    },
];

const HomeRow2 = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full ">
            {/* Chart Section */}
            <div className="flex-1 bg-white rounded-2xl shadow w-full md:pl-20 sm:pl-0 flex items-center justify-center min-h-[300px]">
                <LinePage compact />
            </div>

            {/* Metrics Section */}
            <div className="flex flex-col gap-3 w-full lg:w-[33%]">
                {metrics.map((metric, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow p-3">
                        <h4 className="text-gray-600 text-xs">{metric.label}</h4>
                        <p className="text-lg font-semibold text-blue-700">{metric.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{metric.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeRow2;