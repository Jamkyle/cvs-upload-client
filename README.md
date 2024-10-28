
# CSV File Manager Client

Welcome to the CSV File Manager client! This application allows users to upload CSV files and process them efficiently. 

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have [Node.js](https://nodejs.org/) installed on your machine.
- You have [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) for package management.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/csv-upload-client.git
   ```

2. **Navigate to the client directory**:

   ```bash
   cd /client
   ``

3. **Install dependencies**:

   If you are using Yarn:

   ```bash
   yarn install
   ```

   Or if you prefer npm:

   ```bash
   npm install
   ```

4. **Set up your environment variables**:

   Create a `.env` file in the root of the project directory and add your API URL. For example:

   ```plaintext
   VITE_API_URL=http://your-api-url.com
   ```

   Make sure to replace `http://your-api-url.com` with the actual API endpoint you will be using.

## Running the Application

To start the development server, use the following command:

```bash
npm run dev
```

or 

```bash
yarn dev
```

Visit `http://localhost:5173` in your browser to access the application.

## Usage

1. Click the **Choose File** button to upload a CSV file.
2. The application will process the file and display the results.
3. You can download the processed files if applicable.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or bugs.
