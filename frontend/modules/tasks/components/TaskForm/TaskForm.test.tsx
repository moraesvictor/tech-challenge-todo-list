import { render, screen, act } from "@test-utils";
import userEvent from "@testing-library/user-event";
import { TaskForm } from "./TaskForm";

describe("TaskForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly the component", () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText(/digite a descrição da tarefa/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /adicionar/i })).toBeInTheDocument();
  });

  it("should disable submit button when input is empty", () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: /adicionar/i });
    expect(submitButton).toBeDisabled();
  });

  it("should enable submit button when input has value", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/digite a descrição da tarefa/i);
    await act(async () => {
      await user.type(input, "Nova tarefa");
    });

    const submitButton = screen.getByRole("button", { name: /adicionar/i });
    expect(submitButton).not.toBeDisabled();
  });

  it("should call onSubmit when form is submitted with valid data", async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);

    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/digite a descrição da tarefa/i);
    await act(async () => {
      await user.type(input, "Nova tarefa");
    });

    const submitButton = screen.getByRole("button", { name: /adicionar/i });
    await act(async () => {
      await user.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith("Nova tarefa");
  });

  it("should clear input after successful submission", async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);

    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/digite a descrição da tarefa/i) as HTMLInputElement;
    await act(async () => {
      await user.type(input, "Nova tarefa");
    });

    const submitButton = screen.getByRole("button", { name: /adicionar/i });
    await act(async () => {
      await user.click(submitButton);
    });

    expect(input.value).toBe("");
  });

  it("should disable input and button when isLoading is true", () => {
    render(<TaskForm onSubmit={mockOnSubmit} isLoading={true} />);

    const input = screen.getByPlaceholderText(/digite a descrição da tarefa/i);
    const submitButton = screen.getByRole("button", { name: /adicionar/i });

    expect(input).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it("should show loading state when submitting", async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/digite a descrição da tarefa/i);
    await act(async () => {
      await user.type(input, "Nova tarefa");
    });

    const submitButton = screen.getByRole("button", { name: /adicionar/i });
    await act(async () => {
      await user.click(submitButton);
    });

    expect(screen.getByText(/carregando.../i)).toBeInTheDocument();
  });

  it("should handle submission error", async () => {
    const user = userEvent.setup();
    const errorMessage = "Erro ao criar tarefa";
    mockOnSubmit.mockRejectedValue(new Error(errorMessage));

    render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/digite a descrição da tarefa/i);
    await act(async () => {
      await user.type(input, "Nova tarefa");
    });

    const submitButton = screen.getByRole("button", { name: /adicionar/i });
    await act(async () => {
      await user.click(submitButton);
    });

    expect(await screen.findByRole("alert")).toHaveTextContent(errorMessage);
  });

});

