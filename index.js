function reduceFruits() {
  const food = [
    { name: "Banana", type: "fruit" },
    { name: "Apple", type: "fruit" },
    { name: "Chocolate", type: "candy" },
    { name: "Orange", type: "fruit" }
  ];

  const foods = food
    .map(item => item.type)
    .reduce((result, fruit) => {
      result.push(fruit);
      return [...new Set(result)];
    }, []);

  document.getElementById("reduce_fruits").innerHTML = foods;
}

function createDoggo() {
  const dog = {
    is: null,
    log() {
      console.log(this.is);
    },
    bark() {
      this.is = "woofing";
      this.log();
      return this;
    },
    walk() {
      this.is = "walking";
      this.log();
      return this;
    },
    eat() {
      this.is = "eating";
      this.log();
      return this;
    }
  };

  dog
    .bark()
    .eat()
    .walk();
}

function classSyntax() {
  class Dog {
    is = null;
    log() {
      console.log(this.is);
    }
    bark() {
      this.is = "woofing";
      this.log();
      return this;
    }
    walk() {
      this.is = "walking";
      this.log();
      return this;
    }
    eat() {
      this.is = "eating";
      this.log();
      return this;
    }
  }
  const dog = new Dog();
  dog
    .bark()
    .eat()
    .walk();
}

function createDoggoWithPrototype() {
  function Dog() {}
  Dog.prototype.is = null;
  Dog.prototype.log = function() {
    console.log(this.is);
  };
  Dog.prototype.bark = function() {
    this.is = "woofing";
    this.log();
    return this;
  };
  Dog.prototype.walk = function() {
    this.is = "walking";
    this.log();
    return this;
  };
  Dog.prototype.eat = function() {
    this.is = "eating";
    this.log();
    return this;
  };

  const dog = new Dog();

  dog
    .bark()
    .eat()
    .walk();
}

async function userAction() {
  const requests = {
    user: null,
    action: null,
    log(something) {
      console.log(this[something]);
    },
    async getUser() {
      this.user = await new Promise(resolve => {
        setTimeout(() => {
          resolve("Douglas Pires");
        }, 1000);
      });
      this.log("user");
      return this;
    },
    async registerAction() {
      this.action = await new Promise(resolve => {
        setTimeout(() => {
          resolve("programming stuff");
        }, 1000);
      });
      this.log("action");
      return this;
    }
  };

  await requests.getUser(); // Douglas Pires
  await requests.registerAction(); // programming
  // And you will have access here to the same properties here
  console.log(requests.user); // Douglas Pires
  console.log(requests.action); // programming
}
