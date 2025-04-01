import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "@front/services/api";
import { PriorityStats } from "@front/types/todo";

export const useTaskStats = () => {
    const {
        data: stats = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ["taskStats"],
        queryFn: todoListApi.getTaskStatsByPriority,
    });

    // Helper function to get the count for a specific priority
    const getCountByPriority = (priority: string): number => {
        const stat = stats.find(s => s._id === priority);
        return stat ? stat.count : 0;
    };

    const totalTasks = stats.reduce((sum, stat) => sum + stat.count, 0);

    return {
        stats,
        isLoading,
        error,
        getCountByPriority,
        totalTasks,
        lowPriorityCount: getCountByPriority('low'),
        mediumPriorityCount: getCountByPriority('medium'),
        highPriorityCount: getCountByPriority('high'),
    };
};
