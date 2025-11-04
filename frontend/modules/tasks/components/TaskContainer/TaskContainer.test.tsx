import { render, screen } from "@test-utils";
import { TaskContainer } from "./TaskContainer";
import { useTasks } from "@modules/tasks/hooks/useTasks";
import { createPendingTask, createCompletedTask } from "@test-utils/factories";

jest.mock("@modules/tasks/hooks/useTasks");
const mockedUseTasks = useTasks as jest.MockedFunction<typeof useTasks>;

describe("TaskContainer", () => {
  const mockSetFilter = jest.fn();
  const mockCreateTask = jest.fn();
  const mockUpdateTaskStatus = jest.fn();
  const mockDeleteTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly the component", () => {
    mockedUseTasks.mockReturnValue({
      tasks: [],
      filteredTasks: [],
      filter: "todas",
      isLoading: false,
      setFilter: mockSetFilter,
      refreshTasks: jest.fn(),
      createTask: mockCreateTask,
      updateTaskStatus: mockUpdateTaskStatus,
      deleteTask: mockDeleteTask,
    });

    render(<TaskContainer />);

    expect(screen.getByText(/adicionar nova tarefa/i)).toBeInTheDocument();
    expect(screen.getByText(/lista de tarefas/i)).toBeInTheDocument();
  });

  it("should display tasks count when not loading", () => {
    const tasks = [
      createPendingTask({ id: "1", descricao: "Tarefa 1" }),
      createCompletedTask({ id: "2", descricao: "Tarefa 2" }),
    ];

    mockedUseTasks.mockReturnValue({
      tasks,
      filteredTasks: tasks,
      filter: "todas",
      isLoading: false,
      setFilter: mockSetFilter,
      refreshTasks: jest.fn(),
      createTask: mockCreateTask,
      updateTaskStatus: mockUpdateTaskStatus,
      deleteTask: mockDeleteTask,
    });

    render(<TaskContainer />);

    expect(screen.getByText(/2 tarefas/i)).toBeInTheDocument();
  });

  it("should display singular form when there is one task", () => {
    const tasks = [createPendingTask({ id: "1", descricao: "Tarefa 1" })];

    mockedUseTasks.mockReturnValue({
      tasks,
      filteredTasks: tasks,
      filter: "todas",
      isLoading: false,
      setFilter: mockSetFilter,
      refreshTasks: jest.fn(),
      createTask: mockCreateTask,
      updateTaskStatus: mockUpdateTaskStatus,
      deleteTask: mockDeleteTask,
    });

    render(<TaskContainer />);

    expect(screen.getByText(/1 tarefa/i)).toBeInTheDocument();
  });

  it("should render TaskForm with correct props", () => {
    mockedUseTasks.mockReturnValue({
      tasks: [],
      filteredTasks: [],
      filter: "todas",
      isLoading: false,
      setFilter: mockSetFilter,
      refreshTasks: jest.fn(),
      createTask: mockCreateTask,
      updateTaskStatus: mockUpdateTaskStatus,
      deleteTask: mockDeleteTask,
    });

    render(<TaskContainer />);

    expect(screen.getByPlaceholderText(/digite a descrição da tarefa/i)).toBeInTheDocument();
  });

  it("should render TaskFilters with correct props", () => {
    mockedUseTasks.mockReturnValue({
      tasks: [],
      filteredTasks: [],
      filter: "pendentes",
      isLoading: false,
      setFilter: mockSetFilter,
      refreshTasks: jest.fn(),
      createTask: mockCreateTask,
      updateTaskStatus: mockUpdateTaskStatus,
      deleteTask: mockDeleteTask,
    });

    render(<TaskContainer />);

    expect(screen.getByRole("group", { name: /filtros de tarefas/i })).toBeInTheDocument();
  });

  it("should render TaskList with filtered tasks", () => {
    const tasks = [
      createPendingTask({ id: "1", descricao: "Tarefa 1" }),
      createCompletedTask({ id: "2", descricao: "Tarefa 2" }),
    ];

    mockedUseTasks.mockReturnValue({
      tasks,
      filteredTasks: [tasks[0]],
      filter: "pendentes",
      isLoading: false,
      setFilter: mockSetFilter,
      refreshTasks: jest.fn(),
      createTask: mockCreateTask,
      updateTaskStatus: mockUpdateTaskStatus,
      deleteTask: mockDeleteTask,
    });

    render(<TaskContainer />);

    expect(screen.getByText(/tarefa 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/tarefa 2/i)).not.toBeInTheDocument();
  });
});

