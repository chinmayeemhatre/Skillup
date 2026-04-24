
const LEVEL_DATA = {
  1: {
    title: "Level 1: Programming Basics",
    shortTitle: "Basics",
    icon: "🧠",
    totalXP: 100,
    status: "done",
    currentXP: 100,
    maxXP: 100,
    progress: 100,
    desc: "Master the foundations of programming — variables, control flow, functions, and OOP concepts. The bedrock of your developer career.",
    theory: {
      sections: [
        {
          title: "🔤 Variables &amp; Data Types",
          content: "A <strong style='color:var(--yellow-l)'>variable</strong> is a named storage location in memory. Python is dynamically typed — you don't need to declare types explicitly. Key built-in types: <code style='color:var(--yellow);background:rgba(0,0,0,0.3);padding:1px 5px;border-radius:3px;'>int</code>, <code style='color:var(--yellow);background:rgba(0,0,0,0.3);padding:1px 5px;border-radius:3px;'>float</code>, <code style='color:var(--yellow);background:rgba(0,0,0,0.3);padding:1px 5px;border-radius:3px;'>str</code>, <code style='color:var(--yellow);background:rgba(0,0,0,0.3);padding:1px 5px;border-radius:3px;'>bool</code>, <code style='color:var(--yellow);background:rgba(0,0,0,0.3);padding:1px 5px;border-radius:3px;'>list</code>, <code style='color:var(--yellow);background:rgba(0,0,0,0.3);padding:1px 5px;border-radius:3px;'>dict</code>.",
          code: `# Variables and data types in Python
name    = "Alice"         # str
age     = 20              # int
gpa     = 9.2             # float
active  = True            # bool
courses = ["CS", "Math"]  # list
profile = {"year": 2}     # dict

# f-strings for string formatting
print(f"{name} is {age} years old — GPA: {gpa}")
# Output: Alice is 20 years old — GPA: 9.2

# Type checking
print(type(gpa))   # <class 'float'>`
        },
        {
          title: "🔁 Control Flow",
          content: "Control flow determines execution order. Three pillars: <strong style='color:var(--yellow-l)'>if-elif-else</strong> for conditional logic, <strong style='color:var(--yellow-l)'>for</strong> loops for iterating sequences, and <strong style='color:var(--yellow-l)'>while</strong> loops for repeated execution based on a condition.",
          code: `# If-elif-else
marks = 85
if marks >= 90:    grade = "A+"
elif marks >= 80:  grade = "A"
elif marks >= 70:  grade = "B"
else:              grade = "C"
print(f"Grade: {grade}")  # Grade: A

# For loop with range
for i in range(1, 6):
    print(i, end=" ")   # 1 2 3 4 5

# While loop with break
n = 1
while n <= 20:
    if n % 7 == 0:
        print(f"First multiple of 7: {n}")
        break
    n += 1  # First multiple of 7: 7`
        },
        {
          title: "🔧 Functions",
          content: "Functions are reusable code blocks that take <strong style='color:var(--yellow-l)'>parameters</strong> and return values. They avoid repetition and make code modular. Python supports default arguments, *args, **kwargs, and lambda (anonymous) functions.",
          code: `# Function with default parameter
def greet(name, greeting="Hello"):
    """Return a personalised greeting."""
    return f"{greeting}, {name}!"

print(greet("Bob"))            # Hello, Bob!
print(greet("Alice", "Hi"))    # Hi, Alice!

# Lambda — anonymous function
square = lambda x: x ** 2
print(square(7))               # 49

# Recursion — classic factorial
def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)

print(factorial(5))            # 120`
        },
        {
          title: "🏗️ OOP — Classes &amp; Objects",
          content: "Object-Oriented Programming organises code into <strong style='color:var(--yellow-l)'>classes</strong> (blueprints) and <strong style='color:var(--yellow-l)'>objects</strong> (instances). Four pillars: <strong>Encapsulation</strong> (hide internals), <strong>Abstraction</strong> (expose essentials), <strong>Inheritance</strong> (reuse parent code), <strong>Polymorphism</strong> (same interface, different behaviour).",
          code: `class Student:
    college = "KGISL"           # class attribute (shared)

    def __init__(self, name, level):
        self.name  = name       # instance attribute
        self.level = level

    def greet(self):
        return f"Hi, I'm {self.name} at Level {self.level}"

# Inheritance — MentorStudent IS-A Student
class MentorStudent(Student):
    def __init__(self, name, level, mentees):
        super().__init__(name, level)   # call parent __init__
        self.mentees = mentees

    def greet(self):             # method override (polymorphism)
        base = super().greet()
        return base + f"; I mentor {self.mentees} juniors"

s = MentorStudent("Rahul", 5, 3)
print(s.greet())
# Hi, I'm Rahul at Level 5; I mentor 3 juniors
print(s.college)               # KGISL (inherited class attr)`
        }
      ],
      resources: [
        { icon:"🎥", title:"Programming Basics - Full Course", type:"Video Tutorial", url:"https://www.youtube.com/watch?v=kqtD5dpn9C8" },
        { icon:"📖", title:"Python Official Docs", type:"Documentation", url:"https://docs.python.org/3/" },
        { icon:"🌐", title:"W3Schools Python Tutorial", type:"Interactive Tutorial", url:"https://www.w3schools.com/python/" },
        { icon:"🎓", title:"CS50x — Harvard Free Course", type:"Free Course", url:"https://cs50.harvard.edu/x/" },
        { icon:"🏋️", title:"HackerRank Python Practice", type:"Practice Problems", url:"https://www.hackerrank.com/domains/python" }
      ]
    },
    quiz: [
      { q:"What will `type(3.14)` return in Python?", options:["&lt;class 'int'&gt;","&lt;class 'float'&gt;","&lt;class 'double'&gt;","&lt;class 'number'&gt;"], answer:1, explanation:"3.14 is a floating-point number. Python's built-in type() function returns &lt;class 'float'&gt;." },
      { q:"Which keyword is used to define a function in Python?", options:["function","func","def","define"], answer:2, explanation:"Python uses the 'def' keyword to define functions, followed by the function name and parentheses." },
      { q:"What does OOP stand for?", options:["Object Oriented Programming","Object Only Programming","Online Object Processing","Operational Object Paradigm"], answer:0, explanation:"OOP stands for Object-Oriented Programming — a paradigm that organises code into objects and classes." },
      { q:"What numbers does range(1, 5) produce?", options:["1, 2, 3, 4, 5","1, 2, 3, 4","0, 1, 2, 3, 4","1 to 5 inclusive"], answer:1, explanation:"range(1, 5) generates integers from 1 (inclusive) to 5 (exclusive): 1, 2, 3, 4." },
      { q:"Which OOP principle allows child classes to override parent methods?", options:["Encapsulation","Abstraction","Polymorphism","Inheritance"], answer:2, explanation:"Polymorphism allows objects of different types to share the same interface. Child classes can override parent methods to change behaviour." }
    ],
    challenge: [
      { q:"Which of the following is a mutable data type in Python?", options:["tuple","string","list","int"], answer:2, explanation:"Lists are mutable, meaning their contents can be changed after creation." },
      { q:"What is the correct syntax to output 'Hello World' in Python?", options:["p('Hello World')","echo 'Hello World'","print('Hello World')","printf('Hello World')"], answer:2, explanation:"Python uses the print() function to output text to the console." },
      { q:"How do you insert comments in Python code?", options:["","// This is a comment","# This is a comment","<!-- This is a comment -->"], answer:2, explanation:"In Python, comments start with the hash character (#)." },
      { q:"Which operator is used for exponentiation (power) in Python?", options:["^","**","//","%"], answer:1, explanation:"The ** operator is used for exponentiation. For example, 2**3 equals 8." },
      { q:"What will be the output of `bool('False')`?", options:["True","False","Error","None"], answer:0, explanation:"Any non-empty string in Python evaluates to True, even the string 'False'." },
      { q:"Which method can be used to remove any whitespace from both the beginning and the end of a string?", options:["strip()","trim()","ptrim()","len()"], answer:0, explanation:"The strip() method removes leading and trailing whitespace." },
      { q:"How do you start a while loop in Python?", options:["while x > y {","while (x > y)","while x > y:","while x > y"], answer:2, explanation:"Python uses a colon (:) to indicate the start of a code block." },
      { q:"What is the correct file extension for Python files?", options:[".pyth",".pt",".pyt",".py"], answer:3, explanation:"Python scripts use the .py file extension." },
      { q:"How do you create a variable with the numeric value 5?", options:["x = int(5)","x = 5","Both are correct","None of the above"], answer:2, explanation:"Both create a variable with the integer value 5, though x = 5 is more idiomatic." },
      { q:"Which built-in function returns the length of a list?", options:["length()","size()","len()","count()"], answer:2, explanation:"The len() function returns the number of items in an object." },
      { q:"What is a correct way to create a function in Python?", options:["function my_func():","def my_func():","create my_func():","my_func() def:"], answer:1, explanation:"The def keyword is used to declare a function in Python." },
      { q:"Which collection is ordered, changeable, and allows duplicate members?", options:["Dictionary","Tuple","Set","List"], answer:3, explanation:"Lists are ordered, mutable, and allow duplicate elements." },
      { q:"How do you access the first element of a list named 'my_list'?", options:["my_list[1]","my_list[0]","my_list.first()","my_list{0}"], answer:1, explanation:"Python lists are 0-indexed, so the first element is at index 0." },
      { q:"What does the `range(5)` function generate?", options:["0, 1, 2, 3, 4, 5","1, 2, 3, 4, 5","0, 1, 2, 3, 4","1, 2, 3, 4"], answer:2, explanation:"range(n) generates numbers from 0 up to, but not including, n." },
      { q:"Which of the following represents a dictionary in Python?", options:["[1, 2, 3]","(1, 2, 3)","{'name': 'Alice', 'age': 25}","{1, 2, 3}"], answer:2, explanation:"Dictionaries are enclosed in curly braces and contain key-value pairs separated by colons." }
    ]
  },

  2: {
    title: "Level 2: Data Structures &amp; Algorithms",
    shortTitle: "DSA",
    icon: "⚡",
    totalXP: 400,
    status: "active",
    currentXP: 240,
    maxXP: 400,
    progress: 68,
    desc: "Master core data structures and algorithms — the backbone of every technical interview. Arrays, linked lists, trees, and sorting algorithms await.",
    theory: {
      sections: [
        {
          title: "📦 Arrays &amp; Two-Pointer Technique",
          content: "Arrays store elements in contiguous memory with <strong style='color:var(--yellow-l)'>O(1)</strong> random access. The <strong style='color:var(--yellow-l)'>Two-Pointer</strong> technique uses two iterators moving through the array simultaneously — it reduces O(n²) brute-force to O(n) in many problems like finding pairs that sum to a target.",
          code: `# Arrays — Two Pointer technique
def two_sum_sorted(arr, target):
    """Find pair summing to target in sorted array — O(n)"""
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:   return (arr[left], arr[right])
        elif s < target:  left  += 1   # need larger sum
        else:             right -= 1   # need smaller sum
    return None

print(two_sum_sorted([1, 2, 4, 7, 11], 9))  # (2, 7)

# Sliding Window — max sum of k consecutive elements
def max_window_sum(arr, k):
    window = sum(arr[:k])
    best = window
    for i in range(k, len(arr)):
        window += arr[i] - arr[i - k]   # slide right
        best = max(best, window)
    return best

print(max_window_sum([2, 1, 5, 1, 3, 2], 3))  # 9 (5+1+3)`
        },
        {
          title: "🔗 Linked Lists — Reverse &amp; Detect Cycle",
          content: "A <strong style='color:var(--yellow-l)'>linked list</strong> is a sequence of nodes where each stores data and a pointer to the next. Unlike arrays, head insertion is O(1) but random access is O(n). Key interview problems: reversing a list, detecting cycles (Floyd's algorithm), and finding the middle node.",
          code: `class Node:
    def __init__(self, val):
        self.val  = val
        self.next = None

def reverse_linked_list(head):
    """Reverses list in-place — O(n) time, O(1) space"""
    prev = None
    curr = head
    while curr:
        nxt       = curr.next
        curr.next = prev    # reverse the pointer
        prev      = curr
        curr      = nxt
    return prev             # new head

def has_cycle(head):
    """Floyd's tortoise-and-hare cycle detection — O(n), O(1)"""
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False

def find_middle(head):
    """Find middle node with two pointers — O(n), O(1)"""
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # slow is at middle`
        },
        {
          title: "🔍 Binary Search",
          content: "<strong style='color:var(--yellow-l)'>Binary Search</strong> works ONLY on sorted arrays. Key idea: compare the middle element to the target and eliminate <em>half</em> the remaining search space each step. This gives O(log n) time. Critical detail: use <code style='color:var(--yellow);background:rgba(0,0,0,0.3);padding:1px 5px;border-radius:3px;'>mid = left + (right - left)
          code: `def binary_search(arr, target):
    """Iterative binary search — O(log n)"""
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left)
        if   arr[mid] == target: return mid
        elif arr[mid] <  target: left  = mid + 1  # go right
        else:                    right = mid - 1  # go left
    return -1   # not found

arr = [1, 3, 5, 7, 9, 11, 13, 15, 17]
print(binary_search(arr, 7))    # 3   (index)
print(binary_search(arr, 6))    # -1  (not found)

# Variations: find first/last occurrence, search in rotated array
def search_rotated(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right)
        if nums[mid] == target: return mid
        if nums[left] <= nums[mid]:   # left half is sorted
            if nums[left] <= target < nums[mid]: right = mid - 1
            else: left = mid + 1
        else:                         # right half is sorted
            if nums[mid] < target <= nums[right]: left = mid + 1
            else: right = mid - 1
    return -1`
        },
        {
          title: "🌳 Binary Trees &amp; Traversals",
          content: "A <strong style='color:var(--yellow-l)'>Binary Search Tree (BST)</strong> keeps left child &lt; root &lt; right child. Three classic DFS traversals: <strong>In-order</strong> (L→Root→R) gives sorted output; <strong>Pre-order</strong> (Root→L→R) used for copying trees; <strong>Post-order</strong> (L→R→Root) used for deleting trees. BFS (level-order) uses a queue.",
          code: `from collections import deque

class TreeNode:
    def __init__(self, val):
        self.val  = val
        self.left = self.right = None

# DFS Traversals
def inorder(root):   # Sorted for BST!
    return inorder(root.left) + [root.val] + inorder(root.right) if root else []

def preorder(root):
    return [root.val] + preorder(root.left) + preorder(root.right) if root else []

# BFS — Level Order Traversal
def bfs(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.val)
        if node.left:  queue.append(node.left)
        if node.right: queue.append(node.right)
    return result

# Build a BST: [5, 3, 7, 1, 4, 6, 8]
def insert(root, val):
    if not root: return TreeNode(val)
    if val < root.val: root.left  = insert(root.left, val)
    else:              root.right = insert(root.right, val)
    return root

root = None
for v in [5, 3, 7, 1, 4, 6, 8]:
    root = insert(root, v)

print(inorder(root))   # [1, 3, 4, 5, 6, 7, 8]  ← sorted!
print(bfs(root))       # [5, 3, 7, 1, 4, 6, 8]  ← level order`
        }
      ],
      resources: [
        { icon:"🎥", title:"Data Structures and Algorithms - Full Course", type:"Video Tutorial", url:"https://www.youtube.com/watch?v=RBSGKlAvoiM" },
        { icon:"📊", title:"Visualgo — Algorithm Visualiser", type:"Interactive Tool", url:"https://visualgo.net/en" },
        { icon:"🏋️", title:"LeetCode — Curated DSA Problems", type:"Practice Platform", url:"https://leetcode.com/problemset/" },
        { icon:"📚", title:"NeetCode.io — DSA Roadmap", type:"Structured Guide", url:"https://neetcode.io/roadmap" },
        { icon:"📖", title:"Big-O Complexity Cheat Sheet", type:"Quick Reference", url:"https://www.bigocheatsheet.com/" }
      ]
    },
    quiz: [
      { q:"What is the time complexity of binary search on a sorted array?", options:["O(n)","O(log n)","O(n log n)","O(1)"], answer:1, explanation:"Binary search divides the search space in half each step, giving O(log n). For n=1,000,000 it takes only ~20 comparisons." },
      { q:"Which data structure uses the LIFO (Last In, First Out) principle?", options:["Queue","Array","Stack","Linked List"], answer:2, explanation:"A Stack uses LIFO — the last element pushed is the first to be popped. Think of a stack of plates — you take from the top." },
      { q:"What is the time complexity of inserting at the HEAD of a singly linked list?", options:["O(n)","O(log n)","O(n²)","O(1)"], answer:3, explanation:"Inserting at the head only requires updating the head pointer — just one operation — so it's O(1) constant time." },
      { q:"In a Binary Search Tree (BST), in-order traversal gives elements in what order?", options:["Random order","Reverse sorted","Ascending (sorted) order","Level-by-level order"], answer:2, explanation:"In-order traversal (Left → Root → Right) on a BST always produces elements in sorted ascending order — a key BST property." },
      { q:"What is the WORST-case time complexity of QuickSort?", options:["O(n log n)","O(n)","O(n²)","O(log n)"], answer:2, explanation:"QuickSort degrades to O(n²) when the pivot is always the min or max element (e.g. sorted input with last-element pivot). Average case is O(n log n)." }
    ],
    challenge: [
      { q:"Which data structure is based on the LIFO principle?", options:["Queue","Stack","Linked List","Tree"], answer:1, explanation:"Stacks operate on a Last-In, First-Out (LIFO) basis." },
      { q:"What is the worst-case time complexity of accessing an element in an Array by index?", options:["O(1)","O(n)","O(log n)","O(n^2)"], answer:0, explanation:"Arrays allow random access, so accessing an element by its index takes O(1) time." },
      { q:"Which of the following is true about a Singly Linked List?", options:["Nodes have pointers to both next and previous nodes","Random access is O(1)","Nodes are stored in contiguous memory","Insertion at the head is O(1)"], answer:3, explanation:"In a singly linked list, inserting a new node at the head only requires changing the head pointer, which takes O(1) time." },
      { q:"What is the time complexity of Binary Search on a sorted array?", options:["O(1)","O(n)","O(log n)","O(n log n)"], answer:2, explanation:"Binary search repeatedly divides the search interval in half, resulting in an O(log n) time complexity." },
      { q:"Which algorithm design paradigm is QuickSort based on?", options:["Dynamic Programming","Greedy Approach","Divide and Conquer","Backtracking"], answer:2, explanation:"QuickSort divides the array into subarrays around a pivot, sorts them independently, and combines them." },
      { q:"What is the height of a balanced Binary Search Tree with N nodes?", options:["O(N)","O(log N)","O(1)","O(N log N)"], answer:1, explanation:"A balanced BST keeps its height to O(log N), ensuring efficient search, insertion, and deletion." },
      { q:"Which data structure is typically used to implement Breadth-First Search (BFS)?", options:["Stack","Queue","Priority Queue","Hash Table"], answer:1, explanation:"BFS processes nodes level by level, making a FIFO Queue the appropriate data structure." },
      { q:"In a Hash Table, what is the process of mapping keys to indices called?", options:["Indexing","Hashing","Mapping","Chaining"], answer:1, explanation:"Hashing involves passing a key through a hash function to determine its index in the array." },
      { q:"What is the worst-case time complexity of searching in an unbalanced Binary Search Tree?", options:["O(log n)","O(n)","O(1)","O(n log n)"], answer:1, explanation:"If the tree becomes highly unbalanced (like a linked list), searching degenerates to O(n)." },
      { q:"Which sorting algorithm repeatedly swaps adjacent elements if they are in the wrong order?", options:["Merge Sort","Quick Sort","Bubble Sort","Insertion Sort"], answer:2, explanation:"Bubble Sort compares and swaps adjacent elements until the list is sorted." },
      { q:"What is a common application of the 'Two-Pointer' technique?", options:["Graph traversal","Finding a pair with a given sum in a sorted array","Parsing an expression tree","Implementing a stack"], answer:1, explanation:"The two-pointer technique is extremely efficient for finding pairs or subarrays in sorted arrays." },
      { q:"Which traversal of a Binary Search Tree (BST) visits the nodes in ascending order?", options:["Pre-order","In-order","Post-order","Level-order"], answer:1, explanation:"In-order traversal (Left, Root, Right) of a BST visits nodes in sorted, ascending order." },
      { q:"What does the Floyd's Tortoise and Hare algorithm detect?", options:["Shortest path","Minimum spanning tree","Cycles in a Linked List","Connected components"], answer:2, explanation:"This algorithm uses two pointers moving at different speeds to detect if a cycle exists in a linked list." },
      { q:"What is the space complexity of iterative Binary Search?", options:["O(n)","O(log n)","O(n log n)","O(1)"], answer:3, explanation:"Iterative binary search only uses a few pointers (left, right, mid), requiring constant O(1) extra space." },
      { q:"Which scenario describes the 'worst case' for QuickSort?", options:["Array is already sorted","Elements are completely random","Array contains only negative numbers","Array has an odd number of elements"], answer:0, explanation:"If the pivot is repeatedly chosen poorly (like the last element of a sorted array), QuickSort degrades to O(n^2)." }
    ]
  },

  3: {
    title: "Level 3: Projects", shortTitle: "Projects", icon: "🛠️", totalXP: 500, status: "locked", currentXP: 0, maxXP: 500, progress: 0,
    desc: "Build real projects — a portfolio that speaks louder than grades. Web apps, REST APIs, and deployment await.",
    theory: {
      sections: [
        {
          title: "🌐 Frontend Development & React",
          content: "The frontend is the user interface. <strong style='color:var(--yellow-l)'>React</strong> is the industry standard library for building UIs. It uses a component-based architecture and a virtual DOM for efficient rendering. Key concepts include <strong style='color:var(--yellow-l)'>JSX</strong> (HTML-in-JS), <strong style='color:var(--yellow-l)'>Props</strong> (passing data), and <strong style='color:var(--yellow-l)'>State</strong> (managing interactive data).",
          code: `import { useState } from 'react';

function Counter({ initialValue }) {

  const [count, setCount] = useState(initialValue);

  return (
    <div className="card">
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`
        },
        {
          title: "⚙️ Backend & RESTful APIs",
          content: "The backend handles business logic and data processing. <strong style='color:var(--yellow-l)'>Node.js</strong> and <strong style='color:var(--yellow-l)'>Express</strong> are popular for building server-side applications. A <strong style='color:var(--yellow-l)'>REST API</strong> uses standard HTTP methods (GET, POST, PUT, DELETE) to allow the frontend to communicate with the server and database.",
          code: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [{ id: 1, name: 'Aarav' }] });
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;

  res.status(201).json({ message: 'User created!', user: newUser });
});

app.listen(3000, () => console.log('Server running on port 3000'));`
        },
        {
          title: "🗄️ Databases (MongoDB)",
          content: "Databases store persistent data. <strong style='color:var(--yellow-l)'>MongoDB</strong> is a NoSQL database that stores data in flexible, JSON-like documents. We use <strong style='color:var(--yellow-l)'>Mongoose</strong> in Node.js to define schemas and interact with the database efficiently.",
          code: `const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  level: { type: Number, default: 1 }
});

