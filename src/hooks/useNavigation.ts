import { useState, useCallback } from 'react';
import { PageType, NavigationState } from '../types';

/**
 * Custom hook for managing application navigation state
 * Provides smooth transitions and navigation history
 */
export const useNavigation = (initialPage: PageType = 'dashboard') => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentPage: initialPage
  });

  /**
   * Navigate to a specific page with transition handling
   * @param page - The target page to navigate to
   * @param options - Navigation options for smooth transitions
   */
  const navigateTo = useCallback((
    page: PageType, 
    options?: { 
      replace?: boolean; 
      data?: any;
      onTransitionStart?: () => void;
      onTransitionComplete?: () => void;
    }
  ) => {
    const { replace = false, onTransitionStart, onTransitionComplete } = options || {};
    
    // Trigger transition start callback
    onTransitionStart?.();
    
    setNavigationState(prev => ({
      currentPage: page,
      previousPage: replace ? prev.previousPage : prev.currentPage
    }));

    // Simulate smooth transition completion
    setTimeout(() => {
      onTransitionComplete?.();
    }, 200);
  }, []);

  /**
   * Navigate back to the previous page
   */
  const goBack = useCallback(() => {
    if (navigationState.previousPage) {
      navigateTo(navigationState.previousPage, { replace: true });
    } else {
      navigateTo('dashboard', { replace: true });
    }
  }, [navigationState.previousPage, navigateTo]);

  /**
   * Check if a specific page is currently active
   * @param page - The page to check
   * @returns boolean indicating if the page is active
   */
  const isCurrentPage = useCallback((page: PageType) => {
    return navigationState.currentPage === page;
  }, [navigationState.currentPage]);

  return {
    currentPage: navigationState.currentPage,
    previousPage: navigationState.previousPage,
    navigateTo,
    goBack,
    isCurrentPage
  };
};