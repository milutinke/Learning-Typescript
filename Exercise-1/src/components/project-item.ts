import Component from "./base-component.js";
import AutoBind from "../decorators/autobind.js";
import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project.js";

export default class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = `${this.persons} assigned`;
    this.element.querySelector("p")!.textContent = this.project.description;
  }

  @AutoBind
  dragStartHandler(dragEvent: DragEvent) {
    dragEvent.dataTransfer!.setData("text/plain", this.project.id);
    dragEvent.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(dragEvent: DragEvent) {}

  get persons(): string {
    return `${this.project.people} person${this.project.people > 1 ? "s" : ""}`;
  }
}
