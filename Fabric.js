class Fabric {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.createUsageMap();
  }

  addOrder(dimensions) {

  }

  get usageMap() {
    return this._usageMap;
  }

  set usageMap(data) {
    this._usageMap = data;
  }

  // TODO could improve readability of these nested for loops
  addOrder(order) {
    for (var i = parseInt(order.verticalPos);
            i < parseInt(order.verticalPos) + parseInt(order.height);
            i++) {
      for (var j = parseInt(order.horizontalPos); 
            i < parseInt(order.horizontalPos) + parseInt(order.width);
            i++) {
              this.usageMap[i][j] += 1;
            }
    }
  }

  createUsageMap() {
    this.usageMap = [];
    for (var i = 0; i < this.height; i++) {
      this.usageMap.push([]);
      for (var j = 0; j < this.width; j++) {
        this.usageMap[i].push(0);
      }
    }
  }

  sumDoubles() {
    var sum = 0;
    for (var i = 0; i < this.usageMap.length; i++) {
      for (var j = 0; j < this.usageMap[i].length; j++) {
        if (this.usageMap[i][j] >= 2) {
          sum++;
        }
      }
    }
    return sum;
  }
}

module.exports = Fabric;
