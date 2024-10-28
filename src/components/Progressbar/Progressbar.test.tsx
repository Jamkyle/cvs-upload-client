import React from "react";
import { render, screen } from "@testing-library/react";
import Progressbar from ".";

describe("Progressbar Component", () => {
  it("renders correctly with progress", () => {
    render(<Progressbar progress={75} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "75");
    expect(progressBar).toHaveTextContent("75%");
    expect(progressBar).toHaveStyle("width: 75%"); // Check inline style
  });

  it("clamps progress values to be between 0 and 100", () => {
    const { rerender } = render(<Progressbar progress={150} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100"
    ); // Ensure it clamps to 100

    rerender(<Progressbar progress={-20} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    ); // Ensure it clamps to 0
  });

  it("renders with 0% progress", () => {
    render(<Progressbar progress={0} />);
    expect(screen.getByRole("progressbar")).toHaveTextContent("0%");
    expect(screen.getByRole("progressbar")).toHaveStyle("width: 0%"); // Ensure width is correct
  });

  it("renders with 100% progress", () => {
    render(<Progressbar progress={100} />);
    expect(screen.getByRole("progressbar")).toHaveTextContent("100%");
    expect(screen.getByRole("progressbar")).toHaveStyle("width: 100%"); // Ensure width is correct
  });
});
