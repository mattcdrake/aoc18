class Fabric {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.createUsageMap();
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
        j < parseInt(order.horizontalPos) + parseInt(order.width);
        j++) {
        this.usageMap[i][j] += 1;
      }
    }
  }

  isOrderOverlapping(order) {
    var verticalPos = parseInt(order.verticalPos);
    var horizontalPos = parseInt(order.horizontalPos);
    var height = parseInt(order.height);
    var width = parseInt(order.width);

    for (var i = verticalPos; i < verticalPos + height; i++) {
      for (var j = horizontalPos; j < horizontalPos + width; j++) {
        if (this.usageMap[i][j] > 1) {
          return true;
        }
      }
    }
    return false;
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
      //console.log(this.usageMap[i])
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
