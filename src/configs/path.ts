export const PATH = {
  LOGIN: {
    index: "/login",
  },
  REGISTER: {
    index: "/register",
  },
  LESSON: {
    index: "/lesson",
    outlets: {
      slug: "/lesson/:id",
      new: "/lesson/new",
      matching: "/lesson/matching",
    },
  },
  USER: {
    index: "/",
    outlets: {
      home: "/home",
      profile: "/profile",
      learn: "/learn",
      leaderboard: "/leaderboard",
    },
  },
  ADMIN: {
    index: "/admin",
    lesson: {
      base: "course/:courseId/lesson/:lessonId",
      test: "course/test",
      management: "course",
      index: "course/:courseId/lesson",
      multipleChoice: "multiple-choice",
      buildSentence: "build-sentence",
      matching: "matching",
      pronunciation: "pronunciation",
    },
  },
};
