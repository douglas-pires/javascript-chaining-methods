# Javascript Function Chaining

## Requirements:

Some knowledge in JavaScript like:

- [Arrow functions]()
- [Array methods]()
- [Async functions]()

If you are a developer for a while, you already experienced some `Array` methods, something like [map](), [reduce](), [filter]() and hence, you already saw something like this:

```javascript
const food = [
  { name: "Banana", type: "fruit" },
  { name: "Apple", type: "fruit" },
  { name: "Chocolate", type: "candy" },
  { name: "Orange", type: "fruit" }
];

// This type of usage is very common
food
  .map(item => item.type)
  .reduce((result, fruit) => {
    result.push(fruit);
    return [...new Set(result)];
  }, []);
// result: ['fruit', 'candy']
```

Javascript is a language that has many awesome features. The pattern above is called _Function Chaining_ and is used when you want to call multiple functions using the same object, and using its same reference.

By any means, the array method `map` returns an `Array`, that hence it has a formidable number of methods. By returning a reference that points to an Array, you will have access to all properties that Array has. Knowing that, we can use the same principle to create our own methods chaining.

## Knowing `this` better

I'm not going to cover all nuances of `this` in this article, but it will be good to introduce at least the whys. The keyword [this]() can be often a nightmare to understand why things don't run when they should, and it doesn't matter how experienced you are, it can be tricky.

`This` will always point to the current `scope` or instance of anywhere it is called. Let's go for an example:

```javascript
const dog = {
  is: null,
  log: () => console.log(this.is),
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
```

When you write a function like this, you might want to chain methods that are related to that object.

The object `dog` above has 3 methods: `walk`, `bark` and `eat`. Every time I call any of its functions, a console should shown the representation of what the dog is doing in that exact moment.

But there's a problem with that function. If you run it on the browser, you will realize that it will not work as expected. That happens because arrow functions use [lexical scoping]() - where `this` is going to refer to the surroundings scope (in this case `window`, but not to the object itself).

To resolve that, we should simply use an anonymous function call to represent the `log` property:

```javascript
// instead of:
  log: () => console.log(this.is),

// use this:
  log() {
    console.log(this.is);
  }
```

Now the dog's `this` scope is going to be accessible inside the function.

## About async functions

For instance, `async` functions are a synthatic sugar for promises, so when you declare an async function, you will know that it will return a promise. Knowing that, you will have a Promise as result and hence, you can access all its methods

```javascript
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

requests.getUser().then(() => requests.registerAction());
```

But, in that case, I'd really use just a bunch `await` keywords for for simplicity:

```javascript
await requests.getUser(); // Douglas Pires
await requests.registerAction(); // programming
```

And you will have access here to the same properties here

```javascript
console.log(requests.user); // Douglas Pires
console.log(requests.action); // programming
```

As always, all code exposed here is already on my [Github]()
