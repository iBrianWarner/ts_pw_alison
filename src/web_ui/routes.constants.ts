export const ROUTES = {
  home: '/',
  searchResults: (query: string): string => `courses?query=${query}`,
  course: (courseSlug: string): string => `/course/${courseSlug}`,
  topic: (topicId: number, topicSlug: string): string =>
    `/topic/learn/${topicId}/${topicSlug}`,
};
