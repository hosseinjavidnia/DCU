# Introduction to Programming with Python – 12 Week Teaching Plan

## Module Description

This is an **introduction to computer programming** using Python.  
Students will learn to write **simple programs**, including:

- Using basic types (integers, floating-point numbers, Booleans, strings)
- Declaring and using variables
- Writing expressions
- Using flow control (conditionals and loops)
- Designing simple numeric and string algorithms
- Developing an informal understanding of computational cost (complexity)

---

## Overall Learning Outcomes

By the end of the module, students should be able to:

1. Use basic programming types (integers, floating-point numbers, Booleans and strings) appropriately in simple Python programs.
2. Declare and manipulate variables and expressions to compute results.
3. Use basic flow control structures (conditionals and loops) to implement simple algorithms.
4. Design and implement basic numeric and string-processing algorithms.
5. Informally reason about the computational cost of loops and nested loops.

---

## Assumed Structure

- **12 weeks**
- Each week:
  - ~2-hour **lecture** (concepts, examples, live demos)
  - ~1–2-hour **lab/practical** (exercises using online Python environment)
- Assessments (suggested):
  - Weekly/bi-weekly **formative exercises**
  - 1–2 **summative programming assignments**
  - Final **quiz / exam / practical test**

---

## Week-by-Week Plan

### Week 1 – What is Programming?

**Lecture Focus (2 hours)**  
- What is a computer? (hardware, software, input/output, memory, CPU)
- What is a program?
  - Instructions, data, and the stored-program concept
- What is an algorithm?
  - Everyday examples (recipes, directions, checklists)
  - Properties of a good algorithm (input, output, definiteness, finiteness, effectiveness)
- Human vs computer understanding:
  - Ambiguity and the need for precise, unambiguous instructions
- Levels of description:
  - Problem description → algorithm → pseudocode → program
- Short introduction to Python:
  - What Python is, where it’s used
  - Optional: `print("Hello, world!")` demo

**Activities**
- “Human computer” game: following literal instructions to draw or perform a task
- Writing everyday algorithms (e.g. making tea, brushing teeth) with clear steps
- Short reflection: what is an algorithm?

**Lab Focus (indicative)**
- Orientation to online Python environment (no or minimal coding)
- Basic “Hello, world!” and print statements if desired

---

### Week 2 – From Algorithms to Pseudocode (Pre-Code Thinking)

**Lecture Focus (2 hours)**  
- Problem-solving steps:
  - Understand problem → plan → algorithm → (later) code → test
- Pseudocode:
  - Purpose and style (not a real language, but structured)
  - Sequencing, decisions, and repetition in pseudocode
- Basic flowchart ideas (optional):
  - Start/end, process, decision shapes
- Conceptual introduction to:
  - State, variables as “named boxes” (no formal syntax yet)
- Example algorithms:
  - Find the largest of three numbers
  - Compute average of a few numbers
  - Count how many values satisfy a property

**Activities**
- Write pseudocode for:
  - Largest of three numbers
  - Even/odd check
  - Average of 5 numbers
- Class discussion on clarity, missing steps, and ambiguity

**Lab Focus (indicative)**
- Translating simple pseudocode into structured steps
- Optional: very basic Python demo of arithmetic expressions

---

### Week 3 – Python as a Calculator: Expressions & Basic Types

**Lecture Focus (2 hours)**  
- What is Python (interpreter, script, REPL)?
- Using Python as a calculator:
  - Arithmetic operators: `+`, `-`, `*`, `/`, `//`, `%`, `**`
  - Operator precedence and parentheses
- Basic types:
  - Integers (`int`)
  - Floating-point numbers (`float`)
  - Booleans (`bool`) (introduced conceptually)
  - Strings (`str`)
- Literals and expressions:
  - Numeric literals
  - String literals with quotes
- Using `type()` to inspect types

**Activities**
- Predict the output of expressions, then check in Python
- Class discussion: where do types matter?

**Lab Focus**
- Hands-on: using the online Python environment
- Evaluating expressions and checking their types
- Simple string operations (concatenation, repetition)

---

### Week 4 – Variables, Assignment & Simple Input/Output

**Lecture Focus (2 hours)**  
- Variables:
  - Concept: named storage for values
  - Syntax: `name = expression`
  - Assignment vs equality
- Updating variables:
  - `x = x + 1` and similar patterns
- Naming conventions:
  - Valid identifiers, readability
- Simple input/output:
  - `print()` for output
  - `input()` for user input
  - Type conversion: `int()`, `float()`, and basic pitfalls

**Activities**
- Write simple “story problems”:
  - Compute pay from hours and rate
  - Convert Celsius to Fahrenheit, etc.
- Common errors:
  - Using a variable before assigning it
  - Mixing strings and numbers

**Lab Focus**
- Program 1: Greeting user by name
- Program 2: Reading two numbers and outputting sum/average
- Program 3: Simple calculator-style scripts

---

### Week 5 – Booleans and Conditionals (If Statements)

**Lecture Focus (2 hours)**  
- Boolean values:
  - `True` and `False`
