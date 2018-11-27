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
                    valueKey:"riskAmount",
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
    {
        name: "Test",
        components: [
            {
                //component: DataTest,
                attributes: {
                    companySpecific: true,
                },
            },
        ],
    },
];


export default templates;