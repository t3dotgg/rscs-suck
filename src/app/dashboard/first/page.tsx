import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

interface DashboardData {
  metrics: {
    users: { total: number; change: number };
    revenue: { total: number; change: number };
    projects: { total: number; change: number };
  };
  recentActivity: Array<{
    id: number;
    user: string;
    action: string;
    time: string;
  }>;
}

async function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function FirstPage() {
  await waitFor(400);

  const data: DashboardData = JSON.parse(
    await fs.readFile(
      path.join(process.cwd(), "data", "first-data.json"),
      "utf-8"
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          New Action
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">
            {data.metrics.users.total.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {data.metrics.users.change > 0 ? "+" : ""}
            {data.metrics.users.change}% from last month
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">
            ${data.metrics.revenue.total.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {data.metrics.revenue.change > 0 ? "+" : ""}
            {data.metrics.revenue.change}% from last month
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-purple-600">
            {data.metrics.projects.total.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {data.metrics.projects.change > 0 ? "+" : ""}
            {data.metrics.projects.change}% from last month
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {data.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-md"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">
                  {activity.user} {activity.action}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
