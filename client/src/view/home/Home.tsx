import { useNavigate } from "react-router-dom";
import Navbar from "../../components/SearchBar";
import { Button } from "../../components/Button";
import ScrollToTop from "../../components/ScrollToTop";
import StatusDropdown from "../../components/StatusDropdown";
import TaskCard from "../../components/TaskCard";
import { TaskCardSkeleton } from "../../components/SkeletonLoading";
import Pagination from "../../components/Pagination";
import { useHomeLogic } from "./HomeLogic";

export default function Home() {
    const navigate = useNavigate();
    const {
        tasks,
        isInitialLoad,
        isFiltering,
        filterStatus,
        currentPage,
        totalPages,
        handleFilterChange,
        handlePageChange
    } = useHomeLogic();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-grow max-w-5xl mx-auto w-full">
                <div className={`px-6 py-6 ${totalPages > 1 ? "pb-24" : ""}`}>
                    <div className="flex flex-row justify-between items-center gap-4 mb-8">
                        <div className="flex flex-1 w-full gap-4">
                            <StatusDropdown 
                                currentFilter={filterStatus} 
                                onSelect={handleFilterChange} 
                            />
                        </div>
                        <Button 
                            onClick={() => navigate("/add")}
                            className="!px-3 sm:!px-6 !py-2 flex items-center gap-2 shadow-sm text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="inline">Add Task</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {isInitialLoad || isFiltering ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <TaskCardSkeleton key={i} index={i} />
                            ))
                        ) : (
                            tasks.map((task: any, index: number) => (
                                <TaskCard 
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    status={task.status}
                                    index={index}
                                />
                            ))
                        )}

                        {!isInitialLoad && tasks.length === 0 && (
                            <div className="col-span-full text-start">
                                <h2 className="text-text">No available <span className="text-accent">tasks.</span></h2>
                            </div>
                        )}
                    </div>
                </div>

                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    isFiltering={isFiltering}
                    onPageChange={handlePageChange}
                />
                <ScrollToTop />
            </main>
        </div>
    );
}