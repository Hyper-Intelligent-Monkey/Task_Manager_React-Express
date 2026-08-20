import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/Button";

interface ErrorPageProps {
    code?: string | number;
    title?: string;
    message?: string;
}

export default function ErrorPage({ code, title, message }: ErrorPageProps) {
    const navigate = useNavigate();
    const location = useLocation();
    
    const state = location.state as ErrorPageProps;
    const errorCode = code || state?.code || "404";
    const errorTitle = title || state?.title || "Page Not Found";
    const errorMessage = message || state?.message || "The page you are looking for doesn't exist.";

    return (
        <div className="min-h-screen flex justify-center bg-background px-6 pt-[25vh]">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-accent mb-4">{errorCode}</h1>
                <h2 className="text-xl font-medium text-dark mb-2">{errorTitle}</h2>
                <p className="text-text mb-8">{errorMessage}</p>
                <Button 
                    onClick={() => navigate("/")}
                    className="w-full text-white shadow-lg"
                >
                    Back to Home
                </Button>
            </div>
        </div>
    );
}