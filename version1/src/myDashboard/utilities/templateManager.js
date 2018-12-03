
import templates from './templates.js';

class TemplateManager {
    constructor() {
        this.templates = templates;
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