const User = mongoose.model('User', userSchema);

async function createUser(userData) {
  try {
    const user = new User(userData);
    await user.save();
    console.log('Saved:', user);
  } catch (error) {
    console.error('Error:', error);
  }
}`
        }
      ],
      resources: [
        { icon: "🎥", title: "React Crash Course", type: "Video Tutorial", url: "https://youtube.com" },
        { icon: "📖", title: "MDN Web Docs", type: "Documentation", url: "https://developer.mozilla.org" }
      ]
    },
    quiz: [
      { q: "What does REST stand for?", options: ["Representational State Transfer", "Remote Execution Syntax", "Random End State", "Rapid Execution"], answer: 0, explanation: "REST stands for Representational State Transfer, an architectural style for APIs." },
      { q: "Which of the following is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], answer: 2, explanation: "MongoDB stores data in flexible, JSON-like documents." },
      { q: "Which HTTP method is typically used to create a new resource?", options: ["GET", "PUT", "POST", "DELETE"], answer: 2, explanation: "POST is used to submit an entity to the specified resource, often causing a change in state or side effects." },
      { q: "What is React primarily used for?", options: ["Database management", "Building user interfaces", "Server-side routing", "Creating REST APIs"], answer: 1, explanation: "React is a JavaScript library for building user interfaces." },
      { q: "Which CSS property controls responsiveness using a 12-column system?", options: ["Grid / Flexbox", "float", "position: absolute", "display: inline"], answer: 0, explanation: "CSS Grid and Flexbox are modern tools for responsive layouts." }
    ],
    challenge: [
      { q: "What command is used to initialise a new Node.js project?", options: ["npm init", "node start", "npm create", "node init"], answer: 0, explanation: "npm init creates a package.json file." },
      { q: "Which status code represents 'Not Found'?", options: ["200", "404", "500", "403"], answer: 1, explanation: "404 is the standard HTTP status code for Not Found." },
      { q: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Applied Protocol Interface", "Automated Process Interaction"], answer: 0, explanation: "API stands for Application Programming Interface." },
      { q: "Which hook in React is used to manage state?", options: ["useEffect", "useState", "useContext", "useReducer"], answer: 1, explanation: "useState lets you add React state to function components." },
      { q: "What does CORS stand for?", options: ["Cross-Origin Resource Sharing", "Central Object Reference System", "Control Origin Request Security", "Cross-Object Routing Service"], answer: 0, explanation: "CORS is a mechanism that allows restricted resources on a web page to be requested from another domain." },
      { q: "In MongoDB, a collection is equivalent to what in SQL?", options: ["Row", "Column", "Table", "Database"], answer: 2, explanation: "A collection in MongoDB is analogous to a table in relational databases." },
      { q: "Which tool is commonly used to bundle JavaScript files?", options: ["Nodemon", "Express", "Webpack", "Mongoose"], answer: 2, explanation: "Webpack is a static module bundler for modern JavaScript applications." },
      { q: "What does JWT stand for?", options: ["Java Web Toolkit", "JSON Web Token", "JavaScript Worker Thread", "Just Web Transfer"], answer: 1, explanation: "JWT (JSON Web Token) is used for securely transmitting information as a JSON object." },
      { q: "Which of these is NOT a valid HTTP method?", options: ["PATCH", "FETCH", "OPTIONS", "HEAD"], answer: 1, explanation: "FETCH is an API/function in browsers, not an HTTP method (like GET or POST)." },
      { q: "What is the purpose of a package.json file?", options: ["Store HTML templates", "Manage dependencies and scripts", "Define CSS styles", "Configure the database"], answer: 1, explanation: "It holds various metadata relevant to the project, including dependencies." },
      { q: "In React, what is a 'prop'?", options: ["A function that returns HTML", "Data passed from parent to child component", "An internal state variable", "A styling object"], answer: 1, explanation: "Props (properties) are arguments passed into React components." },
      { q: "Which SQL command is used to retrieve data?", options: ["GET", "EXTRACT", "SELECT", "PULL"], answer: 2, explanation: "The SELECT statement is used to select data from a database." },
      { q: "What is the virtual DOM in React?", options: ["A direct copy of the database", "A lightweight copy of the actual DOM", "A browser extension", "A styling technique"], answer: 1, explanation: "React uses a virtual DOM to efficiently update the browser's DOM." },
      { q: "Which environment variable is commonly used to set the port in Node.js?", options: ["SERVER_PORT", "PORT", "NODE_PORT", "APP_PORT"], answer: 1, explanation: "process.env.PORT is the standard convention." },
      { q: "What does CRUD stand for?", options: ["Create, Read, Update, Delete", "Copy, Run, Undo, Deploy", "Compile, Run, Update, Debug", "Create, Route, Upload, Download"], answer: 0, explanation: "CRUD represents the four basic operations of persistent storage." }
    ]
  },
  4: {
    title: "Level 4: Resume & GitHub", shortTitle: "Resume & GitHub", icon: "📄", totalXP: 400, status: "locked", currentXP: 0, maxXP: 400, progress: 0,
    desc: "Polish your online presence — make recruiters notice you.",
    theory: {
      sections: [
        {
          title: "📄 Crafting an ATS-Friendly Resume",
          content: "Recruiters and <strong style='color:var(--yellow-l)'>Applicant Tracking Systems (ATS)</strong> scan resumes in seconds. Keep it to one page. Use the <strong style='color:var(--yellow-l)'>XYZ formula</strong>: 'Accomplished [X] as measured by [Y], by doing [Z]'. Start bullet points with strong action verbs (Developed, Architected, Optimized) and quantify your impact.",
          code: `❌ Bad:
