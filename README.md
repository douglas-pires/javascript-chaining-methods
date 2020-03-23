# Javascript Function Chaining

## Requirements:

Some previous knowledge in JavaScript such as:

- [Arrow functions](https://developer.mozilla.org/en-US/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

If you are a developer for a while, you've already experienced some `Array` methods, something like [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and hence, you already saw something like this:

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

Javascript is the language of a thousand wonders, and we can have the impression that everything is permitted. The pattern above is called _Function Chaining_ and is used when you want to call multiple functions using the same object, and using its same reference.

By any means, the array method `map` returns an `Array`, that hence it has a formidable number of methods. By returning a reference that points to an `Array`, you will have access to all properties that `Array` has. Knowing that we can use the same principle to create our own methods chaining.

## Knowing `this` better

I'm not going to cover all nuances of `this` in this article, but it will be good to introduce at least the whys. The keyword [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) can be often a nightmare to understand why things don't work when you expected them to 😅, and it doesn't matter how experienced you are, it can be tricky.

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

The object `dog` above has 3 methods: `walk`, `bark` and `eat`. Every time I call any of its functions, a console should show the representation of what the dog is doing at that exact moment.

But there's a problem with that function. If you run it on the browser, you will realize that it will not work as expected. That happens because arrow functions use [lexical scoping](https://stackoverflow.com/questions/1047454/what-is-lexical-scope) -- where `this` is going to refer to the surroundings scope (in this case `window`, but not to the object itself).

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

## What about async functions

As you may know, `async` functions are a synthetic sugar for promises, so when you declare an async function, you will know that it will return a promise. Knowing that you will have a Promise as a result and hence, you can access all its methods.

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

But, in that case, it would be not very awesome to chain a bunch of promises like that. I'd really recommend using just a bunch `await` keywords. It is simpler and will improve a lot the readability:

```javascript
await requests.getUser(); // Douglas Pires
await requests.registerAction(); // programming
```

And you will have access here to the same properties here:

```javascript
console.log(requests.user); // Douglas Pires
console.log(requests.action); // programming
```

## Conclusion

Chaining functions may be a really practical way to improve readability in some cases and it may be pretty handy when you have to manipulate an object. But, as you could see, you should use it wisely.

In the case of async functions, it's better just to use some `await` keywords to reach what you want to do, mainly for the sake of simplicity and readability.

With this article, you could learn more about this pattern, and also, a little about `this` scope, and how arrow functions are affected by it.

As always, all code exposed here is already on my [Github](https://github.com/douglas-pires/javascript-chaining-methods) and see you in the next post!

Ciao.
