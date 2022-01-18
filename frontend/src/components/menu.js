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
                label: "menuitems.customers.action.create",
                link: "/customers/create",
                parentId: 3
            },
            {
                id: 2,
                label: "menuitems.customers.action.list",
                link: "/customers",
                parentId: 3
            }
        ]
    },
    {
        id: 4,
        label: "menuitems.equipement.text",
        icon: "bx bx-wrench",
        subItems: [{
                id: 1,
                label: "menuitems.equipement.action.create",
                link: "/equipments/create",
                parentId: 4
            },
            {
                id: 2,
                label: "menuitems.equipement.action.list",
                link: "/equipments",
                parentId: 4
            }
        ]
    },
    {
        id: 5,
        label: "menuitems.employees.text",
        icon: "bx bx-user",
        subItems: [{
                id: 1,
                label: "menuitems.employees.action.create",
                link: "/employees/create",
                parentId: 5
            },
            {
                id: 2,
                label: "menuitems.employees.action.list",
                link: "/employees",
                parentId: 5
            }
        ]
    }
];