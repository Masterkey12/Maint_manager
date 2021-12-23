export const menuItems = [{
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboards.text",
        icon: "bx-home-circle",
        link: '/'
    },
    {
        id: 3,
        label: "menuitems.customers.text",
        icon: "bx-user",
        subItems: [{
                id: 1,
                label: "menuitems.customers.list.create",
                link: "/customers/create",
                parentId: 3
            },
            {
                id: 2,
                label: "menuitems.customers.list.list",
                link: "/customers",
                parentId: 3
            }
        ]
    },

    {
        id: 3,
        label: "menuitems.equipement.text",
        icon: "bx bx-wrench",
        subItems: [{
                id: 1,
                label: "menuitems.equipement.list.create",
                link: "/customers/create",
                parentId: 3
            },
            {
                id: 2,
                label: "menuitems.equipement.list.list",
                link: "/customers",
                parentId: 3
            }
        ]
    }
];