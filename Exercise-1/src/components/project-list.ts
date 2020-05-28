import Component from "./base-component.js";
import AutoBind from "../decorators/autobind.js";
import { DragTarget } from "../models/drag-drop.js";
import { ProjectStatus, Project } from "../models/project.js";
import projectState from "../state/state.js";
import ProjectItem from "./project-item.js";

export default class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Array<Project>;

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = new Array();

    this.configure();
    this.renderContent();
  }

  configure(): void {
    projectState.addListener((projects: Array<Project>) => {
      this.assignedProjects = projects.filter((project: Project) => {
        if (this.type === "active")
          return project.status === ProjectStatus.Active;
        else return project.status === ProjectStatus.Finished;
      });

      this.renderProjects();
    });

    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
  }

  renderContent(): void {
    this.element.querySelector("ul")!.id = `${this.type}-projects-list`;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  @AutoBind
  dropHandler(dragEvent: DragEvent) {
    const projectId = dragEvent.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      projectId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @AutoBind
  dragLeaveHandler(dragEvent: DragEvent) {
    const listElement = this.element.querySelector("ul")! as HTMLUListElement;
    listElement.classList.remove("droppable");
  }

  @AutoBind
  dragOverHandler(dragEvent: DragEvent) {
    if (dragEvent.dataTransfer!.types[0] === "text/plain") {
      dragEvent.preventDefault();
      const listElement = this.element.querySelector("ul")! as HTMLUListElement;
      listElement.classList.add("droppable");
    }
  }

  private renderProjects(): void {
    const listElement = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listElement.innerHTML = "";

    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
    }
  }
}
