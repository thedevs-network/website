---
title: Type coercion in JavaScript (and why everyone gets it wrong)
img: type-coercion-javascript
date: 2018, 06, 07
author: Muthu Kumar <@MKRhere> (https://mkr.pw)
cats: javascript
tags: javascript, types, coercion
---

Weak dynamic typing is arguably one of those things everybody likes to pick at about JavaScript. For an elegant dynamic language, JavaScript does some very silly things.

Or does it? _(Queue Vsauce intro)_

This is my little attempt to explain JavaScript's type coercion in a very simple manner that all JavaScript developers, regardless of experience, can simply understand. I hope you'll leave this with an enriched knowledge of how to take hold of the language's quirks and use it to your advantage.

## What is it doing wrong?

> **Example 1**

```JavaScript
const a = [ 1, 2, 3 ];
const b = [ 1, 2, 3 ];

console.log(a + b); //-> 1,2,31,2,3 <- Why?
```

> **Example 2**

```JavaScript
const nope = Array(10).join("nope" - 1) + " Batman!";

console.log(nope); //-> NaNNaNNaNNaNNaNNaNNaNNaNNaN Batman! <- Why?
```

> **Example 3**

```JavaScript
const x = [];
const y = {};

console.log(x + y); //-> [object Object] <- Wait what?
```

## Why is it doing it wrong?

The simple reason is history. JavaScript has a long, weird, winding history from when Brendan Eich originally wrote the first prototype in 10 days at Netscape in 1995.

Since then, anything that hasn't been "fixed" has only one reason. JavaScript has one simple rule -- don't break the web. This is why strange things like `typeof null === 'object'` exist. This is outside the scope of this article, so more on why that is [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#null).

## How do I know what's happening?

It's really very simple. When you ask a value to work with an operator it does not respect (like adding an object to a number), or when you ask two values that don't work with each other to work with each other (adding a number and a string), JavaScript tries to convert either or both types to make it work.

But there must be rules for this. After all, if a computer makes a mistake, it's at least consistent about it.

JavaScript simply hooks into appropriate methods found in that object or primitive's prototype. The two that matter are `.toString()` and `.valueOf()`. When you try to concat an array and a string using the "+" operator, the `Array.prototype.toString()` method is called to convert the Array to a string.

Here's a cheatsheet on what coerces to what by default:

| Origin                          | Target  | Result                                       |
|---------------------------------|---------|----------------------------------------------|
| Number                          | Boolean | True, except if it's `0`, or `NaN`           |
| String                          | Boolean | True, except if it's an empty string `""`    |
| undefined or null               | Boolean | Always `false`                               |
| Object, Array, Symbol, Function | Boolean | Always `true`                                |
|                                 |         |                                              |
| Number, Undefined, Null, NaN    | String  | Value as string (`5` --> `"5"`)              |
| Boolean, Function, Symbol       | String  | Value as string (`true` --> `"true"`)        |
| Array                           | String  | String of array values separated by commas   |
|                                 |         | Empty string if empty array                  |
| Object                          | String  | `'[object Object]'` (yes, yes I know...)     |
|                                 |         |                                              |
| String                          | Number  | `NaN`, except if string represents a number  |
|                                 |         | `"5"` --> `5`, `"0.001"` --> `0.001`         |
| Array                           | Number  | `0` if empty array, number if the only       |
|                                 |         | element is a number, `NaN` in any other case |
| Object, Function, undefined     | Number  | `NaN`                                        |
| null                            | Number  | `0`                                          |
| Symbol                          | Number  | THROWS!                                      |

> Side note: I won't go too deep into operators, but a common misunderstanding among amateurs is that the "+" operator behaves unexpectedly. In fact, it does not. It's simply that the same operator acts as one of "summation" (when dealing with numbers), "concatenation" (when dealing with strings), or the "unary plus" operators depending on context. Anything else you attempt to pass to it will result in coercion to either a string or number. We'll come back to this.

It's important to consider that the Arrays are in fact objects. The array prototype is syntax sugar. You can make your own Array type in pure JavaScript by leveraging objects. In fact this is very evident from the fact that you can assign any property to an array, even negative indices and strings.

```JavaScript
var arr = [ ];

arr[0] = "Zero";
// All good

arr[-1] = "Minus One";
// Wait what

arr['prop'] = true;
// Really?

arr.says = "Hello";
// Mr. JavaScript, I'm not feeling so good...

console.log(arr); //-> [ "Zero", -1: "Minus One", prop: true, says: "Hello" ]
```

Do you see what's happening here? Yes, arrays are plain JavaScript objects. But why do they coerce differently? Because they have different builtin `.toString()` and `.valueOf()` methods.

You can even hook into these defaults, or even override them.

```JavaScript
Object.prototype.toString = function() {
	return JSON.stringify(this);
	// "this" refers to the call-site, here the object that calls toString()
};
const obj = { "foo" : "bar" };
const obj2 = { "baz" : "foobar" };

console.log( obj + obj2 ); //-> {"foo":"bar"}{"baz":"foobar"}
```

As you can see, we've overriden the default `.toString()` property to our advantage. We no longer get `[object Object][object Object]` as our value.

> As a side note, I would highly recommend that you never do this in production to builtin datatypes. You can make your own classes of course with custom `.toString()` and `.valueOf()`.

So when does `.toString()` get called, and when does `.valueOf()` get called? Whenever possible, `toString()` will always be called first. Failing that, `.valueOf()` will be called. Constructors like `String()` and `Number()` will respect your methods as well.

When leveraging these methods to your purpose, you have no obligation to return a String type from your prototype's `.toString()` method at all! We'll take JavaScript's inbuild Date as an example.

```JavaScript
const now = new Date();

console.log(now + " is the current time.");
//-> Thu Jun 07 2018 11:17:10 GMT+0530 (IST) is the current time.

Date.prototype.toString = function() {
	return this.valueOf();
};
console.log(now + 10000);
//-> 1528350440978
```

Again, you should never do this to JavaScript builtins, but if you do this to datastructures you may author, consider the implications of what you do.

We still have one loose end to cover. We know JavaScript always coerces to String, Number, or Boolean. And we've learnt how to leverage coercion to the first two types. What about the third?

Coercion to Boolean calls the native `ToBoolean` method. At JavaScript's level, we cannot modify this behaviour. `ToBoolean` is simple. It depends on what JavaScript considers "truthy" and "falsy".

- Objects, Arrays, and Symbols are always truthy (this includes any class you may create).
- null and undefined are always falsy.
- `0`, `-0`, and `+0` are falsy, and all other Numbers are truthy.
- Empty string is falsy, and all other strings are truthy.

But consider this seemingly logic defying coercion:

```JavaScript
console.log( Boolean(-[]) ) //-> false <- but arrays are always truthy?
```

Here, because you're coercing the array to a value first by using the unary minus operator, `-[]` becomes `-0` before it's even passed to the Boolean. Hence what gets called is `Boolean(-0)` which correctly returns `false`.

Now that you have this information, good luck JavaScripting!

---

Hey, I'm Muthu Kumar, and I'm on [Twitter](https://twitter.com/MKRhere), [Telegram](https://t.me/MKRhere), and [Github](https://github.com/codefeathers). Or check my personal website: [https://mkr.pw](https://mkr.pw).
