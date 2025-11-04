import { formatDate, formatDateShort } from "./date";

describe("formatDate", () => {
  it("should format date with different times", () => {
    const dateString = "2024-12-25T23:59:00.000Z";
    const result = formatDate(dateString);

    expect(result).toMatch(/25\/12\/2024/);
  });
});

describe("formatDateShort", () => {
  it("should format date without time", () => {
    const dateString = "2024-01-15T10:30:00.000Z";
    const result = formatDateShort(dateString);

    expect(result).toMatch(/15\/01\/2024/);
    expect(result).not.toMatch(/10:30/);
  });

  it("should format date correctly", () => {
    const dateString = "2024-12-25T23:59:00.000Z";
    const result = formatDateShort(dateString);

    expect(result).toBe("25/12/2024");
  });
});