- Worked on a web app for students.
- Fixed bugs and improved the database.

✅ Good:
- Architected a React-based student dashboard, reducing page load time by 40% through lazy loading and component optimization.
- Designed a normalized PostgreSQL database schema, improving query performance by 25% for 10,000+ daily active users.
- Led a team of 3 developers using Agile methodologies and Git version control.`
        },
        {
          title: "🐙 GitHub Profile & Portfolio",
          content: "Your GitHub is your proof of work. Create a <strong style='color:var(--yellow-l)'>Profile README</strong> by creating a repository with the exact same name as your username. Pin your top 4-6 projects. Ensure every pinned project has a detailed README explaining what it does, the tech stack, and how to run it.",
          code: `<!-- Example Profile README.md -->
# Hi there, I'm Aarav! 👋

I'm a Full-Stack Developer passionate about building scalable web apps.

### 🛠️ Tech Stack
- **Frontend:** React, Next.js, TailwindCSS
- **Backend:** Node.js, Express, Python
- **Database:** MongoDB, PostgreSQL

### 🚀 Featured Projects
- **[Skillup Platform](link):** Gamified learning platform built with React & Node.
- **[E-Commerce API](link):** RESTful API with Stripe payment integration.`
        },
        {
          title: "🌐 LinkedIn Optimization",
          content: "LinkedIn is where recruiters find you. Have a professional headshot, a compelling headline (e.g., 'CS Student @ XYZ | Full Stack Developer'), and a detailed 'About' section. Post regularly about your coding journey, projects you finish, and lessons you learn to build a personal brand.",
          code: `Example LinkedIn Headline:
