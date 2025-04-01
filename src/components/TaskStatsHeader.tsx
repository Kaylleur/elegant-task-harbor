import { useTaskStats } from "@front/hooks/useTaskStats";
import { Card, CardContent } from "@front/components/ui/card";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import { AlertCircle, LayoutGrid, CheckCircle2 } from "lucide-react";

const TaskStatsHeader = () => {
    const { isLoading, lowPriorityCount, mediumPriorityCount, highPriorityCount, totalTasks } = useTaskStats();

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-3 mb-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="h-[100px] bg-muted/30 animate-pulse">
                        <CardContent className="p-4"></CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const stats = [
        {
            title: "Low Priority Tasks",
            value: lowPriorityCount,
            icon: CheckCircle2,
            color: "bg-blue-500",
            textColor: "text-blue-600 dark:text-blue-400",
            chartData: [
                { name: "Low", value: lowPriorityCount, color: "#3b82f6" },
                { name: "Other", value: totalTasks - lowPriorityCount, color: "#e5e7eb" },
            ],
        },
        {
            title: "Medium Priority Tasks",
            value: mediumPriorityCount,
            icon: LayoutGrid,
            color: "bg-yellow-500",
            textColor: "text-yellow-600 dark:text-yellow-400",
            chartData: [
                { name: "Medium", value: mediumPriorityCount, color: "#eab308" },
                { name: "Other", value: totalTasks - mediumPriorityCount, color: "#e5e7eb" },
            ],
        },
        {
            title: "High Priority Tasks",
            value: highPriorityCount,
            icon: AlertCircle,
            color: "bg-red-500",
            textColor: "text-red-600 dark:text-red-400",
            chartData: [
                { name: "High", value: highPriorityCount, color: "#ef4444" },
                { name: "Other", value: totalTasks - highPriorityCount, color: "#e5e7eb" },
            ],
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-3 mb-6">
            {stats.map((stat, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="flex h-full">
                            <div className="flex-1 p-4">
                                <div className="flex items-center gap-2">
                                    <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                                    <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                                </div>
                                <div className="mt-2">
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {totalTasks > 0
                                            ? `${Math.round((stat.value / totalTasks) * 100)}% of total`
                                            : 'No tasks yet'}
                                    </p>
                                </div>
                            </div>
                            <div className="w-24 h-[100px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stat.chartData} layout="vertical">
                                        <Bar
                                            dataKey="value"
                                            fill={stat.chartData[0].color}
                                            radius={[0, 4, 4, 0]}
                                        >
                                            {stat.chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default TaskStatsHeader;
