import store from '@/state/store'

export default [{
        path: '/',
        name: 'default',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('./views/dashboards/default'),
    },
    {
        path: '/customers',
        name: 'Customers',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('./views/customers/Index.vue'),
    },
    {
        path: '/customers/create',
        name: 'CreateCustomer',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('./views/customers/Create'),
    },
    {
        path: '/customer/show/:id',
        name: 'ShowCustomer',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('./views/customers/Show'),
    },
    {
        path: '/customer/edit/:id',
        name: 'EditCustomer',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('./views/customers/Update'),
    },
    {
        path: '/user/profile/:id',
        name: 'Profile',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('./views/users/profile'),
    },

    {
        path: '/equipments/create',
        name: 'CreateEquipment',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('./views/equipments/Create'),
    },
    {
        path: '/equipments',
        name: 'Equipments',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('./views/equipments/Index.vue'),
    },
    {
        path: '/equipment/show/:id',
        name: 'ShowEquipment',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('./views/equipments/Show'),
    },
    {
        path: '/user/reset-password',
        name: 'ResetPassword',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('./views/account/change-password'),
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('./views/account/login'),
        // meta: {
        //     beforeResolve(routeTo, routeFrom, next) {
        //         // If the user is already logged in
        //         if (isLoggedIn()) {
        //             // Redirect to the home page instead
        //             next({ name: 'default' })
        //         } else {
        //             // Continue to the login page
        //             next()
        //         }
        //     },
        // },
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('./views/account/register'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'default' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/forgot-password',
        name: 'Forgot password',
        component: () =>
            import ('./views/account/forgot-password'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'default' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
                    store.dispatch('auth/logOut')
                } else {
                    store.dispatch('authfack/logout')
                }
                const authRequiredOnPreviousRoute = routeFrom.matched.some(
                        (route) => route.push('/login')
                    )
                    // Navigate back to previous page, or home as a fallback
                next(authRequiredOnPreviousRoute ? { name: 'default' } : {...routeFrom })
            },
        },
    }

]