"Final Year CS Student | Building Scalable Web Apps with React & Node.js | Seeking 2025 SDE Roles"

Example Post:
"Just finished building a full-stack E-commerce app! 🚀
I learned so much about integrating Stripe for payments and optimizing Redux state.
Check out the live demo here: [Link]
#webdevelopment #reactjs #nodejs"`
        }
      ],
      resources: [
        { icon: "🎥", title: "Resume Tips for Tech Jobs", type: "Video Tutorial", url: "https://youtube.com" },
        { icon: "📖", title: "GitHub Profile README Guide", type: "Documentation", url: "https://docs.github.com" }
      ]
    },
    quiz: [
      { q: "How long should a student/new grad resume ideally be?", options: ["1 page", "2 pages", "3 pages", "As long as needed"], answer: 0, explanation: "Recruiters spend ~6 seconds per resume. Keep it concise." },
      { q: "What file name is used for your personal GitHub profile page?", options: ["profile.md", "README.md in a repo with your username", "index.html", "about.md"], answer: 1, explanation: "A repo matching your username with a README.md creates a profile page." },
      { q: "Which format is best for submitting resumes online?", options: ["Word Document (.docx)", "PDF (.pdf)", "Plain Text (.txt)", "Image (.png)"], answer: 1, explanation: "PDF ensures your formatting remains exactly as you intended." },
      { q: "What should you prioritize in the 'Experience' section?", options: ["List of duties", "Impact and results with metrics", "Salary expectations", "Reasons for leaving"], answer: 1, explanation: "Metrics (e.g., 'increased speed by X%') show tangible value." },
      { q: "What is a 'pinned' repository on GitHub?", options: ["A private repo", "A deleted repo", "A highlighted repo shown at the top of your profile", "A forked repo"], answer: 2, explanation: "Pinning repos showcases your best work to visitors." }
    ],
    challenge: [
      { q: "What is the recommended structure for bullet points?", options: ["Task -> Duty", "Action Verb -> Context -> Result", "Problem -> Excuse", "Chronological list of everything done"], answer: 1, explanation: "Using the XYZ formula (Accomplished X as measured by Y, by doing Z) is highly effective." },
      { q: "Should you include a photo on a standard US/UK/Tech resume?", options: ["Yes, always", "Only if you are good-looking", "No, it is generally discouraged to prevent bias", "Yes, in the top right corner"], answer: 2, explanation: "In many regions, photos are discouraged to maintain objective hiring." },
      { q: "Which tool is standard for version control in the software industry?", options: ["Dropbox", "Google Drive", "Git", "FTP"], answer: 2, explanation: "Git is the industry standard for version control." },
      { q: "What is a 'commit message'?", options: ["An email to your boss", "A brief description of changes saved to the repository", "An error log", "A comment in the code"], answer: 1, explanation: "Commit messages explain what changes were made and why." },
      { q: "How can you make a repository stand out?", options: ["Leave it empty", "Write a clear and comprehensive README.md", "Make it private", "Only upload the final compiled binary"], answer: 1, explanation: "A good README explains what the project does, how to install it, and how to use it." },
      { q: "What is an ATS in the context of hiring?", options: ["Automated Tracking System", "Applicant Tracking System", "Advanced Tech Screening", "Application Testing Suite"], answer: 1, explanation: "ATS parses resumes for keywords before a human sees them." },
      { q: "Why should you avoid complex multi-column resume layouts?", options: ["They are ugly", "They are too colourful", "ATS parsers often fail to read them correctly", "They take up too much ink"], answer: 2, explanation: "Many ATS systems read left-to-right, top-to-bottom, messing up columns." },
      { q: "Which of the following is NOT typically included in a tech resume?", options: ["Skills", "Projects", "Education", "Marital Status"], answer: 3, explanation: "Personal details like marital status or age are irrelevant to your technical ability." },
      { q: "What does 'forking' a repository do?", options: ["Deletes it", "Creates a personal copy of someone else's project", "Merges it with another project", "Locks it from edits"], answer: 1, explanation: "Forking allows you to freely experiment with changes without affecting the original project." },
      { q: "What is a Pull Request (PR)?", options: ["Downloading code", "Requesting a file from the server", "Proposing your changes be merged into the main project", "Pulling a colleague away for a meeting"], answer: 2, explanation: "A PR is how you contribute code to a repository." },
      { q: "Which section is crucial for a student with no professional experience?", options: ["Summary", "Projects and Extracurriculars", "References", "Hobbies"], answer: 1, explanation: "Personal/academic projects demonstrate practical coding skills." },
      { q: "What is 'Open Source'?", options: ["Software that is broken", "Software whose source code is publicly available and modifiable", "A private company repository", "Software that costs money"], answer: 1, explanation: "Open source software encourages collaborative improvement." },
      { q: "Should you tailor your resume for different jobs?", options: ["No, one size fits all", "Yes, highlight skills relevant to the specific job description", "Only for management roles", "Only if the company asks"], answer: 1, explanation: "Tailoring increases your chances of passing the ATS and catching the recruiter's eye." },
      { q: "What is a GitHub 'Streak'?", options: ["Consecutive days of making contributions", "Deleting files quickly", "Winning coding competitions", "Ignoring reviews"], answer: 0, explanation: "A streak shows consistent daily coding activity." },
      { q: "Where should your contact info (email, GitHub, LinkedIn) be located on a resume?", options: ["At the very bottom", "Hidden on the second page", "At the very top", "In the middle"], answer: 2, explanation: "Recruiters need to easily find how to contact you." }
    ]
  },
  5: {
    title: "Level 5: Interview Prep", shortTitle: "Interview Prep", icon: "🎯", totalXP: 600, status: "locked", currentXP: 0, maxXP: 600, progress: 0,
    desc: "100 LeetCode + mock interviews + aptitude + HR preparation.",
    theory: {
      sections: [
        {
          title: "🗣️ Behavioral Interviews (STAR Method)",
          content: "Companies test culture fit using behavioral questions (e.g., 'Tell me about a time you failed'). Always use the <strong style='color:var(--yellow-l)'>STAR method</strong>: <br>• <strong>Situation:</strong> Set the context.<br>• <strong>Task:</strong> What was the challenge?<br>• <strong>Action:</strong> What specific steps did YOU take?<br>• <strong>Result:</strong> What was the quantifiable outcome?",
          code: `Question: "Tell me about a time you resolved a conflict."

[Situation]: In my final year project, our team disagreed on whether to use SQL or NoSQL.
[Task]: We needed a database decision by Friday to start development.
[Action]: I organized a quick meeting, researched both options, and built a small proof-of-concept for the NoSQL approach to show its flexibility with our unstructured data.
[Result]: The team agreed to NoSQL based on the POC, and we finished the backend 2 days ahead of schedule.`
        },
        {
          title: "💻 Technical & Whiteboard Coding",
          content: "In a coding interview, communication is more important than the perfect solution. Never code in silence. Follow the <strong style='color:var(--yellow-l)'>REACT</strong> framework: <strong>R</strong>epeat the question, <strong>E</strong>xample edge cases, <strong>A</strong>pproach (discuss brute force then optimized), <strong>C</strong>ode (write cleanly), <strong>T</strong>est (dry run with examples).",
          code: `

function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

        },
        {
          title: "🧠 System Design Basics",
          content: "Even junior roles often test basic system design. You need to understand how systems scale. Key concepts include <strong style='color:var(--yellow-l)'>Vertical vs Horizontal Scaling</strong>, <strong style='color:var(--yellow-l)'>Load Balancers</strong> (distributing traffic), <strong style='color:var(--yellow-l)'>Caching</strong> (Redis/Memcached for fast reads), and <strong style='color:var(--yellow-l)'>Microservices</strong>.",
          code: `Basic Scalable Architecture:

[Client (Browser/App)]
       │ (HTTPS)
       ▼
[Load Balancer (Nginx/AWS ELB)]
       │
  ┌────┼────┐ (Distributes Traffic)
  ▼    ▼    ▼
[Web Server 1] [Web Server 2] [Web Server 3]
  │    │    │
  └────┼────┘
       │
   ┌───┴───┐
   ▼       ▼
[Cache]  [Database (Primary/Replica)]
(Redis)  (PostgreSQL / MongoDB)`
        }
      ],
      resources: [
        { icon: "🎥", title: "Mock Interview Example", type: "Video Tutorial", url: "https://youtube.com" }
      ]
    },
    quiz: [
      { q: "What does STAR stand for in behavioral interviews?", options: ["Situation, Task, Action, Result", "Start, Think, Act, Review", "System, Tech, Architecture, Requirement", "Standardization, Testing, Analysis, Reporting"], answer: 0, explanation: "STAR is a framework for structuring your answers." },
      { q: "When given a coding problem, what should be your first step?", options: ["Start coding immediately", "Ask clarifying questions and outline edge cases", "Say 'I don't know'", "Write a brute-force solution without speaking"], answer: 1, explanation: "Communication is key. Clarify constraints before solving." },
      { q: "What is the purpose of a Load Balancer?", options: ["To store data", "To compile code faster", "To distribute network traffic across multiple servers", "To balance binary trees"], answer: 2, explanation: "Load balancers ensure no single server becomes overwhelmed." },
      { q: "Why is caching used in System Design?", options: ["To delete old data", "To speed up data retrieval by storing frequently accessed data in memory", "To secure passwords", "To balance traffic"], answer: 1, explanation: "Caches like Redis provide sub-millisecond data access." },
      { q: "What should you do if you get stuck during an interview?", options: ["Stay completely silent", "Give up", "Communicate your thought process and ask for a hint", "Start guessing randomly"], answer: 2, explanation: "Interviewers want to see how you handle difficulty and collaborate." }
    ],
    challenge: [
      { q: "What is 'Horizontal Scaling'?", options: ["Upgrading the RAM of a server", "Adding more servers to a pool", "Scaling an image", "Optimizing an algorithm"], answer: 1, explanation: "Horizontal scaling means adding more machines into your pool of resources." },
      { q: "What is 'Vertical Scaling'?", options: ["Adding more servers", "Upgrading the CPU/RAM of an existing server", "Stacking databases physically", "Creating deeper folder structures"], answer: 1, explanation: "Vertical scaling (scaling up) means adding more power to an existing machine." },
      { q: "Which tool is commonly used as an in-memory cache?", options: ["PostgreSQL", "Redis", "Nginx", "Docker"], answer: 1, explanation: "Redis is a popular in-memory data structure store used as a cache." },
      { q: "What does 'ACID' stand for in databases?", options: ["Atomicity, Consistency, Isolation, Durability", "Active, Clean, Indexed, Distributed", "Automated, Checked, Integrated, Deployed", "All Code Is Done"], answer: 0, explanation: "ACID properties guarantee database transactions are processed reliably." },
      { q: "In a behavioral interview, what does 'Action' refer to in STAR?", options: ["The final outcome", "The context of the problem", "The specific steps YOU took to solve the problem", "The task assigned to the team"], answer: 2, explanation: "Action focuses on your specific contributions and decision-making." },
      { q: "What is a 'brute force' solution?", options: ["The most optimized solution", "A solution that relies on physical hardware", "A naive solution that checks all possibilities", "A solution using AI"], answer: 2, explanation: "Brute force is often the first step before optimizing." },
      { q: "Why is 'Big O' notation important in interviews?", options: ["It proves you took math classes", "It evaluates the time and space efficiency of your algorithm", "It is used to name variables", "It encrypts data"], answer: 1, explanation: "Big O defines how an algorithm scales as input size grows." },
      { q: "What is a 'mock interview'?", options: ["An interview that insults you", "A real interview for a fake job", "A practice interview simulating real conditions", "A group discussion"], answer: 2, explanation: "Mock interviews help you practice under pressure." },
      { q: "Which data structure is typically used for breadth-first search?", options: ["Stack", "Queue", "Heap", "Tree"], answer: 1, explanation: "A queue ensures nodes are processed in the order they were discovered." },
      { q: "What is the typical time limit for a technical whiteboard question?", options: ["5 minutes", "15-20 minutes", "30-45 minutes", "2 hours"], answer: 2, explanation: "Most technical rounds give you about 45 minutes to solve a problem and discuss it." },
      { q: "What is a microservices architecture?", options: ["A monolithic application", "Small, independent services communicating over a network", "A tiny server", "Using micro-controllers"], answer: 1, explanation: "Microservices break down an app into loosely coupled services." },
      { q: "What does 'CAP theorem' stand for?", options: ["Consistency, Availability, Partition tolerance", "Compute, Analyze, Process", "Cache, API, Protocol", "Code, Algorithm, Performance"], answer: 0, explanation: "CAP theorem states a distributed system can only guarantee 2 of the 3." },
      { q: "If you don't know the answer to a trivia question, what's the best response?", options: ["Make something up", "Admit you don't know, but explain how you would find out", "Change the subject", "End the interview"], answer: 1, explanation: "Honesty and resourcefulness are highly valued traits." },
      { q: "What is the primary benefit of Indexing in a database?", options: ["Saves disk space", "Speeds up data retrieval (SELECT queries)", "Encrypts data automatically", "Prevents duplicate rows"], answer: 1, explanation: "Indexes act like a book's index, making lookups significantly faster." },
      { q: "What is a 'dry run' of your code?", options: ["Running it without electricity", "Manually tracing through the code with an example input", "Running it on a test server", "Deleting comments"], answer: 1, explanation: "A dry run helps catch logical errors before actual execution." }
    ]
  },
  6: {
    title: "Level 6: Job Apply", shortTitle: "Job Apply", icon: "📬", totalXP: 500, status: "locked", currentXP: 0, maxXP: 500, progress: 0,
    desc: "Start applying — internships, campus placements, referrals.",
    theory: {
      sections: [
        {
          title: "📧 Cold Emailing & Direct Outreach",
          content: "Applying via portals is a black hole. <strong style='color:var(--yellow-l)'>Cold emailing</strong> a recruiter or engineering manager directly can boost your response rate. Keep it short (3-4 sentences), personalize it to the company, link your portfolio, and attach your PDF resume.",
          code: `Subject: Software Engineering Intern Application — Aarav Sharma

Hi [Name],

I saw [Company] is expanding its frontend team and I'd love to contribute. I recently built a React/Node.js analytics dashboard that handles 5k+ weekly requests, and I'm very familiar with your tech stack.

I've attached my resume and you can see my work at [Portfolio Link]. Do you have 10 minutes next week to chat about the intern role?

Best,
Aarav`
        },
        {
          title: "🤝 Networking & Asking for Referrals",
          content: "A <strong style='color:var(--yellow-l)'>referral</strong> guarantees a human will look at your resume. Find university alumni working at your target companies on LinkedIn. Don't ask for a job immediately—ask for an 'informational interview' to learn about their experience. If it goes well, ask for a referral.",
          code: `Connection Request Note:
"Hi [Name], I'm a CS student at [University] graduating next year. I love the work your team is doing at [Company]. I'd love to connect and follow your journey!"

Follow-up Message:
"Thanks for connecting! I'm applying for the SDE Intern role at [Company]. Given your experience there, I’d love to hear your thoughts on the engineering culture. Do you have 10 minutes for a quick virtual coffee?"`
        },
        {
          title: "🎯 The Numbers Game & Tracking",
          content: "Applying for your first job is a numbers game. You might need to send 100+ applications. Treat it like a pipeline: use a <strong style='color:var(--yellow-l)'>Spreadsheet or Notion board</strong> to track Company, Role, Date Applied, Referral Status, and Follow-up dates. Always follow up after 1-2 weeks of no response.",
          code: `Tracking Spreadsheet Columns:

| Company  | Role       | Date Applied | Portal Link   | Referral / Contact | Status      | Next Step    |
|----------|------------|--------------|---------------|--------------------|-------------|--------------|
| Google   | SWE Intern | Oct 12, 2024 | careers.g...  | Jane Doe (Alumni)  | Interviewing| Prep System Design |
| Stripe   | API Intern | Oct 14, 2024 | stripe.com... | None               | Applied     | Follow-up Oct 21 |
| StartupX | Frontend   | Oct 15, 2024 | startupx.io   | Emailed CEO        | Rejected    | Ask for feedback |`
        }
      ],
      resources: [
        { icon: "🎥", title: "How to Ask for a Referral", type: "Video Tutorial", url: "https://youtube.com" }
      ]
    },
    quiz: [
      { q: "What is the main benefit of getting a referral?", options: ["Guaranteed job offer", "Higher salary", "Your resume is seen by a human recruiter faster", "No technical interview needed"], answer: 2, explanation: "Referrals often bypass the initial automated screening." },
      { q: "How long should a cold email to a recruiter be?", options: ["3-4 paragraphs detailing your life story", "Short, concise (3-4 sentences), with a clear call to action", "Just an attachment with no text", "A highly technical essay"], answer: 1, explanation: "Recruiters are busy. Get straight to the point." },
      { q: "When reaching out on LinkedIn, you should always:", options: ["Send a blank connection request", "Include a personalized note explaining why you are connecting", "Ask for a job immediately", "Spam all their posts"], answer: 1, explanation: "A personalized note significantly increases acceptance rates." },
      { q: "What is the best way to track job applications?", options: ["Mental notes", "A dedicated spreadsheet (e.g., Notion, Excel) tracking dates and status", "Just checking emails", "Printing them out"], answer: 1, explanation: "A spreadsheet helps you follow up effectively." },
      { q: "What is an ATS?", options: ["Applicant Tracking System", "Automated Testing Suite", "Application Transfer Server", "Advanced Technical Screening"], answer: 0, explanation: "ATS software manages the recruiting process." }
    ],
    challenge: [
      { q: "When is the best time to apply for Summer Internships?", options: ["May of that year", "August/September of the previous year", "January of that year", "During finals week"], answer: 1, explanation: "Tech recruitment for summer usually kicks off very early in the Fall." },
      { q: "What should you include in the subject line of a cold email?", options: ["Hello", "Need a job please", "Specifics (e.g., SE Intern Application - [Your Name] - [University])", "Urgent!"], answer: 2, explanation: "A clear subject line helps the recruiter identify the email's purpose immediately." },
      { q: "If a company rejects you, what is a professional response?", options: ["Argue with them", "Ignore it completely", "Send a brief thank you note for their time and ask to stay connected", "Send an angry email"], answer: 2, explanation: "Building a network is a long-term game; today's rejection might be tomorrow's offer." },
      { q: "What is a 'cover letter'?", options: ["The envelope your resume comes in", "A document expanding on your resume, tailored to the specific role", "A letter of recommendation", "Your graduation certificate"], answer: 1, explanation: "It provides context to your resume and explains why you fit the company culture." },
      { q: "How can you bypass the 'Apply Online' black hole?", options: ["Apply multiple times", "Find the hiring manager on LinkedIn and message them", "Submit a paper resume by mail", "Use a fake name"], answer: 1, explanation: "Direct networking is much more effective than cold applying." },
      { q: "What should you do after an interview?", options: ["Wait passively", "Send a thank-you email within 24 hours", "Call them every day", "Post about the questions online"], answer: 1, explanation: "A polite thank-you email reiterates your interest." },
      { q: "Is it okay to ask for feedback after a rejection?", options: ["Yes, always politely ask if they can share brief feedback", "No, it's illegal", "No, it looks desperate", "Only if you yell at them"], answer: 0, explanation: "While many won't reply due to policy, some will offer valuable insights." },
      { q: "How many applications should you aim for if you're cold-applying without experience?", options: ["1-5", "10-20", "100+", "Exactly 3"], answer: 2, explanation: "Cold applying is a numbers game. Cast a wide net." },
      { q: "What does 'Ghosting' mean in recruiting?", options: ["Working undercover", "When a company stops communicating with you without explanation", "Using invisible ink on a resume", "Deleting your LinkedIn"], answer: 1, explanation: "Unfortunately common, ghosting means they never send a rejection email." },
      { q: "If an application asks for salary expectations, what is a safe strategy?", options: ["Put $1,000,000", "Put $0", "Write 'Negotiable' or provide a researched range", "Leave it blank"], answer: 2, explanation: "Research market rates, but 'Negotiable' keeps doors open." },
      { q: "What is the purpose of an 'informational interview'?", options: ["To secretly beg for a job", "To learn about a person's career path and company culture, building a relationship", "To interview the CEO", "To get free food"], answer: 1, explanation: "It's about learning and networking, not asking for a job directly." },
      { q: "Which platform is primarily used for professional networking?", options: ["Instagram", "TikTok", "LinkedIn", "Snapchat"], answer: 2, explanation: "LinkedIn is the standard professional network." },
      { q: "Should you apply if you don't meet 100% of the requirements?", options: ["No, it's a waste of time", "Yes, apply if you meet at least 50-60% of them", "Only if you know the CEO", "Yes, but lie on your resume"], answer: 1, explanation: "Job descriptions are often 'wish lists'. Apply anyway." },
      { q: "What is an 'elevator pitch'?", options: ["A 30-second summary of who you are and what you do", "A pitch for a new elevator design", "A long 10-minute speech", "A technique used by salespeople"], answer: 0, explanation: "It's a quick, compelling introduction used in networking." },
      { q: "Why should you customize your resume for different job applications?", options: ["To trick the ATS", "To align your skills with the specific keywords and requirements of that job", "To make it look prettier", "Because every company requires a different font"], answer: 1, explanation: "Customization shows you are a specific fit for their exact needs." }
    ]
  },
  7: {
    title: "Level 7: Internship Ready 🚀", shortTitle: "Internship Ready", icon: "🚀", totalXP: 1000, status: "locked", currentXP: 0, maxXP: 1000, progress: 0,
    desc: "You've made it — internship offer in hand. You are a developer!",
    theory: {
      sections: [
        {
          title: "🎉 Evaluating & Accepting Offers",
          content: "When you receive a verbal offer, be enthusiastic but <strong style='color:var(--yellow-l)'>never accept on the spot</strong>. Ask for the written offer and a few days to review the total compensation (Base, Bonus, Equity). If you have other interviews, you can use an offer to speed up other companies' timelines.",
          code: `How to respond to a verbal offer:
"Thank you so much! I am incredibly excited about this opportunity and the team. Could you please send over the written offer details? I'd love to review the complete package before making a final decision."

How to leverage an offer:
"Hi [Recruiter at Company B],
I'm currently interviewing with your team and am very interested in the role. I just received another offer that expires on [Date]. Is there any way we can expedite the remaining interview process?"`
        },
        {
          title: "🤝 Salary Negotiation",
          content: "While internships are rarely negotiated, full-time offers absolutely should be. Companies expect it. Do your market research (levels.fyi, Glassdoor). Negotiate based on your value, competing offers, or market rates. Be polite, collaborative, and never give ultimatums.",
          code: `Negotiation Email Template:

"Hi [Recruiter],
I'm thrilled about the offer! I've really enjoyed meeting the team.

Based on my research for similar roles in [City], and considering my prior internship experience with [Skill], I was hoping we could explore a base salary closer to $X.

I am very excited to join and if we can make this adjustment, I am ready to sign today."`
        },
        {
          title: "💼 Thriving in Your First Week",
          content: "Your goal in week one is to learn, not to ship massive features. Set up your local environment, schedule 1-on-1s with your team members, and <strong style='color:var(--yellow-l)'>ask questions</strong>. Don't stay blocked for hours—try for 30-60 minutes, document what you tried, and ask a senior engineer.",
          code: `Week 1 Checklist:
[x] Get laptop, accounts, and access rights set up.
[x] Clone the main repository and get it running locally.
[x] Read the architecture documentation and READMEs.
[x] Have a 1-on-1 with your manager to set expectations.
[x] Introduce yourself in the team Slack/Teams channel.

How to ask a good question:
"Hi [Senior], I'm trying to start the backend locally but I'm getting a 'DB Connection Refused' error. I've already checked my .env file and ensured Docker is running. Do you have 5 minutes to help me debug?"`
        }
      ],
      resources: [
        { icon: "🎥", title: "How to Negotiate Your Salary", type: "Video Tutorial", url: "https://youtube.com" }
      ]
    },
    quiz: [
      { q: "What should you do when you receive a job offer over the phone?", options: ["Accept immediately", "Express excitement and ask for the written offer and some time to review", "Hang up", "Ask for double the money on the spot"], answer: 1, explanation: "Always ask for the official written offer before committing." },
      { q: "Is it acceptable to ask for a few days to review an offer?", options: ["Yes, it is standard professional practice", "No, they will revoke it", "Only if you pretend to be sick", "Yes, but ask for a month"], answer: 0, explanation: "Most companies expect you to take 2-5 days to review." },
      { q: "What is 'onboarding'?", options: ["A boat ride", "The process of integrating a new employee into the company", "Being fired", "A coding test"], answer: 1, explanation: "Onboarding includes setting up laptops, accounts, and learning company culture." },
      { q: "If you get stuck on a bug during your internship, what's the best approach?", options: ["Hide it", "Ask for help immediately without trying", "Timebox it (e.g., try for 1 hour), then document what you tried and ask a senior", "Quit the internship"], answer: 2, explanation: "Show initiative, but don't stay blocked for days." },
      { q: "What is an 'exploding offer'?", options: ["An offer that pays extremely well", "An offer with an unreasonably short deadline (e.g., 24 hours)", "A scam", "A promotion"], answer: 1, explanation: "Exploding offers pressure candidates to accept quickly." }
    ],
    challenge: [
      { q: "What is a 'NDA'?", options: ["New Developer Agreement", "Non-Disclosure Agreement", "National Data Association", "Network Development API"], answer: 1, explanation: "An NDA legally binds you to keep company secrets confidential." },
      { q: "What does 'equity' mean in a job offer?", options: ["Equal treatment", "Stock options or shares in the company", "A type of bonus", "Health insurance"], answer: 1, explanation: "Equity means you own a small piece of the company." },
      { q: "What is 'imposter syndrome'?", options: ["A virus", "Feeling like a fraud despite your achievements", "A design pattern", "A type of hacker"], answer: 1, explanation: "Very common in tech; it's the feeling you don't belong despite being qualified." },
      { q: "During your first week, what is the most important thing to do?", options: ["Rewrite the entire codebase", "Ask questions and take detailed notes", "Take a vacation", "Argue with the senior engineer"], answer: 1, explanation: "Your goal is to learn the domain and codebase." },
      { q: "What is a '1-on-1'?", options: ["A coding battle", "A regular private meeting between you and your manager", "A basketball game", "A performance review where you get fired"], answer: 1, explanation: "1-on-1s are for discussing career growth, blockers, and feedback." },
      { q: "If you have competing offers, what should you do?", options: ["Lie and say you have 10 offers", "Politely inform the companies to leverage a better package or faster decision", "Ignore both", "Accept both and work two jobs"], answer: 1, explanation: "Transparency can speed up timelines and improve your offer." },
      { q: "What is a 'code review'?", options: ["A magazine for programmers", "Peers reviewing your code before it is merged into the main branch", "A test given during interviews", "Deleting bad code"], answer: 1, explanation: "Code reviews maintain code quality and share knowledge." },
      { q: "What does LGTM mean in a PR comment?", options: ["Let's Go To Meeting", "Looks Good To Me", "Leave Github To Me", "Little Giant Tree Monkey"], answer: 1, explanation: "LGTM signifies approval of the pull request." },
      { q: "What is a 'stand-up' meeting?", options: ["A comedy show", "A short daily meeting to share what you did yesterday, plan today, and list blockers", "A meeting where there are no chairs", "An hour-long presentation"], answer: 1, explanation: "Stand-ups keep agile teams aligned." },
      { q: "How should you respond to constructive criticism in a code review?", options: ["Take it personally and argue", "Ignore the comments", "Thank the reviewer, learn from it, and update the code", "Complain to your manager"], answer: 2, explanation: "Reviews are about improving the code, not attacking the coder." },
      { q: "What is 'Agile' methodology?", options: ["Writing code very fast", "An iterative approach to software development emphasizing flexibility", "A specific programming language", "A workout routine"], answer: 1, explanation: "Agile breaks work into small, manageable sprints." },
      { q: "What is the purpose of 'version control' (Git) in a team setting?", options: ["To spy on employees", "To allow multiple developers to work on the same codebase without overwriting each other's work", "To backup files to a USB drive", "To compile code"], answer: 1, explanation: "Git merges contributions and tracks history." },
      { q: "When is it appropriate to merge your code into the 'main' or 'master' branch?", options: ["Whenever you want", "On Friday at 5 PM", "Only after passing tests and receiving approval via code review", "Before writing tests"], answer: 2, explanation: "The main branch must remain stable and deployable." },
      { q: "What does it mean to be a 'T-shaped' developer?", options: ["You only know one thing perfectly", "You have broad knowledge in many areas and deep expertise in one", "You type with your arms spread", "You are a team leader"], answer: 1, explanation: "T-shaped skills make you versatile yet highly valuable in a specific domain." },
      { q: "Congratulations! What is the final step to officially completing your SKILLUP journey?", options: ["Delete your account", "Celebrate, sign the offer, and keep learning!", "Stop coding forever", "Buy a yacht"], answer: 1, explanation: "Learning never stops in tech. Enjoy the success and prepare for the next challenge!" }
    ]
  }
};

