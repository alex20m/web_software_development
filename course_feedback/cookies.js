  const sessionCounts = new Map();
  const feedbackCounts = new Map();

  const getAndIncrementCount = (sessionId) => {
    let count = sessionCounts.get(sessionId) ?? 0;
    count++;
    sessionCounts.set(sessionId, count);
    return count;
  };
  
  const hasGivenFeedback = (sessionId, courseId) => {
    const key = `${sessionId}_${courseId}`;
    return feedbackCounts.has(key);
  };
  
  const markFeedbackGiven = (sessionId, courseId, rating) => {
    const key = `${sessionId}_${courseId}`;
    let count = feedbackCounts.courseId ?? 0;
    count++;
    feedbackCounts.set(key, rating);
  };

  export { hasGivenFeedback, markFeedbackGiven, getAndIncrementCount };