# AI for Future - ML Business Project

A simple Machine Learning project for **Product Recommendation** and **Customer Segmentation** using JavaScript.

## Features

- 🎯 **Product Recommendation**: Recommends products based on customer preferences
- 📊 **Customer Segmentation**: Groups customers into segments using K-Means clustering
- 📈 **Simple & Easy**: No complex dependencies, pure JavaScript logic

## Project Structure

```
├── package.json
├── index.js              # Main entry point
├── customerSegmentation.js
├── productRecommendation.js
├── data/
│   ├── customers.json
│   └── products.json
├── test.js
└── README.md
```

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## How It Works

### 1. Customer Segmentation
Uses K-Means clustering to group customers into segments based on:
- Purchase history
- Spending amount
- Frequency

### 2. Product Recommendation
Recommends products based on:
- Customer segment
- Purchase history
- Similar customer preferences

## Example Output

```
Customer Segments:
- Segment 1: High spenders (10 customers)
- Segment 2: Regular buyers (15 customers)
- Segment 3: New customers (5 customers)

Product Recommendations for Customer #1:
- Product A (85% match)
- Product B (72% match)
```

## License

MIT