const params = new URLSearchParams(window.location.search);
let currentLevel = parseInt(params.get('level')) || 2;
if (currentLevel < 1 || currentLevel > 7) currentLevel = 2;

const unlockedLevel = parseInt(localStorage.getItem('skillup_unlocked_level')) || 2;
for (let i = 1; i <= 7; i++) {
  if (i < unlockedLevel) {
    LEVEL_DATA[i].status = "done";
  } else if (i === unlockedLevel) {
    LEVEL_DATA[i].status = "active";
  } else {
    LEVEL_DATA[i].status = "locked";
  }
}

const lvl = LEVEL_DATA[currentLevel];

(function renderHeader() {
  document.title = `${lvl.title.replace(/&amp;/g,'&')} — SKILLUP`;
  document.getElementById('bcTitle').textContent   = lvl.shortTitle;
  document.getElementById('levelTitle').textContent = lvl.title.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
  document.getElementById('levelDesc').textContent  = lvl.desc;
  document.getElementById('levelXPBadge').textContent = `⭐ +${lvl.totalXP} XP`;

  const iconEl = document.getElementById('levelIcon');
  iconEl.textContent = lvl.icon;
  iconEl.className = 'level-icon-big ' +
    (lvl.status === 'done' ? 'lv-done' : lvl.status === 'active' ? 'lv-active' : 'lv-locked');

  const tagEl = document.getElementById('levelTag');
  if      (lvl.status === 'done')   { tagEl.className='tag tag-green';  tagEl.textContent='✅ Completed'; }
  else if (lvl.status === 'active') { tagEl.className='tag tag-cyan';   tagEl.textContent='🔄 In Progress'; }
  else                              { tagEl.className='tag tag-purple'; tagEl.textContent='🔒 Locked'; }

  document.getElementById('levelProgressLabel').textContent = `Progress: ${lvl.progress}%`;
  document.getElementById('lvlBar').dataset.progress = lvl.progress;
  document.getElementById('levelXPCount').textContent = `${lvl.currentXP} / ${lvl.maxXP} XP`;
})();

