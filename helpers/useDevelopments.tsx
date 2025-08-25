import { useQuery } from "@tanstack/react-query";
import { getDevelopments } from "../endpoints/developments_GET.schema";

// Query key constant - used for cache invalidation and query identification
// Centralized here to maintain consistency across the application
export const DEVELOPMENTS_QUERY_KEY = "developments";

/**
 * Custom hook for fetching all real estate developments
 * 
 * Leverages React Query's caching and background sync capabilities:
 * - Automatic background refetching when data becomes stale
 * - Intelligent cache management with 1-minute fresh window (set in global config)
 * - Optimistic updates and error handling
 * - Deduplication of simultaneous requests
 * 
 * @returns React Query result object with data, loading states, and error handling
 */
export const useDevelopments = () => {
  return useQuery({
    queryKey: [DEVELOPMENTS_QUERY_KEY],
    queryFn: () => getDevelopments(), // Type-safe API call from schema
    // Additional options can be added here for specific use cases:
    // staleTime, cacheTime, refetchOnWindowFocus, etc.
  });
};