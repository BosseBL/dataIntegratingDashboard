import DataTable from '../Dashboard/dashboardComponents/dataTable';
import DataGraph from '../Dashboard/dashboardComponents/dataGraph';
import DataPie from '../Dashboard/dashboardComponents/dataPie';
import DataBar from '../Dashboard/dashboardComponents/dataBar';
import DataTest from '../Dashboard/dashboardComponents/dataTest';
import dataMap from './dataMap';
import TestPie from '../Dashboard/dashboardComponents/testPie';
import TestTree from '../Dashboard/dashboardComponents/testTree'
import TestTable from '../Dashboard/dashboardComponents/testTable';
import TestList from '../Dashboard/dashboardComponents/testList';
import TestGraph from '../Dashboard/dashboardComponents/testGraph';
import TestGraph2 from '../Dashboard/dashboardComponents/testGraph2';

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
        name: "Volume Table",
        components: [
            {
                component: DataTest,
                attributes: {
                    interval: ["2018-01-01", "2019-01-01"],
                    granularity: "month"
                },
            }
        ],
    },
    {
        name: "Product Pie",
        components: [
            {
                component: TestPie,
                attributes: {
                    filter: {},
                    companySpecific: true,
                    interval: ["2018-01-01", "2019-01-01"],
                },
            }
        ],
    },
    {
        name: "Tree Graph",
        components: [
            {
                component: TestTree,
                attributes: {
                    valueKey: "riskAmount",
                    filter: {},
                    companySpecific: true,
                    interval: ["2018-01-01", "2019-01-01"],
                    hierarchy: ["type", "status", "side",],
                }
            }
        ],
    },
    {
        name: "Table",
        components: [
            {
                component: TestTable,
                attributes: {
                    interval: ["2018-01-01", "2019-01-01"],
                    filter: {},
                    companySpecific: true,
                }
            }
        ],
    },
    {
        name: "Overview List",
        components: [
            {
                component: TestList,
                attributes: {
                    interval: ["2018-01-01", "2019-01-01"],
                    filter: {},
                    companySpecific: true,
                }
            }
        ],
    },
    {
        name: "Node Graph",
        components: [
            {
                component: TestGraph,
                attributes: {
                    interval: ["2018-01-01", "2019-01-01"],
                    filter: {},
                    companySpecific: true,
                }
            }
        ],
    },
    {
        name: "Test",
        components: [
            {
                component: DataTest,
                attributes: {
                    interval: ["2018-01-01", "2019-01-01"],
                    granularity: "month"
                },
            },
            {
                component: TestPie,
                attributes: {
                    filter: {},
                    companySpecific: true,
                    interval: ["2018-01-01", "2019-01-01"],
                },
            },
            {
                component: TestTree,
                attributes: {
                    valueKey: "riskAmount",
                    filter: {},
                    companySpecific: true,
                    interval: ["2018-01-01", "2019-01-01"],
                    hierarchy: ["type", "status", "side", ],
                }
            },
            {
                component: TestTable,
                attributes: {
                    interval: ["2018-01-01", "2019-01-01"],
                    filter: {},
                    companySpecific: true,
                }
            },
            {
                component: TestList,
                attributes: {
                    interval: ["2018-01-01", "2019-01-01"],
                    filter: {},
                    companySpecific: true,
                }
            },
            {
                component: TestGraph,
                attributes: {
                    interval: ["2018-01-01", "2019-01-01"],
                    filter: {},
                    companySpecific: true,
                }
            },
            
        ],
    },
    
];


export default templates;