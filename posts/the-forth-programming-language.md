---
title: The Forth Programming Language
img: the-forth-programming-language
date: 2017, 12, 02
author: Trevor Payne
cats: programming
tags: oop, functional, programming
---

Forth is an imperative procedural stack oriented extensive meta reflective
[concatenative programming language written by Charles H. Moore for the IBM 1330 Operating System in 1970.](https://en.wikipedia.org/wiki/Concatenative_programming_language)
The name was going to be Fourth because the language is a Fourth Generation
Programming Language, but due to restrictions on file names, the language has
since been named Forth. Forth works by manipulating the parameter stack, and
procedurally carrying out doing so. It is a self modifying language much like
Lisp and Elixir.

### Now, Why Forth?

Creating programs in Forth is simple, yet different. For any programmer Forth
will seem uncomfortable at first, due to it's obscure ways of programming. Such
as the Reverse Polish Notation for maths, how it is compiled and interpreted,
and how it overall looks compared to other languages. The four most basic
integer-arithmetic operators are +, -, _, and /. Much like most programming
languages, + adds, - subtracts, _ multiplies, and / divides. Huh, this doesn't
sound so different! Although it is. Forth does math in what is called The
Reverse Polish Notation, also known as Postfix. Which means before actually
calculating the equation, numbers are added to the stack first. For instance,

Many programmers find this to be very confusing. Although eventually it will
come easy. Forth is also considered strange and confusing because of its strange
syntax. Writing code is done by defining sub-sequences, better known as Words in
the Forth language. These are then added to the parameter stack for later use.
This doesn't sound too complicated, right? It reminds some of Object Oriented
and such. Until you see this:

![Forth Programming Language](/static/img/posts/the-forth-programming-language/forth-2.png)

Now suddenly Forth looks a lot more difficult than it actually is.

No worries, much like any other spoken language, you're not going to understand
it unless you know it. Let's get on that!

### Forth Programming

Notes:

"TOS" = Top of Stack,

"NOS" = Next on Stack

"BOS" = Bottom of Stack

Word = Sub-sequence

Most of Forth programming consists of modifying the stack using the basic Words
dup, swap, rot, drop, and nip. Dup duplicates the TOS, swap swaps the TOS with
the second element, rot rotates the top three elements, drop removes the TOS,
and nip removes the second item. This sounds cool and all, but how can you
create entire programs with just numbers being manipulated? Well, you don't
actually. Forth also has a compile mode, where you can compile sub-sequences to
be called back on later. To enter the compile mode, you can use the :. To exit,
use a ;. Rather than doing 5 dup _ to get the square of a number, you can create
a word for getting the square of every number you want! To do this, first enter
compile mode, name word, then tell it dup _, and finally, exit compile mode by
typing ;. It should look like this:

_: sqr dup \* ;_

Now everything is starting to make a lot more sense! Forth also has a whole
dictionary of words that you can use, in most Forths you can find this by typing
the word words. Much a real dictionary, the words have meaning as well! To get
the meaning of a word in Forth, type the word see, then the word you want the
definition of. In example, see dup. This will help you get a better
understanding of some of the more advanced Forth words. You can find many
resources online for learning more Forth programming.

### Is Forth used?

Yes! By many companies in fact. The language is often described as dead, unused,
and forgotten, but it's one of the only programming languages that has visited
Saturn, space, yet can run on some of the smallest hardware! It is used very
much by NASA, Lockheed, Boeing, and many other Aviation companies. Forth only is
around 500 Lines of Code in languages like x86 and ARM, which is only around
3KB. Although there are many Forth implementations that are much smaller. This
is great when working on extremely small hardware and small storage devices.
Forth does not have much overhead, and can run on baremetal. I'd not be
surprised if SpoonForth becomes a thing one day. Forth is an entire world itself
in the universe of programming, I just hope to shed some light in that beautiful
yet different world.

### In Conclusion

Forth is a small language that can do extremely large things, such as wrap C,
interpret Lisp, create operating systems, etc. It is not very popular due to
it's strange and different syntax, which scares away most programmers. I'm one
of many Forth programmers who wish it was more popular, and hopes to see it
grow. With the fall of OOP, maybe that will be soon.
