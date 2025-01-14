# Google Sheets Clone

A modern web-based spreadsheet application built with React, TypeScript, and Tailwind CSS that mimics core functionalities of Google Sheets.

## 🌟 Features

### Spreadsheet Interface
- Google Sheets-like UI with toolbar, formula bar, and cell structure
- Cell formatting options (bold, italic, font size, text color)
- Add/delete rows and columns
- Consistent cell sizing and responsive layout

### Mathematical Functions
- `SUM()`: Calculate the sum of a range of cells (e.g., `=SUM(A1:A5)`)
- `AVERAGE()`: Calculate the average of a range of cells
- `MAX()`: Find the maximum value in a range
- `MIN()`: Find the minimum value in a range
- `COUNT()`: Count numerical values in a range

### Data Quality Functions
- `TRIM()`: Remove leading/trailing whitespace
- `UPPER()`: Convert text to uppercase
- `LOWER()`: Convert text to lowercase

## 🚀 Live Demo

Check out the live demo: [Google Sheets Clone](https://willowy-florentine-202c96.netlify.app)

## 💻 Tech Stack

- **React** - Frontend framework
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Lucide React** - Icons
- **Vite** - Build tool and development server

## 🛠️ Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## 📝 Usage

### Basic Operations
- Click on any cell to select it
- Double-click to edit cell contents
- Type `=` to start a formula
- Use the toolbar to format text (bold, italic, font size, color)

### Formula Examples
```
=SUM(A1:A5)      // Sum values from A1 to A5
=AVERAGE(B1:B10)  // Average of values from B1 to B10
=MAX(C1:C20)      // Maximum value in range C1 to C20
=MIN(D1:D15)      // Minimum value in range D1 to D15
=COUNT(E1:E30)    // Count numerical values in range E1 to E30
=TRIM(A1)         // Remove whitespace from A1
=UPPER(B1)        // Convert B1 content to uppercase
=LOWER(C1)        // Convert C1 content to lowercase
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
