import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FileUploadButton from "."; // Adjust the path as necessary

describe("FileUploadButton Component", () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid interference
  });

  it("renders correctly", () => {
    render(<FileUploadButton onChange={mockOnChange} disabled={false} />);

    const button = screen.getByRole("button", { name: /choisir un fichier/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("triggers file input when button is clicked", () => {
    const { container } = render(
      <FileUploadButton onChange={mockOnChange} disabled={false} />
    );

    // Simulate clicking the button
    fireEvent.click(screen.getByText(/choisir un fichier/i));

    // Check if the file input was triggered
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute("accept", ".csv");
  });

  it("calls onChange when a file is selected", () => {
    const { container } = render(
      <FileUploadButton onChange={mockOnChange} disabled={false} />
    );

    const fileInput = container.querySelector('input[type="file"]');

    // Simulate selecting a file
    fireEvent.change(fileInput!, {
      target: {
        files: [new File(["sample"], "sample.csv", { type: "text/csv" })],
      },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("is disabled when the disabled prop is true", () => {
    render(<FileUploadButton onChange={mockOnChange} disabled={true} />);

    const button = screen.getByRole("button", { name: /choisir un fichier/i });
    expect(button).toHaveAttribute("aria-disabled", "true");

    // Ensure clicking doesn't trigger file input
    fireEvent.click(button);
    const fileInput = screen.getByLabelText("Upload CSV file");
    expect(fileInput).not.toHaveFocus(); // File input should not be triggered
  });
});
