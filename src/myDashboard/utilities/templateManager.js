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

    constructor() {
        this.activeTemplate = this.templates[0];
    }

    getActiveTemplate() {return this.activeTemplate; }
    getTemplate(name) {
        if(typeof name === 'number') return this.templates[name];
        else if(typeof name === 'string') return this.templates.filter((t) => {return t.name === name});
    }
    getTemplates() {return this.templates;}
    getTemplateNames() {return this.templates.map((t) => {return t.name});}
}

export default TemplateManager;