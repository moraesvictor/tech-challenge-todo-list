import { render, screen } from "@test-utils";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly the component", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("should render with primary variant by default", () => {
    render(<Button>Primary Button</Button>);

    const button = screen.getByRole("button", { name: /primary button/i });
    expect(button).toHaveClass("bg-blue-600");
  });

  it("should render with secondary variant", () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    const button = screen.getByRole("button", { name: /secondary button/i });
    expect(button).toHaveClass("bg-gray-200");
  });

  it("should render with danger variant", () => {
    render(<Button variant="danger">Danger Button</Button>);

    const button = screen.getByRole("button", { name: /danger button/i });
    expect(button).toHaveClass("bg-red-600");
  });

  it("should render with ghost variant", () => {
    render(<Button variant="ghost">Ghost Button</Button>);

    const button = screen.getByRole("button", { name: /ghost button/i });
    expect(button).toHaveClass("bg-transparent");
  });

  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    render(<Button onClick={mockOnClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it("should show loading text when isLoading is true", () => {
    render(<Button isLoading>Submit</Button>);

    expect(screen.getByText(/carregando.../i)).toBeInTheDocument();
    expect(screen.queryByText(/submit/i)).not.toBeInTheDocument();
  });

  it("should accept custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByRole("button", { name: /custom button/i });
    expect(button).toHaveClass("custom-class");
  });

  it("should pass through other button attributes", () => {
    render(<Button type="submit" aria-label="Submit form">Submit</Button>);

    const button = screen.getByRole("button", { name: /submit form/i });
    expect(button).toHaveAttribute("type", "submit");
  });
});

