var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from "./base-component.js";
import AutoBind from "../decorators/autobind.js";
import { ProjectStatus } from "../models/project.js";
import projectState from "../state/state.js";
import ProjectItem from "./project-item.js";
let ProjectList = (() => {
    class ProjectList extends Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = new Array();
            this.configure();
            this.renderContent();
        }
        configure() {
            projectState.addListener((projects) => {
                this.assignedProjects = projects.filter((project) => {
                    if (this.type === "active")
                        return project.status === ProjectStatus.Active;
                    else
                        return project.status === ProjectStatus.Finished;
                });
                this.renderProjects();
            });
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("drop", this.dropHandler);
        }
        renderContent() {
            this.element.querySelector("ul").id = `${this.type}-projects-list`;
            this.element.querySelector("h2").textContent = `${this.type.toUpperCase()} PROJECTS`;
        }
        dropHandler(dragEvent) {
            const projectId = dragEvent.dataTransfer.getData("text/plain");
            projectState.moveProject(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
        }
        dragLeaveHandler(dragEvent) {
            const listElement = this.element.querySelector("ul");
            listElement.classList.remove("droppable");
        }
        dragOverHandler(dragEvent) {
            if (dragEvent.dataTransfer.types[0] === "text/plain") {
                dragEvent.preventDefault();
                const listElement = this.element.querySelector("ul");
                listElement.classList.add("droppable");
            }
        }
        renderProjects() {
            const listElement = document.getElementById(`${this.type}-projects-list`);
            listElement.innerHTML = "";
            for (const projectItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector("ul").id, projectItem);
            }
        }
    }
    __decorate([
        AutoBind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        AutoBind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    __decorate([
        AutoBind
    ], ProjectList.prototype, "dragOverHandler", null);
    return ProjectList;
})();
export default ProjectList;
//# sourceMappingURL=project-list.js.map