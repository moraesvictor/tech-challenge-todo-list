import { render, screen } from "@test-utils";
import userEvent from "@testing-library/user-event";
import { ModalBase } from "./ModalBase";

describe("ModalBase", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly the component when isOpen is true", () => {
    render(
      <ModalBase isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </ModalBase>
    );

    expect(screen.getByText(/test modal/i)).toBeInTheDocument();
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  });

  it("should not render when isOpen is false", () => {
    render(
      <ModalBase isOpen={false} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </ModalBase>
    );

    expect(screen.queryByText(/test modal/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/modal content/i)).not.toBeInTheDocument();
  });

  it("should call onClose when clicking on overlay", async () => {
    const user = userEvent.setup();
    render(
      <ModalBase isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </ModalBase>
    );

    const overlay = screen.getByText(/test modal/i).closest("div")?.parentElement;
    if (overlay) {
      await user.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it("should not call onClose when clicking on modal content", async () => {
    const user = userEvent.setup();
    render(
      <ModalBase isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </ModalBase>
    );

    const content = screen.getByText(/modal content/i);
    await user.click(content);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("should display title correctly", () => {
    render(
      <ModalBase isOpen={true} onClose={mockOnClose} title="My Modal Title">
        <p>Content</p>
      </ModalBase>
    );

    expect(screen.getByText(/my modal title/i)).toBeInTheDocument();
  });

  it("should render children correctly", () => {
    render(
      <ModalBase isOpen={true} onClose={mockOnClose} title="Test">
        <div>
          <p>Child 1</p>
          <p>Child 2</p>
        </div>
      </ModalBase>
    );

    expect(screen.getByText(/child 1/i)).toBeInTheDocument();
    expect(screen.getByText(/child 2/i)).toBeInTheDocument();
  });
});

