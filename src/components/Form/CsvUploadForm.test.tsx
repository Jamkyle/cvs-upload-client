import React from 'react'; // to jest issue
import { render, screen, fireEvent } from '@testing-library/react';
import CsvUploadForm from '.'; // Adjust the import path as necessary
import { useUploadFile } from '@/hooks/useUploadFile'; // Import the hook

// Mock the custom hook
jest.mock('@/hooks/useUploadFile');

describe('CsvUploadForm Component', () => {
    const mockUploadFile = jest.fn();
    const mockResetMessages = jest.fn();
    const mockSetErrorMessage = jest.fn();

    beforeEach(() => {
        (useUploadFile as jest.Mock).mockReturnValue({
            progress: 0,
            errorMessage: '',
            successMessage: '',
            downloadUrl: null,
            setErrorMessage: mockSetErrorMessage,
            uploadFile: mockUploadFile,
            resetMessages: mockResetMessages,
            loading: false,
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test to avoid interference
    });

    it('renders correctly', () => {
        render(<CsvUploadForm />);
        expect(screen.getByText(/upload csv file/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/upload csv file/i)).toBeInTheDocument();
    });

    it('uploads a valid CSV file', () => {
        render(<CsvUploadForm />);
        
        const file = new File(['sample content'], 'test.csv', { type: 'text/csv' });
        const input = screen.getByLabelText(/upload csv file/i);
        
        // Simulate file selection
        fireEvent.change(input, { target: { files: [file] } });

        // Check that uploadFile was called
        expect(mockUploadFile).toHaveBeenCalledWith(file);
    });

    it('shows an error message for invalid file types', () => {
        render(<CsvUploadForm />);
        
        const file = new File(['sample content'], 'test.txt', { type: 'text/plain' });
        const input = screen.getByLabelText(/upload csv file/i);
        
        // Simulate file selection
        fireEvent.change(input, { target: { files: [file] } });

        // Check that setErrorMessage was called
        expect(mockSetErrorMessage).toHaveBeenCalledWith("Invalid file type. Please upload a CSV file.");
    });

    it('shows an error message when no file is selected', () => {
        render(<CsvUploadForm />);
        
        // Simulate no file selection
        fireEvent.change(screen.getByLabelText(/upload csv file/i), { target: { files: null } });

        // Check that setErrorMessage was called
        expect(mockSetErrorMessage).toHaveBeenCalledWith("No file selected. Please select a CSV file.");
    });

    it('displays the spinner when loading', () => {
        // Set loading to true
        (useUploadFile as jest.Mock).mockReturnValue({
            progress: 0,
            errorMessage: '',
            successMessage: '',
            downloadUrl: null,
            setErrorMessage: mockSetErrorMessage,
            uploadFile: mockUploadFile,
            resetMessages: mockResetMessages,
            loading: true,
        });

        render(<CsvUploadForm />);

        expect(screen.getByText(/choisir un fichier/i)).toBeInTheDocument(); // Ensure button is present
        expect(screen.getByRole('status')).toBeInTheDocument(); // Ensure the loader is displayed
    });

    it('displays download link when a file is uploaded successfully', () => {
        // Set success message and download URL
        (useUploadFile as jest.Mock).mockReturnValue({
            progress: 100,
            errorMessage: '',
            successMessage: 'File uploaded successfully!',
            downloadUrl: 'http://example.com/download.zip',
            setErrorMessage: mockSetErrorMessage,
            uploadFile: mockUploadFile,
            resetMessages: mockResetMessages,
            loading: false,
        });

        render(<CsvUploadForm />);

        expect(screen.getByText(/télécharger le fichier/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /télécharger le fichier/i })).toHaveAttribute('href', 'http://example.com/download.zip');
    });
});