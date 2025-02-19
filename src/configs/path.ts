export const PATH = {
    LOGIN: {
        index: "/login"
    },
    REGISTER: {
        index: "/register"
    },
    LESSON: {
        index: "/lesson",
        outlets: {
            slug: "/lesson/:id",
            new: "/lesson/new"
        }
    },
    USER: {
        index: "/",
        outlets: {
            leaderBoard: "/leaderboard",
            profile: "/profile",
            learn: "/learn"
        }
    }
}