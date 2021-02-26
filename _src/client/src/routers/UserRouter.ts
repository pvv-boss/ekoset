import { interopDefault } from "./AdminRouter";

export const UserRoute = [
    {
        name: "dez-work-rating",
        path: "/user/deal/deswork/rating/:desWorkId",
        props: true,
        meta: { requiresAuth: true },
        component: () =>
            interopDefault(import(/* webpackChunkName: "dez-work-rating" */ "@/pages/private/AddDezWorkRatingForm.vue")),
    },
    {
        name: "auth-login",
        path: "/auth/:mode(login|registration)",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "login" */ "@/pages/private/Login.vue")),
        meta: { title: "Экосеть:: Вход на сайт" },
    },

    {
        name: "auth-restore",
        path: "/auth/restore",
        component: () =>
            interopDefault(import(/* webpackChunkName: "RestorePasswordForm" */ "@/components/user/RestorePasswordForm.vue")),
        meta: { title: "Экосеть:: Восстановление пароля" },
    },

    {
        name: "user-profile",
        path: "/user/profile",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "UserProfile" */ "@/pages/private/UserProfile.vue")),
        meta: { requiresAuth: true },
    },

    {
        name: "confirm-reset-password",
        path: "/user/password/reset/confirm/:code",
        props: true,
        component: () =>
            interopDefault(
                import(/* webpackChunkName: "ConfirmResetPassworCallback" */ "@/components/user/ConfirmResetPassworCallback.vue")
            ),
    },

    {
        name: "user-change-password",
        path: "/user/password/change",
        props: true,
        component: () =>
            interopDefault(import(/* webpackChunkName: "ChangePasswordForm" */ "@/pages/private/ChangePasswordForm.vue")),
        meta: { requiresAuth: true, allowAll: true },
    },

    {
        path: "/user/deals",
        props: true,
        meta: { requiresAuth: true },
        component: () => interopDefault(import(/* webpackChunkName: "UserDeals" */ "@/pages/private/UserDeals.vue")),

        children: [
            {
                name: "user-deals",
                path: "",
                props: true,
                component: () =>
                    interopDefault(import(/* webpackChunkName: "ContractList" */ "@/components/private/ContractList.vue")),
            },
            {
                name: "user-deals-contracts",
                path: "contracts",
                props: true,
                component: () =>
                    interopDefault(import(/* webpackChunkName: "ContractList" */ "@/components/private/ContractList.vue")),
            },
            {
                name: "user-deals-labaratory",
                path: "labs",
                props: true,
                component: () =>
                    interopDefault(import(/* webpackChunkName: "LabaratoryList" */ "@/components/private/LabaratoryList.vue")),
            },
            {
                name: "user-deals-sanitary",
                path: "sanitary",
                props: true,
                component: () =>
                    interopDefault(import(/* webpackChunkName: "SanitaryList" */ "@/components/private/SanitaryList.vue")),
            },
            {
                name: "user-deals-disinfection",
                path: "disinfection",
                props: true,
                component: () =>
                    interopDefault(
                        import(/* webpackChunkName: "DisinfectionList" */ "@/components/private/DisinfectionList.vue")
                    ),
            },
        ],
    },
];

export default UserRoute;
