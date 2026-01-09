import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress API-related errors and unhandled promise rejections to prevent exposing API structure
if (typeof window !== 'undefined') {
  // Suppress unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    // Prevent default console error logging
    event.preventDefault();
    // Silently handle - don't expose API endpoints or structure
  });

  // Suppress general errors that might expose API structure
  const originalError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    // Suppress errors that contain API URLs or endpoints
    if (typeof message === 'string' && (
      message.includes('api.cannoncapitalpartners.org') ||
      message.includes('/api/') ||
      message.includes('fetch')
    )) {
      return true; // Suppress the error
    }
    // Allow other errors to be handled normally
    if (originalError) {
      return originalError(message, source, lineno, colno, error);
    }
    return false;
  };
}

createRoot(document.getElementById("root")!).render(<App />);
