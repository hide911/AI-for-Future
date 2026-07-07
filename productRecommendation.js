/**
 * Simple Product Recommendation System
 */

// Calculate similarity score between two categories
function calculateCategorySimilarity(cat1, cat2) {
  if (cat1 === cat2) return 1.0;
  return 0.0;
}

// Calculate recommendation score for a product
function calculateRecommendationScore(
  customer,
  product,
  allCustomers,
  purchaseHistory
) {
  let score = 0;

  // 1. Category preference (40% weight)
  const categoryScore = customer.preferredCategories.some(
    (cat) => cat === product.category
  )
    ? 1.0
    : 0.3;
  score += categoryScore * 0.4;

  // 2. Product rating (30% weight)
  score += (product.rating / 5) * 0.3;

  // 3. Price matching (20% weight)
  // Customers who spend more prefer higher-priced items
  const avgCustomerSpend = customer.totalSpent;
  const priceNormalized = product.price / 2000; // Normalize by max price
  const priceSimilarity = 1 - Math.abs(avgCustomerSpend / 5000 - priceNormalized);
  score += Math.max(0, priceSimilarity) * 0.2;

  // 4. Collaborative filtering (10% weight)
  // Find similar customers and see what they bought
  const similarCustomers = allCustomers.filter(
    (c) =>
      c.id !== customer.id &&
      Math.abs(c.totalSpent - customer.totalSpent) < 2000
  );

  let collaborativeScore = 0;
  similarCustomers.forEach((similar) => {
    if (purchaseHistory[similar.id] && purchaseHistory[similar.id].includes(product.id)) {
      collaborativeScore += 0.5;
    }
  });
  collaborativeScore = Math.min(1, collaborativeScore / Math.max(1, similarCustomers.length));
  score += collaborativeScore * 0.1;

  return Math.min(100, Math.round(score * 100));
}

// Get recommendations for a customer
function recommendProducts(
  customer,
  allProducts,
  allCustomers,
  purchaseHistory = {}
) {
  const recommendations = allProducts
    .map((product) => ({
      ...product,
      matchScore: calculateRecommendationScore(
        customer,
        product,
        allCustomers,
        purchaseHistory
      ),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5); // Top 5 recommendations

  return recommendations;
}

// Get recommendations for multiple customers
function bulkRecommendProducts(
  customers,
  products,
  purchaseHistory = {}
) {
  const recommendations = {};

  customers.forEach((customer) => {
    recommendations[customer.id] = recommendProducts(
      customer,
      products,
      customers,
      purchaseHistory
    );
  });

  return recommendations;
}

// Simple purchase history (can be extended)
function getPurchaseHistory() {
  return {
    1: [1, 2, 5], // Customer 1 bought: Laptop, Smartphone, Headphones
    2: [3, 4, 8], // Customer 2 bought: T-Shirt, Jeans, Coffee Maker
    3: [1, 2, 6], // Customer 3 bought: Laptop, Smartphone, Sports Watch
    4: [7, 3],    // Customer 4 bought: Novel Book, T-Shirt
    5: [2, 5, 6], // Customer 5 bought: Smartphone, Headphones, Sports Watch
    6: [4, 8],    // Customer 6 bought: Jeans, Coffee Maker
  };
}

module.exports = {
  recommendProducts,
  bulkRecommendProducts,
  calculateRecommendationScore,
  getPurchaseHistory,
};
