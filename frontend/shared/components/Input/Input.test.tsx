import { render, screen } from "@test-utils";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly the component", () => {
    render(<Input placeholder="Enter text" />);

    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  it("should render with label when provided", () => {
    render(<Input label="Name" placeholder="Enter name" />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter name/i)).toBeInTheDocument();
  });

  it("should display error message when error prop is provided", () => {
    render(<Input error="This field is required" placeholder="Enter text" />);

    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should have error styling when error is provided", () => {
    render(<Input error="Error message" placeholder="Enter text" />);

    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toHaveClass("border-red-300");
  });

  it("should have normal styling when no error", () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toHaveClass("border-gray-300");
  });

  it("should call onChange when value changes", async () => {
    const user = userEvent.setup();
    render(<Input onChange={mockOnChange} placeholder="Enter text" />);

    const input = screen.getByPlaceholderText(/enter text/i);
    await user.type(input, "test");

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Input disabled placeholder="Enter text" />);

    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeDisabled();
  });

  it("should have aria-invalid true when error is provided", () => {
    render(<Input error="Error message" placeholder="Enter text" />);

    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("should have aria-invalid false when no error", () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("should have aria-describedby when error is provided", () => {
    render(<Input error="Error message" placeholder="Enter text" />);

    const input = screen.getByPlaceholderText(/enter text/i);
    const errorId = input.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    expect(screen.getByText(/error message/i)).toHaveAttribute("id", errorId);
  });

  it("should accept custom id", () => {
    render(<Input id="custom-id" placeholder="Enter text" />);

    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toHaveAttribute("id", "custom-id");
  });

  it("should accept custom className", () => {
    render(<Input className="custom-class" placeholder="Enter text" />);

    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toHaveClass("custom-class");
  });
});

