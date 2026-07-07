/**
 * Simple Customer Segmentation using K-Means Clustering
 */

// Simple K-Means implementation
class KMeans {
  constructor(k = 3) {
    this.k = k;
    this.centroids = [];
    this.clusters = [];
  }

  // Calculate distance between two points
  distance(point1, point2) {
    return Math.sqrt(
      point1.reduce((sum, val, i) => sum + Math.pow(val - point2[i], 2), 0)
    );
  }

  // Initialize random centroids
  initializeCentroids(data) {
    this.centroids = [];
    for (let i = 0; i < this.k; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      this.centroids.push([...data[randomIndex]]);
    }
  }

  // Assign each point to nearest centroid
  assignClusters(data) {
    this.clusters = Array(this.k)
      .fill()
      .map(() => []);

    data.forEach((point, index) => {
      let minDistance = Infinity;
      let clusterIndex = 0;

      this.centroids.forEach((centroid, i) => {
        const dist = this.distance(point, centroid);
        if (dist < minDistance) {
          minDistance = dist;
          clusterIndex = i;
        }
      });

      this.clusters[clusterIndex].push(index);
    });
  }

  // Update centroids based on cluster means
  updateCentroids(data) {
    this.centroids = this.clusters.map((cluster) => {
      if (cluster.length === 0) return this.centroids[0];

      const dimension = data[0].length;
      const newCentroid = Array(dimension).fill(0);

      cluster.forEach((pointIndex) => {
        data[pointIndex].forEach((val, i) => {
          newCentroid[i] += val;
        });
      });

      return newCentroid.map((val) => val / cluster.length);
    });
  }

  // Fit the model
  fit(data, iterations = 10) {
    this.initializeCentroids(data);

    for (let iter = 0; iter < iterations; iter++) {
      this.assignClusters(data);
      this.updateCentroids(data);
    }

    return this.clusters;
  }
}

// Segment customers
function segmentCustomers(customers, numSegments = 3) {
  // Prepare data: [totalSpent, purchaseFrequency, daysLastPurchase]
  const data = customers.map((c) => [
    c.totalSpent / 1000, // Normalize
    c.purchaseFrequency / 100, // Normalize
    c.lastPurchase / 100, // Normalize
  ]);

  // Apply K-Means
  const kmeans = new KMeans(numSegments);
  kmeans.fit(data, 10);

  // Create segments with customer info
  const segments = {};
  kmeans.clusters.forEach((cluster, segmentIndex) => {
    segments[`Segment_${segmentIndex + 1}`] = cluster.map(
      (customerIndex) => customers[customerIndex]
    );
  });

  return segments;
}

// Get segment characteristics
function getSegmentCharacteristics(segments) {
  const characteristics = {};

  Object.entries(segments).forEach(([segmentName, customers]) => {
    const avgSpent =
      customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length;
    const avgFrequency =
      customers.reduce((sum, c) => sum + c.purchaseFrequency, 0) /
      customers.length;
    const avgLastPurchase =
      customers.reduce((sum, c) => sum + c.lastPurchase, 0) / customers.length;

    characteristics[segmentName] = {
      size: customers.length,
      avgSpent: avgSpent.toFixed(2),
      avgFrequency: avgFrequency.toFixed(2),
      avgLastPurchase: avgLastPurchase.toFixed(2),
      label:
        avgSpent > 5000
          ? "High Spenders"
          : avgSpent > 2000
            ? "Regular Buyers"
            : "New/Low Activity",
    };
  });

  return characteristics;
}

module.exports = {
  segmentCustomers,
  getSegmentCharacteristics,
  KMeans,
};
