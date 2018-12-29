class Fabric {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.createUsageMap();
  }

  getUsageMap() {
    return this.usageMap;
  }

  setUsageMap(usageMap) {
    this.usageMap = usageMap;
  }

  // TODO could improve readability of these nested for loops
  addOrder(order) {
    const verticalPos = parseInt(order.verticalPos, 10);
    const horizontalPos = parseInt(order.horizontalPos, 10);
    const height = parseInt(order.height, 10);
    const width = parseInt(order.width, 10);

    for (let i = verticalPos; i < (verticalPos + height); i++) {
      for (let j = horizontalPos; j < (horizontalPos + width); j++) {
        this.usageMap[i][j] += 1;
      }
    }
  }

  isOrderOverlapping(order) {
    const verticalPos = parseInt(order.verticalPos, 10);
    const horizontalPos = parseInt(order.horizontalPos, 10);
    const height = parseInt(order.height, 10);
    const width = parseInt(order.width, 10);

    for (let i = verticalPos; i < verticalPos + height; i++) {
      for (let j = horizontalPos; j < horizontalPos + width; j++) {
        if (this.usageMap[i][j] > 1) {
          return true;
        }
      }
    }
    return false;
  }

  createUsageMap() {
    this.usageMap = [];
    for (let i = 0; i < this.height; i++) {
      this.usageMap.push([]);
      for (let j = 0; j < this.width; j++) {
        this.usageMap[i].push(0);
      }
    }
  }

  sumDoubles() {
    let sum = 0;
    for (let i = 0; i < this.usageMap.length; i++) {
      for (let j = 0; j < this.usageMap[i].length; j++) {
        if (this.usageMap[i][j] >= 2) {
          sum++;
        }
      }
    }
    return sum;
  }
}

module.exports = Fabric;
