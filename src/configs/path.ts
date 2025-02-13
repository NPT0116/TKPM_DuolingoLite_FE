export const PATH = {
    LOGIN: {
        index: "/login"
    },
    REGISTER: {
        index: "/register"
    },
    GUEST: {
        index: "/",

    },
    LESSON: {
        index: "/lesson",
        outlets: {
            slug: "/lesson/:id",
            new: "/lesson/new"
        }
    }
}