(function renderTheory() {
  const container  = document.getElementById('theoryContent');
  const resSection = document.getElementById('resourcesSection');

  if (lvl.status === 'locked') {
    container.innerHTML = `
      <div style="text-align:center;padding:64px 20px;background:var(--glass);border:1px solid var(--border);border-radius:14px;margin-bottom:24px;">
        <div style="font-size:4rem;margin-bottom:16px;">🔒</div>
        <h2 style="margin-bottom:12px;">Level Locked</h2>
        <p class="muted" style="max-width:400px;margin:0 auto 24px;">Complete Level ${currentLevel - 1} to unlock this content.</p>
        <a href="roadmap.html" class="btn btn-primary">View Your Roadmap 🗺️</a>
      </div>`;
    resSection.style.display = 'none';
    return;
  }

  if (!lvl.theory.sections.length) {
    container.innerHTML = `<div class="theory-block"><p class="muted">📖 Theory content for this level is being prepared. Check back soon!</p></div>`;
    resSection.style.display = 'none';
    return;
  }

  container.innerHTML = lvl.theory.sections.map(s => `
    <div class="theory-block">
      <h3>${s.title}</h3>
      <p>${s.content}</p>
      <div class="code-block">${escHtml(s.code)}</div>
    </div>`).join('');

  document.getElementById('resourcesList').innerHTML = lvl.theory.resources.map(r => `
    <a href="${r.url}" target="_blank" rel="noopener" class="resource-link">
      <span style="font-size:1.5rem;flex-shrink:0;">${r.icon}</span>
      <div style="flex:1;">
        <div style="font-weight:600;font-size:0.9rem;">${r.title}</div>
        <div class="r-type">${r.type}</div>
      </div>
      <span style="color:var(--text3);font-size:1.1rem;">→</span>
    </a>`).join('');
})();

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function isTheoryCompleted() {
  return localStorage.getItem('skillup_theory_done_' + currentLevel) === 'true';
}

