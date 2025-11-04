import { render, screen } from "@test-utils";
import userEvent from "@testing-library/user-event";
import { TaskFilters } from "./TaskFilters";

describe("TaskFilters", () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly the component", () => {
    render(
      <TaskFilters currentFilter="todas" onFilterChange={mockOnFilterChange} />
    );

    expect(screen.getByRole("group", { name: /filtros de tarefas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /todas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pendentes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /concluídas/i })).toBeInTheDocument();
  });

  it("should highlight current filter", () => {
    render(
      <TaskFilters currentFilter="pendentes" onFilterChange={mockOnFilterChange} />
    );

    const pendentesButton = screen.getByRole("button", { name: /pendentes/i });
    expect(pendentesButton).toHaveAttribute("aria-pressed", "true");
  });

  it("should call onFilterChange when filter button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TaskFilters currentFilter="todas" onFilterChange={mockOnFilterChange} />
    );

    const pendentesButton = screen.getByRole("button", { name: /pendentes/i });
    await user.click(pendentesButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("pendentes");
  });

  it("should call onFilterChange with 'todas' when todas button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TaskFilters currentFilter="pendentes" onFilterChange={mockOnFilterChange} />
    );

    const todasButton = screen.getByRole("button", { name: /todas/i });
    await user.click(todasButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith("todas");
  });

  it("should call onFilterChange with 'concluidas' when concluidas button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TaskFilters currentFilter="todas" onFilterChange={mockOnFilterChange} />
    );

    const concluidasButton = screen.getByRole("button", { name: /concluídas/i });
    await user.click(concluidasButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith("concluidas");
  });

  it("should have aria-pressed false for non-active filters", () => {
    render(
      <TaskFilters currentFilter="pendentes" onFilterChange={mockOnFilterChange} />
    );

    const todasButton = screen.getByRole("button", { name: /todas/i });
    const concluidasButton = screen.getByRole("button", { name: /concluídas/i });

    expect(todasButton).toHaveAttribute("aria-pressed", "false");
    expect(concluidasButton).toHaveAttribute("aria-pressed", "false");
  });
});

