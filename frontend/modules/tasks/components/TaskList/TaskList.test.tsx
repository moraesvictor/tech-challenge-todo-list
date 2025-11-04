import { render, screen } from "@test-utils";
import { TaskList } from "./TaskList";
import { createPendingTask, createCompletedTask } from "@test-utils/factories";

describe("TaskList", () => {
  const mockOnToggleStatus = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly the component", () => {
    const tasks = [
      createPendingTask({ id: "1", descricao: "Tarefa 1" }),
      createPendingTask({ id: "2", descricao: "Tarefa 2" }),
    ];

    render(
      <TaskList
        tasks={tasks}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/tarefa 1/i)).toBeInTheDocument();
    expect(screen.getByText(/tarefa 2/i)).toBeInTheDocument();
  });

  it("should render empty message when tasks array is empty", () => {
    render(
      <TaskList
        tasks={[]}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/nenhuma tarefa encontrada/i)).toBeInTheDocument();
  });

  it("should render loading message when isLoading is true", () => {
    render(
      <TaskList
        tasks={[]}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
        isLoading={true}
      />
    );

    expect(screen.getByText(/carregando tarefas/i)).toBeInTheDocument();
  });

  it("should render list with correct aria-label", () => {
    const tasks = [createPendingTask({ id: "1", descricao: "Tarefa 1" })];

    render(
      <TaskList
        tasks={tasks}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const list = screen.getByRole("list", { name: /lista de tarefas/i });
    expect(list).toBeInTheDocument();
  });

  it("should render multiple tasks", () => {
    const tasks = [
      createPendingTask({ id: "1", descricao: "Tarefa 1" }),
      createPendingTask({ id: "2", descricao: "Tarefa 2" }),
      createCompletedTask({ id: "3", descricao: "Tarefa 3" }),
    ];

    render(
      <TaskList
        tasks={tasks}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/tarefa 1/i)).toBeInTheDocument();
    expect(screen.getByText(/tarefa 2/i)).toBeInTheDocument();
    expect(screen.getByText(/tarefa 3/i)).toBeInTheDocument();
  });
});