function updateTabUI() {
  const qBtn = document.getElementById('tabQuiz');
  const cBtn = document.getElementById('tabChallenge');
  if (!isTheoryCompleted() && lvl.status !== 'locked') {
    if(qBtn) { qBtn.style.opacity = '0.6'; qBtn.innerHTML = '🔒 Quiz'; }
    if(cBtn) { cBtn.style.opacity = '0.6'; cBtn.innerHTML = '🔒 Challenge'; }
  } else {
    if(qBtn) { qBtn.style.opacity = '1'; qBtn.innerHTML = '🧠 Quiz'; }
    if(cBtn) { cBtn.style.opacity = '1'; cBtn.innerHTML = '💻 Challenge'; }
  }
}
window.addEventListener('DOMContentLoaded', updateTabUI);

function switchLvlTab(tab, btn) {
  if ((tab === 'quiz' || tab === 'challenge') && !isTheoryCompleted() && lvl.status !== 'locked') {
    showToast('Please complete the Theory section first!', 'error', '🔒');
    return;
  }
  ['theory','quiz','challenge'].forEach(t => {
    document.getElementById('panel' + t.charAt(0).toUpperCase() + t.slice(1))?.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel' + tab.charAt(0).toUpperCase() + tab.slice(1))?.classList.add('active');
  if (btn) btn.classList.add('active');
}

function markTheoryComplete() {
  localStorage.setItem('skillup_theory_done_' + currentLevel, 'true');
  showToast('Theory completed! Quiz & Challenge unlocked.', 'success', '🔓');
  updateTabUI();

  const completeBtn = document.getElementById('btnCompleteTheory');
  if (completeBtn) completeBtn.style.display = 'none';

  switchLvlTab('quiz', document.getElementById('tabQuiz'));
}

const origRenderTheory = window.renderTheory;
window.renderTheory = function() {
  if (origRenderTheory) origRenderTheory();

};
setTimeout(() => {
  const container = document.getElementById('panelTheory');
  if (container && lvl.status !== 'locked' && !isTheoryCompleted()) {
    const btnHtml = `<div style="text-align:center;margin-top:40px;"><button id="btnCompleteTheory" class="btn btn-primary" style="padding:16px 40px;font-size:1.05rem;" onclick="markTheoryComplete()">Mark Theory as Complete & Unlock Quiz 🔓</button></div>`;
    container.insertAdjacentHTML('beforeend', btnHtml);
  }
}, 100);

let qState = { qs:[], ans:[], cur:0, timer:null, timeLeft:600, running:false };

document.getElementById('quizQCount').textContent   = lvl.quiz.length || 5;
document.getElementById('quizXPReward').textContent = `+${Math.round(lvl.totalXP * 0.2)} XP`;

function startQuiz() {
  if (!lvl.quiz.length) { showToast('Quiz for this level is coming soon!','info','📖'); return; }
  if (lvl.status === 'locked') { showToast('Unlock this level first!','error','🔒'); return; }

  qState = { qs:[...lvl.quiz], ans:new Array(lvl.quiz.length).fill(null), cur:0, timeLeft:600, running:true, timer:null };

  document.getElementById('quizIntro').style.display  = 'none';
  document.getElementById('quizArea').style.display   = 'block';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('qTotal').textContent = qState.qs.length;

  renderDots();
  renderQuestion();
  startTimer();
}

function renderDots() {
  document.getElementById('progressDots').innerHTML = qState.qs.map((_,i) => {
    let cls = 'q-dot';
    if      (i === qState.cur)           cls += ' current';
    else if (qState.ans[i] !== null)     cls += ' answered';
    return `<div class="${cls}"></div>`;
  }).join('');
}

function renderQuestion() {
  const q   = qState.qs[qState.cur];
  const ans = qState.ans[qState.cur];
  document.getElementById('qCurrent').textContent = qState.cur + 1;
  const letters = ['A','B','C','D'];

  document.getElementById('questionDisplay').innerHTML = `
    <div class="q-card">
      <div class="q-num">Question ${qState.cur + 1} of ${qState.qs.length}</div>
      <div class="q-text">${q.q}</div>
      <div class="options">
        ${q.options.map((opt, i) => {
          let cls = 'opt';
          if (ans !== null) {
            cls += ' answered';
            if (i === q.answer)              cls += ' correct';
            else if (i === ans && ans !== q.answer) cls += ' wrong';
          }
          return `<button class="${cls}" onclick="selectAnswer(${i})">
            <span class="opt-letter">${letters[i]}</span>${opt}</button>`;
        }).join('')}
      </div>
      <div class="expl-box ${ans !== null ? 'show' : ''}">
        💡&nbsp;<span>${q.explanation}</span>
      </div>
      <div class="quiz-nav">
        ${qState.cur > 0 ? `<button class="btn btn-secondary btn-sm" onclick="prevQ()">← Prev</button>` : ''}
        ${qState.cur < qState.qs.length - 1
          ? `<button class="btn btn-primary btn-sm" onclick="nextQ()">Next →</button>`
          : `<button class="btn btn-primary btn-sm" style="background:var(--green);border-color:var(--green);" onclick="finishQuiz()">Submit Quiz ✓</button>`
        }
      </div>
    </div>`;
  renderDots();
}

function selectAnswer(idx) {
  if (qState.ans[qState.cur] !== null) return;
  qState.ans[qState.cur] = idx;
  renderQuestion();
  const correct = idx === qState.qs[qState.cur].answer;
  showToast(correct ? 'Correct! 🎉' : 'Not quite — read the explanation 📖', correct ? 'success' : 'error', correct ? '✅' : '❌');
}

function nextQ() { if (qState.cur < qState.qs.length - 1) { qState.cur++; renderQuestion(); } }
function prevQ() { if (qState.cur > 0) { qState.cur--; renderQuestion(); } }

function finishQuiz() {
  clearInterval(qState.timer);
  const correct = qState.ans.filter((a, i) => a === qState.qs[i].answer).length;
  const total   = qState.qs.length;
  const pct     = Math.round((correct / total) * 100);
  const xp      = Math.round(lvl.totalXP * 0.2 * (correct / total));

  document.getElementById('quizArea').style.display   = 'none';
  document.getElementById('quizResult').style.display = 'block';

  const circle = document.getElementById('scoreCircle');
  circle.className = 'score-circle ' + (pct >= 80 ? 'great' : pct >= 60 ? 'good' : 'poor');
  document.getElementById('scorePct').textContent   = pct + '%';
  document.getElementById('scoreRatio').textContent = `${correct}/${total} correct`;

  const msgs = {
    perfect:  ['🏆 Perfect Score!',    'Flawless! You absolute legend! 🔥'],
    great:    ['🎉 Great Work!',        'Excellent understanding. Youre ready for the challenge!'],
    good:     ['👍 Solid Effort!',      'Good foundation. Review the explanations and try again!'],
    poor:     ['📖 Keep Learning!',     'Head back to Theory, review the concepts, and retry!']
  };
  const [msg, sub] = pct === 100 ? msgs.perfect : pct >= 80 ? msgs.great : pct >= 60 ? msgs.good : msgs.poor;
  document.getElementById('scoreMsg').textContent    = msg;
  document.getElementById('scoreSubMsg').textContent = sub;
  document.getElementById('xpEarned').innerHTML = `<div class="xp-badge" style="font-size:1.05rem;padding:10px 22px;justify-content:center;">⭐ +${xp} XP Earned!</div>`;

  const scores = JSON.parse(localStorage.getItem('skillup_scores') || '[]');
  scores.push({ level: currentLevel, score: pct, correct, total, xp, date: new Date().toISOString() });
  localStorage.setItem('skillup_scores', JSON.stringify(scores));

  const wrong = qState.qs.map((q,i) => ({q, i, uAns: qState.ans[i], ok: qState.ans[i] === q.answer })).filter(x => !x.ok);
  if (wrong.length) {
    document.getElementById('reviewSection').innerHTML = `
      <div class="section-title"><div class="dot"></div>Review — Wrong Answers</div>
      ${wrong.map(({q, uAns}) => `
        <div style="background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:16px 18px;margin-bottom:12px;">
          <div style="font-weight:600;font-size:0.92rem;margin-bottom:10px;">${q.q}</div>
          <div style="font-size:0.85rem;">❌ Your answer: <span style="color:#ef4444;">${uAns !== null ? q.options[uAns] : 'Not answered'}</span></div>
          <div style="font-size:0.85rem;">✅ Correct:     <span style="color:var(--green);">${q.options[q.answer]}</span></div>
          <div style="font-size:0.83rem;color:var(--text2);margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.06);">💡 ${q.explanation}</div>
        </div>`).join('')}`;
  }

  if (pct >= 80) { launchConfetti(); showToast(`Quiz done! +${xp} XP earned 🎉`, 'success', '⭐'); }
  else showToast(`Quiz complete — score: ${pct}%. Review & retry!`, 'info', '📊');
}

function resetQuiz() {
  clearInterval(qState.timer);
  document.getElementById('quizIntro').style.display  = 'block';
  document.getElementById('quizArea').style.display   = 'none';
  document.getElementById('quizResult').style.display = 'none';
}

function startTimer() {
  qState.timeLeft = 600;
  clearInterval(qState.timer);
  qState.timer = setInterval(() => {
    qState.timeLeft--;
    const m = String(Math.floor(qState.timeLeft / 60)).padStart(2,'0');
    const s = String(qState.timeLeft % 60).padStart(2,'0');
    document.getElementById('timerDisplay').textContent = `${m}:${s}`;
    if (qState.timeLeft <= 60) document.getElementById('timerBox').classList.add('warning');
    if (qState.timeLeft <= 0) { clearInterval(qState.timer); finishQuiz(); }
  }, 1000);
}

let cState = { qs:[], ans:[], cur:0, timer:null, timeLeft:1800, running:false };

document.getElementById('chalQCount').textContent = lvl.challenge?.length || 15;
document.getElementById('chalXPReward').textContent = `+${Math.round(lvl.totalXP * 0.3)} XP`;

function startChallenge() {
  if (!lvl.challenge || !lvl.challenge.length) { showToast('Challenge for this level is coming soon!','info','🚧'); return; }
  if (lvl.status === 'locked') { showToast('Unlock this level first!','error','🔒'); return; }

  cState = { qs:[...lvl.challenge], ans:new Array(lvl.challenge.length).fill(null), cur:0, timeLeft:1800, running:true, timer:null };

  document.getElementById('challengeIntro').style.display  = 'none';
  document.getElementById('challengeArea').style.display   = 'block';
  document.getElementById('challengeResult').style.display = 'none';
  document.getElementById('cTotal').textContent = cState.qs.length;

  renderCDots();
  renderCQuestion();
  startCTimer();
}

function renderCDots() {
  document.getElementById('cProgressDots').innerHTML = cState.qs.map((_,i) => {
    let cls = 'q-dot';
    if      (i === cState.cur)           cls += ' current';
    else if (cState.ans[i] !== null)     cls += ' answered';
    return `<div class="${cls}"></div>`;
  }).join('');
}

function renderCQuestion() {
  const q   = cState.qs[cState.cur];
  const ans = cState.ans[cState.cur];
  document.getElementById('cCurrent').textContent = cState.cur + 1;
  const letters = ['A','B','C','D'];

  document.getElementById('cQuestionDisplay').innerHTML = `
    <div class="q-card">
      <div class="q-num">Question ${cState.cur + 1} of ${cState.qs.length}</div>
      <div class="q-text">${q.q}</div>
      <div class="options">
        ${q.options.map((opt, i) => {
          let cls = 'opt';
          if (ans !== null) {
            cls += ' answered';
            if (i === q.answer)              cls += ' correct';
            else if (i === ans && ans !== q.answer) cls += ' wrong';
          }
          return `<button class="${cls}" onclick="selectCAnswer(${i})">
            <span class="opt-letter">${letters[i]}</span>${opt}</button>`;
        }).join('')}
      </div>
      <div class="expl-box ${ans !== null ? 'show' : ''}">
        💡&nbsp;<span>${q.explanation}</span>
      </div>
      <div class="quiz-nav">
        ${cState.cur > 0 ? `<button class="btn btn-secondary btn-sm" onclick="prevCQ()">← Prev</button>` : ''}
        ${cState.cur < cState.qs.length - 1
          ? `<button class="btn btn-primary btn-sm" onclick="nextCQ()">Next →</button>`
          : `<button class="btn btn-primary btn-sm" style="background:var(--green);border-color:var(--green);" onclick="finishChallenge()">Submit Test ✓</button>`
        }
      </div>
    </div>`;
  renderCDots();
}

function selectCAnswer(idx) {
  if (cState.ans[cState.cur] !== null) return;
  cState.ans[cState.cur] = idx;
  renderCQuestion();
}

function nextCQ() { if (cState.cur < cState.qs.length - 1) { cState.cur++; renderCQuestion(); } }
function prevCQ() { if (cState.cur > 0) { cState.cur--; renderCQuestion(); } }

function finishChallenge() {
  clearInterval(cState.timer);
  const correct = cState.ans.filter((a, i) => a === cState.qs[i].answer).length;
  const total   = cState.qs.length;
  const pct     = Math.round((correct / total) * 100);
  const xp      = Math.round(lvl.totalXP * 0.3 * (correct / total));

  document.getElementById('challengeArea').style.display   = 'none';
  document.getElementById('challengeResult').style.display = 'block';

  const circle = document.getElementById('cScoreCircle');
  circle.className = 'score-circle ' + (pct >= 80 ? 'great' : pct >= 60 ? 'good' : 'poor');
  document.getElementById('cScorePct').textContent   = pct + '%';
  document.getElementById('cScoreRatio').textContent = `${correct}/${total} correct`;

  const msgs = {
    perfect:  ['🏆 Perfect Score!',    'You have completely mastered this level!'],
    great:    ['🎉 Challenge Passed!',  'Excellent work. You are ready for the next level!'],
    good:     ['👍 Solid Effort!',      'Good foundation, but there is room for improvement.'],
    poor:     ['📖 Keep Learning!',     'Review the topics again before moving forward.']
  };
  const [msg, sub] = pct === 100 ? msgs.perfect : pct >= 80 ? msgs.great : pct >= 60 ? msgs.good : msgs.poor;
  document.getElementById('cScoreMsg').textContent    = msg;
  document.getElementById('cScoreSubMsg').textContent = sub;
  document.getElementById('cXpEarned').innerHTML = `<div class="xp-badge" style="font-size:1.05rem;padding:10px 22px;justify-content:center;">⭐ +${xp} XP Earned!</div>`;

  const scores = JSON.parse(localStorage.getItem('skillup_chal_scores') || '[]');
  scores.push({ level: currentLevel, score: pct, correct, total, xp, date: new Date().toISOString() });
  localStorage.setItem('skillup_chal_scores', JSON.stringify(scores));

  if (pct >= 80) {
    const currentUnlocked = parseInt(localStorage.getItem('skillup_unlocked_level')) || 2;
    if (currentLevel >= currentUnlocked && currentLevel < 7) {
      localStorage.setItem('skillup_unlocked_level', currentLevel + 1);
    }
  }

  const wrong = cState.qs.map((q,i) => ({q, i, uAns: cState.ans[i], ok: cState.ans[i] === q.answer })).filter(x => !x.ok);
  if (wrong.length) {
    document.getElementById('cReviewSection').innerHTML = `
      <div class="section-title"><div class="dot"></div>Review — Wrong Answers</div>
      ${wrong.map(({q, uAns}) => `
        <div style="background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:16px 18px;margin-bottom:12px;">
          <div style="font-weight:600;font-size:0.92rem;margin-bottom:10px;">${q.q}</div>
          <div style="font-size:0.85rem;">❌ Your answer: <span style="color:#ef4444;">${uAns !== null ? q.options[uAns] : 'Not answered'}</span></div>
          <div style="font-size:0.85rem;">✅ Correct:     <span style="color:var(--green);">${q.options[q.answer]}</span></div>
          <div style="font-size:0.83rem;color:var(--text2);margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.06);">💡 ${q.explanation}</div>
        </div>`).join('')}`;
  }

  if (pct >= 80) { launchConfetti(); showToast(`Challenge passed! +${xp} XP 🎉`, 'success', '⭐'); }
  else showToast(`Challenge complete — score: ${pct}%`, 'info', '📊');
}

function startCTimer() {
  cState.timeLeft = 1800;
  clearInterval(cState.timer);
  cState.timer = setInterval(() => {
    cState.timeLeft--;
    const m = String(Math.floor(cState.timeLeft / 60)).padStart(2,'0');
    const s = String(cState.timeLeft % 60).padStart(2,'0');
    document.getElementById('cTimerDisplay').textContent = `${m}:${s}`;
    if (cState.timeLeft <= 180) document.getElementById('cTimerBox').classList.add('warning');
    if (cState.timeLeft <= 0) { clearInterval(cState.timer); finishChallenge(); }
  }, 1000);
}