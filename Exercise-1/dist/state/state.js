import { ProjectStatus, Project } from "../models/project.js";
class State {
    constructor() {
        this.listeners = new Array();
    }
    addListener(listenerFunction) {
        this.listeners.push(listenerFunction);
    }
    updateListeners(input) {
        for (const listenerFunction of this.listeners)
            listenerFunction(input);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = new Array();
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numberOfPeople) {
        this.projects.push(new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active));
        this.updateListeners([...this.projects]);
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((project) => project.id === projectId);
        if (project) {
            project.status = newStatus;
            this.updateListeners([...this.projects]);
        }
    }
}
const projectState = ProjectState.getInstance();
export default projectState;
//# sourceMappingURL=state.js.map