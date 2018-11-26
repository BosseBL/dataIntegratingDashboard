import DataTable from '../Dashboard/dashboardComponents/dataTable';
import DataGraph from '../Dashboard/dashboardComponents/dataGraph';
import DataPie from '../Dashboard/dashboardComponents/dataPie';
import DataBar from '../Dashboard/dashboardComponents/dataBar';
import dataMap from './dataMap';

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
                    indexKey:"test",
                    companySpecific: true,
                    type: "Bar",
                },
            }, // graph
            {
                component: DataPie,
                attributes: {},
                companySpecific: true,
            }, // pie
            {
                component: DataBar,
                attributes: {
                    indexKey: "date",
                    companySpecific: true,
                    valueKey:"volume",
                },
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
    {
        name: "Empty",
        components: [],
    },
];


export default templates;