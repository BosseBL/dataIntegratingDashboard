import DataTable from '../Dashboard/dashboardComponents/dataTable';
import DataGraph from '../Dashboard/dashboardComponents/dataGraph';
import DataPie from '../Dashboard/dashboardComponents/dataPie';

var templates = [
    {
        name: "Default",
        components: [
            {
                component: DataTable,
                attributes: {
                    companySpecific: true,
                },
            }, // Table
            {
                component: DataGraph,
                attributes: {
                    indexKey:"date",
                    companySpecific: true,
                },
            }, // graph
            {
                component: DataPie,
                attributes: {},
                companySpecific: true,
            }, // pie
        ],
    },
    {
        name: "Only Table",
        components: [
            {
                component: DataTable,
                attributes: {
                companySpecific: false,
                },
            }, // Table
        ],
    },
];


export default templates;