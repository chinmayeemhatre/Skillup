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
      { q:"How do you insert comments in Python code?", options:["","// This is a comment","# This is a comment",""], answer:2, explanation:"In Python, comments start with the hash character (#)." },
      { q:"Which operator is used for exponentiation (power) in Python?", options:["^","**","//","%"], answer:1, explanation:"The ** operator is used for exponentiation. For example, 2**3 equals 8." },
      { q:"What will be the output of `bool('False')`?", options:["True","False","Error","None"], answer:0, explanation:"Any non-empty string in Python evaluates to True, even the string 'False'." },
      { q:"Which method can be used to remove any whitespace from both the beginning and the end of a string?", options:["strip()","trim()","ptrim()","len()"], answer:0, explanation:"The strip() method removes leading and trailing whitespace." },
      { q:"How do you start a while loop in Python?", options:["while x > y {","while (x > y)","while x > y:","while x > y"], answer:2, explanation:"Python uses a colon (:) to indicate the start of a code block." },
      { q:"What is the correct file extension for Python files?", options:[".pyth",".pt",".pyt",".py"], answer:3, explanation:"Python scripts use the .py file extension." },
      { q:"How do you create a variable with the numeric value 5?", options:["x = int(5)","x = 5","Both are correct","None of the above"], answer:2, explanation:"Both create a variable with the integer value 5, though x = 5 is more idiomatic." },
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
          content: "<strong style='color:var(--yellow-l)'>Binary Search</strong> works ONLY on sorted arrays. Key idea: compare the middle element to the target and eliminate <em>half</em> the remaining search space each step. This gives O(log n) time. Critical detail: use <code style='color:var(--yellow);background:rgba(0,0,0,0.3);padding:1px 5px;border-radius:3px;'>mid = left + (right - left) // 2</code> to avoid integer overflow.</strong>",
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
          title: "🌐 Frontend Architecture & Modern React",
          content: "Modern frontend development goes beyond just HTML/CSS. <strong style='color:var(--yellow-l)'>React</strong> is the industry standard. Key architectural patterns include: <br>• <strong>Component Lifecycle:</strong> Understanding mounting, updating, and unmounting.<br>• <strong>Hooks:</strong> Using <code style='color:var(--yellow)'>useEffect</code> for side effects (API calls, subscriptions) and <code style='color:var(--yellow)'>useMemo/useCallback</code> for performance optimization.<br>• <strong>State Management:</strong> Using Context API or Redux for global application state.",
          code: `import React, { useState, useEffect, useMemo } from 'react';

function Dashboard({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/user/\${userId}/stats\`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, [userId]);

  const processedData = useMemo(() => {
    return data ? data.map(item => item.value * 2) : [];
  }, [data]);

  if (loading) return <div>Loading...</div>;
  return <div>{processedData.join(', ')}</div>;
}`
        },
        {
          title: "⚙️ Scalable Backend with Node.js & Express",
          content: "A professional backend needs to handle security, scalability, and performance. <br>• <strong>Middleware:</strong> Functions that execute during the request-response cycle (Authentication, Logging, Error handling).<br>• <strong>Environment Variables:</strong> Using <code style='color:var(--yellow)'>dotenv</code> to store sensitive keys safely.<br>• <strong>JWT Authentication:</strong> Securely identifying users without session state.",
          code: `const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};