- Comparison operators:
  - `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical operators:
  - `and`, `or`, `not`
- Conditionals:
  - `if`, `if-else`, `if-elif-else`
- Relating conditionals back to algorithm decisions
  - Selection: “if condition then … else …”

**Activities**
- Examples:
  - Sign of a number (positive/negative/zero)
  - Simple grading scheme
  - Age-based categories
- Trace small `if`-based programs and predict output

**Lab Focus**
- Implement simple decision-making programs:
  - Check if number is even/odd
  - Simple ticket-price calculator (e.g. student/senior/full)
- Introduce debugging of common conditional errors

**Assessment Suggestion**
- **Assignment 1** (small): implement a decision-based program (e.g. fare calculator / basic grading)

---

### Week 6 – Loops I: While Loops & Basic Repetition

**Lecture Focus (2 hours)**  
- Why loops? Repetition in algorithms
- `while` loop structure:
  - Initialisation, condition, update
- Example patterns:
  - Counting loops (e.g. sum 1 to N)
  - Input validation loop (repeat until valid input)
  - Sentinel-controlled loop (stop on special value)
- Discussion of infinite loops:
  - How they happen and how to avoid them

**Activities**
- Trace simple `while` loops with tables of variable values
- Identify errors that cause infinite loops

**Lab Focus**
- Programs using while loops:
  - Summing numbers until user enters 0
  - Factorial of a positive integer
  - Number-guessing game (simple feedback)

---

### Week 7 – Loops II: For Loops, Ranges, and Strings

**Lecture Focus (2 hours)**  
- `for` loops with `range()`:
  - `range(n)`, `range(start, stop)`, `range(start, stop, step)`
- When to use `for` vs `while`
- Iterating over sequences:
  - Looping over characters in a string
- Aggregation patterns:
  - Counting, summing, searching

**Activities**
- Write loops to:
  - Print sequences of numbers
  - Count vowels in a string
  - Reverse a string (conceptually)

**Lab Focus**
- Hands-on exercises with `for` loops:
  - Generating multiplication tables
  - Counting occurrences of a character
  - Simple pattern printing using loops

---

### Week 8 – Numeric Algorithms

**Lecture Focus (2 hours)**  
- Combining variables, conditionals, and loops for numeric tasks
- Classic numeric algorithms:
  - Max and min of a series of numbers
  - Sum and average, counting
  - Simple search for a target value
- Introducing tracing and dry-running algorithms:
  - Trace tables for numeric algorithms

**Activities**
- Design algorithms for:
  - Reading N values and computing sum, average, max, min
  - Counting how many numbers satisfy a condition (e.g. greater than 10)
- Trace given algorithms before running them

**Lab Focus**
- Implement numeric algorithms:
  - Max/min/sum/average for user-entered numbers
  - Simple prime-checking algorithm (trial division)
  - Sum of digits of an integer

---

### Week 9 – String Algorithms

**Lecture Focus (2 hours)**  
- Strings revisited:
  - Indexing: `s[0]`, `s[-1]`
  - Slicing: `s[start:end]`
- Basic string methods:
  - `.lower()`, `.upper()`, `.strip()`, `.find()`, `.replace()`, `.split()`
- String-processing algorithms:
  - Counting characters and words
  - Checking for substrings
  - Palindrome check (simple version)

**Activities**
- Design algorithms for:
  - Counting words in a sentence
  - Normalising user input (case, whitespace)
  - Checking whether a string is a palindrome ignoring case/space

**Lab Focus**
- Implement text-processing programs:
  - Count characters, words, and specific symbols
  - Simple keyword search in a line of text
  - Palindrome checker

**Assessment Suggestion**
- **Assignment 2**: small text-analysis task combining strings, loops, and conditionals

---

### Week 10 – Nested Loops & Intro to Complexity

**Lecture Focus (2 hours)**  
- Nested loops:
  - `for` inside `for`, `while` inside `while`, etc.
  - Practical uses: pattern printing, comparing pairs of values
- Informal introduction to complexity:
  - How the number of operations grows with input size
  - Examples of linear vs quadratic growth (N vs N²)
- Link nested loops to computational cost:
  - Rough counts of loop iterations

**Activities**
- Example: print grids or multiplication tables using nested loops
- Informal step counting for simple nested-loop algorithms

**Lab Focus**
- Write programs with nested loops:
  - 2D patterns of characters (e.g. rectangles, triangles)
  - Checking for duplicates in a list of numbers or characters
- Explore performance qualitatively by running for different input sizes (small vs larger N)

---

### Week 11 – Algorithm Design, Testing & Debugging

**Lecture Focus (2 hours)**  
- Putting it all together:
  - From problem statement to working program
- Algorithm design techniques:
  - Decomposing problems into smaller subproblems
  - Stepwise refinement (start simple, then add features)
- Testing:
  - Types of errors: syntax, runtime, logical
  - Testing with normal, edge, and corner cases
- Debugging strategies:
  - Reading error messages
  - Using `print()` for tracing
  - Checking assumptions

**Activities**
- Analyse and correct buggy programs (given code samples)
- Design test cases for a small program:
  - Identify inputs that might break it

**Lab Focus**
- Small “mini-project” style problem:
  - Students design algorithm in pseudocode
  - Implement in Python
  - Test systematically and fix bugs

---

### Week 12 – Review, Integration & Final Assessment

**Lecture Focus (2 hours)**  
- Review of key concepts:
  - Types: `int`, `float`, `bool`, `str`
  - Variables and expressions
  - Conditionals (`if`, `elif`, `else`)
  - Loops (`while`, `for`, nested loops)
  - Numeric and string algorithms
  - Informal reasoning about complexity
- Integrative examples:
  - One or two programs combining input, types, conditionals, loops, and basic algorithms

**Activities**
- Concept check via quiz-style questions or polls
- Discussion of typical mistakes and how to avoid them
- Short reflection: what students feel confident about, what they want to revise

**Lab / Assessment Focus**
- Final practical or quiz/exam:
  - Write and explain simple programs using the covered constructs
  - Show understanding of the basic types, flow control, and algorithms
- Wrap-up:
  - Suggestions for further learning (e.g. functions, lists, files in a follow-on course)
