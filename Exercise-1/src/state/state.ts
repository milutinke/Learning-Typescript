import { ProjectStatus, Project } from "../models/project.js";

type Listener<T> = (items: Array<T>) => void;

abstract class State<T> {
  protected listeners: Array<Listener<T>> = new Array();

  public addListener(listenerFunction: Listener<T>): void {
    this.listeners.push(listenerFunction);
  }

  protected updateListeners(input: any) {
    for (const listenerFunction of this.listeners) listenerFunction(input);
  }
}

class ProjectState extends State<Project> {
  private projects: Array<Project> = new Array();
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  public static getInstance(): ProjectState {
    if (!this.instance) this.instance = new ProjectState();
    return this.instance;
  }

  public addProject(
    title: string,
    description: string,
    numberOfPeople: number
  ): void {
    this.projects.push(
      new Project(
        Math.random().toString(),
        title,
        description,
        numberOfPeople,
        ProjectStatus.Active
      )
    );
    this.updateListeners([...this.projects]);
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId);

    if (project) {
      project.status = newStatus;
      this.updateListeners([...this.projects]);
    }
  }
}

const projectState = ProjectState.getInstance();
export default projectState;
