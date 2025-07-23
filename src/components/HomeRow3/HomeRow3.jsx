'use client';

const notifications = [
    { title: 'Server Maintenance Scheduled', subtitle: 'Tomorrow at 3:00 AM' },
    { title: 'New User Signups', subtitle: '5 new signups today' },
    { title: 'Security Alert', subtitle: 'Unusual login detected' },
];

const activity = [
    { user: 'Baher Osama', action: 'Logged in', date: '2025-07-23' },
    { user: 'Yara Magdy', action: 'Uploaded a file', date: '2025-07-22' },
    { user: 'Tariq Al-Banna', action: 'Changed password', date: '2025-07-21' },
];

const HomeRow3 = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
            {/* Progress */}
            <div className="bg-white rounded-2xl shadow p-4">
                <h3 className="text-md font-semibold mb-2">Progress Tracker</h3>
                <p className="text-sm text-gray-500">Weekly Goal Completion</p>
                <div className="relative w-24 h-24 mx-auto mt-4">
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                        <path
                            className="text-gray-200"
                            strokeWidth="3.8"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                        />
                        <path
                            className="text-blue-500"
                            strokeWidth="3.8"
                            fill="none"
                            strokeDasharray="75, 100"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                        75%
                    </div>
                </div>
                <p className="text-sm text-center text-gray-600 mt-2">
                    Keep up the good work! You're on track to meet your goals.
                </p>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow p-4">
                <h3 className="text-md font-semibold mb-4">Notifications</h3>
                {notifications.map((n, i) => (
                    <div key={i} className="mb-3">
                        <p className="font-medium text-gray-800">{n.title}</p>
                        <p className="text-sm text-gray-500">{n.subtitle}</p>
                    </div>
                ))}
            </div>

            {/* Activity */}
            <div className="bg-white rounded-2xl shadow p-4">
                <h3 className="text-md font-semibold mb-4">Recent Activity</h3>
                <table className="w-full text-sm text-left text-gray-600">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">User</th>
                            <th>Activity</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activity.map((item, i) => (
                            <tr key={i} className="border-b">
                                <td className="py-2">{item.user}</td>
                                <td>{item.action}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HomeRow3;