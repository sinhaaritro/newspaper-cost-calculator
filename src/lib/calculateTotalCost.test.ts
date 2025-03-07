import { calculateTotalCost } from "./calculateTotalCost";

describe("calculateTotalCost", () => {
  it("calculates correctly with no holidays", () => {
    const result = calculateTotalCost(10, 15, 20, 10, 0, 0);
    expect(result).toBe(350); // (10 * 20 + 15 * 10) = 350
  });

  it("calculates correctly with holidays", () => {
    const result = calculateTotalCost(10, 15, 20, 10, 2, 1);
    expect(result).toBe(315); // (10 * 20 + 15 * 10) - (10 * 2 + 15 * 1) = 350 - 35 = 315
  });

  it("handles zero costs correctly", () => {
    const result = calculateTotalCost(0, 0, 20, 10, 2, 1);
    expect(result).toBe(0); // (0 * 20 + 0 * 10) - (0 * 2 + 0 * 1) = 0
  });

  it("handles zero days correctly", () => {
    const result = calculateTotalCost(10, 15, 0, 0, 0, 0);
    expect(result).toBe(0); // (10 * 0 + 15 * 0) - (10 * 0 + 15 * 0) = 0
  });

  it("handles negative result due to excessive holidays", () => {
    const result = calculateTotalCost(10, 15, 20, 10, 25, 15);
    expect(result).toBe(-425); // (10 * 20 + 15 * 10) - (10 * 25 + 15 * 15) = 350 - 775 = -425
  });
});
