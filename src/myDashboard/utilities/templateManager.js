import DataTable from '../components/dashboardComponents/dataTable';
import DataGraph from '../components/dashboardComponents/dataGraph';
import DataPie from '../components/dashboardComponents/dataPie';

class TemplateManager {
    templates = [
        {
            name: "Default",
            components: [
                {
                   component: DataTable,
                   attributes: {},
                }, // Table
                {
                    component: DataGraph,
                    attributes: {
                        indexKey:"date",
                    },
                }, // graph
                {
                    component: DataPie,
                    attributes: {},
                }, // pie
            ],
        },
        {
            name: "Only Table",
            components: [
                {
                   component: DataTable,
                   attributes: {},
                }, // Table
            ],
        },
    ];

    constructor() {
        this.activeTemplate = this.templates[0];
    }

    getActiveTemplate() {return this.activeTemplate; }
    getTemplate(name) {return this.templates.filter((t) => {return t.name === name});}
    getTemplates() {return this.templates;}
    getTemplateNames() {return this.templates.map((t) => {return t.name});}
}

export default TemplateManager;