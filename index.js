/**
 * AI for Future - Main Entry Point
 * Machine Learning for Product Recommendation & Customer Segmentation
 */

const fs = require("fs");
const path = require("path");
const { segmentCustomers, getSegmentCharacteristics } = require("./customerSegmentation");
const { recommendProducts, getPurchaseHistory } = require("./productRecommendation");

// Load data
const customersData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/customers.json"), "utf8")
);
const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/products.json"), "utf8")
);

console.log("🤖 AI FOR FUTURE - ML Business Project\n");
console.log("=".repeat(50));

// ==========================================
// 1. CUSTOMER SEGMENTATION
// ==========================================
console.log("\n📊 CUSTOMER SEGMENTATION ANALYSIS\n");

const segments = segmentCustomers(customersData, 3);
const characteristics = getSegmentCharacteristics(segments);

Object.entries(characteristics).forEach(([segmentName, data]) => {
  console.log(`\n${segmentName}: ${data.label}`);
  console.log(`  • Customers: ${data.size}`);
  console.log(`  • Avg Spent: $${data.avgSpent}`);
  console.log(`  • Purchase Frequency: ${data.avgFrequency} times`);
  console.log(`  • Days Since Last Purchase: ${data.avgLastPurchase}`);
  console.log("  • Customers:", segments[segmentName].map((c) => c.name).join(", "));
});

// ==========================================
// 2. PRODUCT RECOMMENDATIONS
// ==========================================
console.log("\n" + "=".repeat(50));
console.log("\n🎯 PRODUCT RECOMMENDATIONS\n");

const purchaseHistory = getPurchaseHistory();

customersData.slice(0, 3).forEach((customer) => {
  console.log(`\nRecommendations for ${customer.name} (ID: ${customer.id}):`);
  const recommendations = recommendProducts(
    customer,
    productsData,
    customersData,
    purchaseHistory
  );

  recommendations.forEach((product, index) => {
    console.log(
      `  ${index + 1}. ${product.name} - ${product.matchScore}% match (Price: $${product.price}, Rating: ⭐${product.rating})`
    );
  });
});

// ==========================================
// 3. BUSINESS INSIGHTS
// ==========================================
console.log("\n" + "=".repeat(50));
console.log("\n💡 BUSINESS INSIGHTS\n");

const totalCustomers = customersData.length;
const totalRevenue = customersData.reduce((sum, c) => sum + c.totalSpent, 0);
const avgCustomerValue = (totalRevenue / totalCustomers).toFixed(2);

console.log(`Total Customers: ${totalCustomers}`);
console.log(`Total Revenue: $${totalRevenue}`);
console.log(`Average Customer Value: $${avgCustomerValue}`);
console.log(
  `Top Customer: ${customersData.reduce((prev, current) => (prev.totalSpent > current.totalSpent ? prev : current)).name}`
);

// ==========================================
// 4. SUMMARY
// ==========================================
console.log("\n" + "=".repeat(50));
console.log("\n✅ ANALYSIS COMPLETE!\n");
console.log("Summary:");
console.log(`  ✓ Segmented ${totalCustomers} customers into ${Object.keys(segments).length} segments`);
console.log(`  ✓ Generated recommendations for ${customersData.length} customers`);
console.log(`  ✓ Analyzed ${productsData.length} products`);

console.log("\n" + "=".repeat(50));
