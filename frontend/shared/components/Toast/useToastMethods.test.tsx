import { renderHook, act } from "@test-utils";
import { useToastMethods } from "./useToastMethods";

describe("useToastMethods", () => {
  it("should return success, error, warning, and info methods", () => {
    const { result } = renderHook(() => useToastMethods());

    expect(result.current.success).toBeDefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.warning).toBeDefined();
    expect(result.current.info).toBeDefined();
    expect(typeof result.current.success).toBe("function");
    expect(typeof result.current.error).toBe("function");
    expect(typeof result.current.warning).toBe("function");
    expect(typeof result.current.info).toBe("function");
  });

  it("should call success method without errors", () => {
    const { result } = renderHook(() => useToastMethods());

    act(() => {
      result.current.success("Success message");
    });
  });

  it("should call error method without errors", () => {
    const { result } = renderHook(() => useToastMethods());

    act(() => {
      result.current.error("Error message");
    });
  });

  it("should call warning method without errors", () => {
    const { result } = renderHook(() => useToastMethods());

    act(() => {
      result.current.warning("Warning message");
    });
  });

  it("should call info method without errors", () => {
    const { result } = renderHook(() => useToastMethods());

    act(() => {
      result.current.info("Info message");
    });
  });

  it("should accept custom position without errors", () => {
    const { result } = renderHook(() => useToastMethods());

    act(() => {
      result.current.success("Message", "top-left");
    });
  });
});
