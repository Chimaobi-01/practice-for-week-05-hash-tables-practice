const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(capacity = 2) {
    // Your code here
    this.count = 0
    this.capacity = capacity
    this.data = new Array(this.capacity)
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] = null
    }
  }

  hash(key) {
    // Your code here
    let code = "0x" + sha256(key).slice(0, 8)
    let hashed = this.convertToBase10(code)
    return hashed
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.data.length
  }

  insertNoCollisions(key, value) {
    // Your code here
    let element = new KeyValuePair(key, value)
    let bucketNo = this.hashMod(key)
    if (this.data[bucketNo])
      throw new Error("hash collision or same key/value pair already exists!")
    this.data[bucketNo] = element
    this.count++
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let element = new KeyValuePair(key, value)
    let bucketNo = this.hashMod(key)
    let isCollide = this.data[bucketNo]

    this.count++

    if (isCollide) {
      element.next = isCollide
    }
    this.data[bucketNo] = element
  }

  insert(key, value) {
    // Your code here

    let element = new KeyValuePair(key, value)
    let index = this.hashMod(key)
    let head = this.data[index]

    if(!head) {
      this.data[index] = element
      this.count++

    } else {
      let search = head

      while(search){
        if(search.key === key){
          search.value = value
          return
        }
        search = search.next
      }

      element.next = head
      this.data[index] = element
      this.count++
    }
    
  }

  //helper function
  convertToBase10(str) {
    // Your code here
    let base
    let baseStr
    let value
    let total = 0
    let valueArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]

    if (str.includes("0x")) {
      base = 16
      baseStr = "0x"
    } else {
      base = 2
      baseStr = "0b"
    }

    value = str.split(baseStr)[1]

    for (let i = value.length - 1; i >= 0; i--) {
      let baseExp = (value.length - i) - 1
      let singleValue = valueArr.indexOf(value[i])
      total += (base ** baseExp) * singleValue
    }
    return total
  };
}




module.exports = HashTable;