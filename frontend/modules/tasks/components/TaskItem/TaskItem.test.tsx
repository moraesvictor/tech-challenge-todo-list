import { render, screen, within, act } from "@test-utils";
import userEvent from "@testing-library/user-event";
import { TaskItem } from "./TaskItem";
import { createPendingTask, createCompletedTask } from "@test-utils/factories";

describe("TaskItem", () => {
  const mockOnToggleStatus = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly the component", () => {
    const task = createPendingTask({
      descricao: "Testar componente",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/testar componente/i)).toBeInTheDocument();
    expect(screen.getByText(/criada em/i)).toBeInTheDocument();
  });

  it("should render task with pending status", () => {
    const task = createPendingTask({
      descricao: "Tarefa pendente",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText(/tarefa pendente/i)).toBeInTheDocument();
  });

  it("should render task with completed status", () => {
    const task = createCompletedTask({
      descricao: "Tarefa concluída",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
    const taskText = screen.getByText(/tarefa concluída/i);
    expect(taskText).toHaveClass("line-through");
  });

  it("should call onToggleStatus when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const task = createPendingTask({
      id: "task-123",
      descricao: "Tarefa para toggle",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnToggleStatus).toHaveBeenCalledTimes(1);
    expect(mockOnToggleStatus).toHaveBeenCalledWith("task-123", "concluida");
  });

  it("should toggle from completed to pending when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const task = createCompletedTask({
      id: "task-456",
      descricao: "Tarefa concluída",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnToggleStatus).toHaveBeenCalledTimes(1);
    expect(mockOnToggleStatus).toHaveBeenCalledWith("task-456", "pendente");
  });

  it("should open modal when delete button is clicked", async () => {
    const user = userEvent.setup();
    const task = createPendingTask({
      id: "task-789",
      descricao: "Tarefa para deletar",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /excluir/i });
    await act(async () => {
      await user.click(deleteButton);
    });

    expect(screen.getByText(/confirmar exclusão/i)).toBeInTheDocument();
    expect(
      screen.getByText(/tem certeza que deseja excluir esta tarefa/i)
    ).toBeInTheDocument();
  });

  it("should call onDelete when confirm delete is clicked in modal", async () => {
    const user = userEvent.setup();
    const task = createPendingTask({
      id: "task-delete-123",
      descricao: "Tarefa para deletar",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const deleteButtons = screen.getAllByRole("button", { name: /excluir/i });
    await act(async () => {
      await user.click(deleteButtons[0]);
    });

    const confirmDeleteButtons = screen.getAllByRole("button", {
      name: /excluir/i,
    });
    await act(async () => {
      await user.click(confirmDeleteButtons[confirmDeleteButtons.length - 1]);
    });

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith("task-delete-123");
  });

  it("should close modal when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const task = createPendingTask({
      descricao: "Tarefa para cancelar",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /excluir/i });
    await act(async () => {
      await user.click(deleteButton);
    });

    const modalTitle = screen.getByText(/confirmar exclusão/i);
    expect(modalTitle).toBeInTheDocument();

    const modalContainer = modalTitle.closest('[class*="rounded"]');
    const cancelButton = modalContainer
      ? within(modalContainer as HTMLElement).getByRole("button", {
          name: /cancelar/i,
        })
      : screen.getAllByRole("button", { name: /cancelar/i })[0];

    await act(async () => {
      await user.click(cancelButton);
    });

    expect(screen.queryByText(/confirmar exclusão/i)).not.toBeInTheDocument();
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it("should display formatted creation date", () => {
    const task = createPendingTask({
      dataCriacao: "2024-01-15T10:30:00.000Z",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/criada em/i)).toBeInTheDocument();
  });

  it("should have correct aria-label for checkbox", () => {
    const task = createPendingTask({
      descricao: "Tarefa acessível",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByLabelText(/marcar tarefa como concluída/i);
    expect(checkbox).toBeInTheDocument();
  });

  it("should have correct aria-label for completed task checkbox", () => {
    const task = createCompletedTask({
      descricao: "Tarefa concluída",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByLabelText(/marcar tarefa como pendente/i);
    expect(checkbox).toBeInTheDocument();
  });

  it("should have correct aria-label for delete button", () => {
    const task = createPendingTask({
      descricao: "Tarefa para deletar",
    });

    render(
      <TaskItem
        task={task}
        onToggleStatus={mockOnToggleStatus}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByLabelText(
      /excluir tarefa: tarefa para deletar/i
    );
    expect(deleteButton).toBeInTheDocument();
  });
});
