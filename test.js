/**
 * Simple Tests for ML Modules
 */

const { segmentCustomers, getSegmentCharacteristics } = require("./customerSegmentation");
const { recommendProducts } = require("./productRecommendation");

// Test data
const testCustomers = [
  {
    id: 1,
    name: "Test Customer 1",
    totalSpent: 5000,
    purchaseFrequency: 50,
    lastPurchase: 10,
    preferredCategories: ["electronics"],
  },
  {
    id: 2,
    name: "Test Customer 2",
    totalSpent: 2000,
    purchaseFrequency: 20,
    lastPurchase: 30,
    preferredCategories: ["clothing"],
  },
];

const testProducts = [
  { id: 1, name: "Laptop", category: "electronics", price: 1200, rating: 4.5 },
  { id: 2, name: "T-Shirt", category: "clothing", price: 25, rating: 4.2 },
];

console.log("🧪 Running Tests...\n");

// Test 1: Segmentation
console.log("✓ Test 1: Customer Segmentation");
try {
  const segments = segmentCustomers(testCustomers, 2);
  console.log("  ✓ Segmentation completed");
  console.log("  ✓ Segments created:", Object.keys(segments).length);
} catch (error) {
  console.log("  ✗ Error:", error.message);
}

// Test 2: Recommendations
console.log("\n✓ Test 2: Product Recommendations");
try {
  const recommendations = recommendProducts(
    testCustomers[0],
    testProducts,
    testCustomers
  );
  console.log("  ✓ Recommendations generated");
  console.log("  ✓ Number of recommendations:", recommendations.length);
  console.log("  ✓ Top recommendation:", recommendations[0].name);
} catch (error) {
  console.log("  ✗ Error:", error.message);
}

// Test 3: Characteristics
console.log("\n✓ Test 3: Segment Characteristics");
try {
  const segments = segmentCustomers(testCustomers, 2);
  const characteristics = getSegmentCharacteristics(segments);
  console.log("  ✓ Characteristics calculated");
  console.log("  ✓ Segments analyzed:", Object.keys(characteristics).length);
} catch (error) {
  console.log("  ✗ Error:", error.message);
}

console.log("\n✅ All tests completed!\n");
