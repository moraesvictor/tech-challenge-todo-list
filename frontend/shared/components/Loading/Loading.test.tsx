import { render, screen } from "@test-utils";
import { Loading } from "./Loading";

describe("Loading", () => {
  it("should render loading spinner", () => {
    const { container } = render(<Loading />);

    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});

