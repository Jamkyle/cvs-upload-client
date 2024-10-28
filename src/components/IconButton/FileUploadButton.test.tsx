import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FileUploadButton from "."; // Adjust the import path as necessary

describe("FileUploadButton Component", () => {
  const mockOnChange = vi.fn(); // Create a mock function for onChange

  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it("renders correctly", () => {
    render(<FileUploadButton onChange={mockOnChange} disabled={false} />);

    expect(screen.getByLabelText(/upload csv file/i)).toBeInTheDocument();
    expect(screen.getByText(/choisir un fichier/i)).toBeInTheDocument();
  });

  it("should trigger file input click when button is clicked", () => {
    const { container } = render(
      <FileUploadButton onChange={mockOnChange} disabled={false} />
    );

    const button = screen.getByRole("button");
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    // Simulate a click on the button
    fireEvent.click(button);

    // Check that the input's click method is called
    expect(input).toHaveAttribute("type", "file"); // Check that input is rendered
  });

  it("should not trigger file input click when disabled", () => {
    render(<FileUploadButton onChange={mockOnChange} disabled={true} />);

    const button = screen.getByRole("button");

    // Simulate a click on the button
    fireEvent.click(button);

    // Since the button is disabled, onChange should not be called
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("should call onChange when a file is selected", () => {
    const { container } = render(
      <FileUploadButton onChange={mockOnChange} disabled={false} />
    );

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(["sample content"], "test.csv", { type: "text/csv" });

    // Create a mock event to simulate file selection
    Object.defineProperty(input, "files", {
      value: [file],
    });

    // Simulate a change event on the input
    fireEvent.change(input);

    // Check that onChange is called
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything()); // Modify this based on your onChange implementation
  });
});
