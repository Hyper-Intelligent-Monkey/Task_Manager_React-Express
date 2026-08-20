
const ERROR_MESSAGES = {
    NETWORK: "Server offline",
    TIMEOUT: "Please try again",
    DEFAULT: "An error occurred"
} as const;

export const handleApiError = (
    err: any, 
    showToast: (msg: string, type: "success" | "error") => void, 
    fallbackMsg?: string
) => {
    console.error("API Error:", err);

    const isNetworkError = err.message === 'Failed to fetch';
    const isTimeout = err.name === 'AbortError' || err.message?.includes('timeout');

    const message = isNetworkError 
        ? ERROR_MESSAGES.NETWORK 
        : isTimeout 
        ? ERROR_MESSAGES.TIMEOUT 
        : (fallbackMsg || ERROR_MESSAGES.DEFAULT);

    showToast(message, "error");
};
