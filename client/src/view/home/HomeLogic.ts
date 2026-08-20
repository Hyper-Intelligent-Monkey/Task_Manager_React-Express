import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { taskController } from "../../controllers/taskController";
import { TaskStatus } from "../../utils/enums";
import { useToast } from "../../components/Toast";
import { handleApiError } from "../../utils/errorHandlers";

export function useHomeLogic() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [tasks, setTasks] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const { showToast } = useToast();

    const searchQuery = searchParams.get('search') || "";
    const filterStatus = (searchParams.get('status') as TaskStatus) || TaskStatus.ALL;
    var currentPage = parseInt(searchParams.get('page') || "1");
    const limit = 12; // limit is 50 unless changed in the server
    
    const newParams = new URLSearchParams(searchParams);
    

    const handleFilterChange = (newStatus: TaskStatus) => {
        newParams;
        if (newStatus === TaskStatus.ALL) {
            newParams.delete('status');
        } else {
            newParams.set('status', newStatus);
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    const handlePageChange = (newPage: number) => {
        newParams;
        newParams.set('page', newPage.toString());
        setSearchParams(newParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        
        const loadTasks = async () => {
            try {
                const statusParam = filterStatus === TaskStatus.ALL ? "" : filterStatus;
                
                // to first page
                if (currentPage < 1) {
                    showToast("Invalid page", "error");
                    newParams.set("page", "1");
                    setSearchParams(newParams);
                    currentPage = 1;
                }
                
                let result;
                if (!searchQuery && !statusParam) {
                    const allTasks = await taskController.getAllTasks();
                    result = {
                        tasks: allTasks,
                        totalCount: allTasks.length
                    };
                } else {
                    result = await taskController.filterTasks(searchQuery, statusParam, currentPage, limit);
                }
                
                setTasks(result.tasks);
                setTotalCount(result.totalCount);
                
                // to last most page
                const calculatedTotalPages = Math.ceil(result.totalCount / limit);
                if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
                    showToast("Invalid page", "error");
                    newParams.set("page", calculatedTotalPages.toString());
                    setSearchParams(newParams);
                }
            } catch (err: any) {
                handleApiError(err, showToast, "Failed to load tasks");
            } finally {
                setIsFiltering(false);
                setIsInitialLoad(false);
            }
        };
        
        setIsFiltering(true);

        const timeoutId = setTimeout(loadTasks, 0);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, filterStatus, currentPage]);
    const totalPages = Math.ceil(totalCount / limit);
    

    return {
        tasks,
        isInitialLoad,
        isFiltering,
        filterStatus,
        currentPage,
        totalPages,
        handleFilterChange,
        handlePageChange,
        // limit,
        // searchQuery
    };
}