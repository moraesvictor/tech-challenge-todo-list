import { validateTaskDescription } from "./validation";

describe("validateTaskDescription", () => {
  it("should return null for valid description", () => {
    const result = validateTaskDescription("Valid task description");
    expect(result).toBeNull();
  });

  it("should return error message for empty description", () => {
    const result = validateTaskDescription("");
    expect(result).toBe("A descrição é obrigatória");
  });

  it("should return error message for whitespace-only description", () => {
    const result = validateTaskDescription("   ");
    expect(result).toBe("A descrição é obrigatória");
  });

  it("should return error message for description exceeding 500 characters", () => {
    const longDescription = "a".repeat(501);
    const result = validateTaskDescription(longDescription);
    expect(result).toBe("A descrição deve ter no máximo 500 caracteres");
  });

  it("should return null for description with exactly 500 characters", () => {
    const description = "a".repeat(500);
    const result = validateTaskDescription(description);
    expect(result).toBeNull();
  });

  it("should return null for description with 499 characters", () => {
    const description = "a".repeat(499);
    const result = validateTaskDescription(description);
    expect(result).toBeNull();
  });
});

