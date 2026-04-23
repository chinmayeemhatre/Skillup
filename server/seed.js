/**
 * SKILLUP — Database Seeder
 * Seeds MongoDB with sample levels and demo users.
 *
 * Usage:
 *   cd server
 *   node seed.js          ← inserts sample data
 *   node seed.js --clear  ← clears all data first, then seeds
 */

const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const bcrypt   = require('bcryptjs');

dotenv.config();

const User  = require('./models/User');
const Level = require('./models/Level');
const Score = require('./models/Score');

// ── Sample Level Data ─────────────────────────────────────────
const levelsData = [
  {
    levelNumber: 1,
    title:       'Level 1: Programming Basics',
    shortTitle:  'Basics',
    icon:        '🧠',
    totalXP:     100,
    description: 'Master the foundations — variables, control flow, functions, and OOP.',
    theory: {
      sections: [
        {
          title:   'Variables & Data Types',
          content: 'A variable is a named storage location. Python supports int, float, str, bool, list, dict...',
          code:    'name = "Alice"\nage = 20\nprint(f"{name} is {age}")'
        },
        {
          title:   'Control Flow',
          content: 'if-elif-else, for loops, while loops control execution order.',
          code:    'for i in range(1,6):\n    print(i, end=" ")'
        },
        {
          title:   'Functions',
          content: 'Functions are reusable blocks of code that take parameters and return values.',
          code:    'def greet(name):\n    return f"Hello, {name}!"\nprint(greet("World"))'
        },
        {
          title:   'OOP Basics',
          content: 'Classes and objects — encapsulation, inheritance, polymorphism.',
          code:    'class Student:\n    def __init__(self, name):\n        self.name = name'
        }
      ],
      resources: [
        { icon:'📖', title:'Python Official Docs',    type:'Documentation', url:'https://docs.python.org/3/' },
        { icon:'🌐', title:'W3Schools Python',         type:'Tutorial',      url:'https://www.w3schools.com/python/' },
        { icon:'🎓', title:'CS50',                     type:'Free Course',   url:'https://cs50.harvard.edu/x/' },
        { icon:'🏋️', title:'HackerRank Python',        type:'Practice',      url:'https://www.hackerrank.com/domains/python' }
      ]
    },
    quiz: [
      { question:'What does `type(3.14)` return?',               options:["<class 'int'>","<class 'float'>","<class 'double'>","<class 'number'>"], answerIndex:1, explanation:'3.14 is a float in Python.' },
      { question:'Which keyword defines a function in Python?',  options:['function','func','def','define'],                                          answerIndex:2, explanation:"Python uses 'def' to define functions." },
      { question:'What does OOP stand for?',                     options:['Object Oriented Programming','Object Only Processing','Online Object Programming','Operational Object Paradigm'], answerIndex:0, explanation:'OOP = Object-Oriented Programming.' },
      { question:'What does range(1, 5) produce?',               options:['1,2,3,4,5','1,2,3,4','0,1,2,3,4','1 to 5'],                              answerIndex:1, explanation:'range(1,5) generates 1,2,3,4 (5 is excluded).' },
      { question:'Which OOP principle allows method overriding?',options:['Encapsulation','Abstraction','Polymorphism','Inheritance'],                answerIndex:2, explanation:'Polymorphism allows child classes to override parent methods.' }
    ],
    challenge: {
      title:       'FizzBuzz',
      difficulty:  'easy',
      description: 'Print numbers 1 to n. For multiples of 3 print Fizz, 5 print Buzz, both print FizzBuzz.',
      examples:    [{ input:'n=15', output:'1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz' }],
      constraints: '1 ≤ n ≤ 100',
      hints:       ['Use modulo %','Check FizzBuzz before Fizz/Buzz separately','for i in range(1, n+1)'],
      starterCode: {
        python:     'def fizzbuzz(n):\n    for i in range(1, n + 1):\n        pass  # your code here\n\nfizzbuzz(15)',
        javascript: 'function fizzbuzz(n) {\n  for (let i = 1; i <= n; i++) {\n    // your code here\n  }\n}\nfizzbuzz(15);',
        cpp:        '#include<iostream>\nusing namespace std;\nvoid fizzbuzz(int n){\n    for(int i=1;i<=n;i++){\n        // your code here\n    }\n}\nint main(){fizzbuzz(15);}'
      },
      sampleOutput: '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz',
      testCases:   [{ input:'15', expectedOutput:'1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz' }]
    }
  },
  {
    levelNumber: 2,
    title:       'Level 2: Data Structures & Algorithms',
    shortTitle:  'DSA',
    icon:        '⚡',
    totalXP:     400,
    description: 'Arrays, linked lists, binary search, trees, and sorting — the backbone of interviews.',
    theory: {
      sections: [
        { title:'Arrays & Two Pointers', content:'Arrays give O(1) access. Two-pointer technique solves many O(n²) problems in O(n).', code:'# Two pointer\ndef two_sum(a,t):\n    l,r=0,len(a)-1\n    while l<r:\n        s=a[l]+a[r]\n        if s==t: return l,r\n        elif s<t: l+=1\n        else: r-=1' },
        { title:'Linked Lists',          content:'Nodes with data and next pointer. O(1) head insertion, O(n) access.', code:'class Node:\n    def __init__(self,v):\n        self.val=v\n        self.next=None' },
        { title:'Binary Search',         content:'Works on sorted arrays. Halves search space each step → O(log n).', code:'def bs(arr,t):\n    l,r=0,len(arr)-1\n    while l<=r:\n        m=l+(r-l)//2\n        if arr[m]==t: return m\n        elif arr[m]<t: l=m+1\n        else: r=m-1\n    return -1' },
        { title:'Trees & Traversals',    content:'BST: left < root < right. In-order gives sorted output.', code:'def inorder(root):\n    if not root: return []\n    return inorder(root.left)+[root.val]+inorder(root.right)' }
      ],
      resources: [
        { icon:'📊', title:'Visualgo', type:'Interactive Tool', url:'https://visualgo.net/en' },
        { icon:'🏋️', title:'LeetCode', type:'Practice',        url:'https://leetcode.com/problemset/' },
        { icon:'📚', title:'NeetCode', type:'Roadmap Guide',   url:'https://neetcode.io/roadmap' },
        { icon:'📖', title:'Big-O Cheat Sheet', type:'Reference', url:'https://www.bigocheatsheet.com/' }
      ]
    },
    quiz: [
      { question:'Time complexity of binary search?',                           options:['O(n)','O(log n)','O(n log n)','O(1)'],                            answerIndex:1, explanation:'Binary search halves the search space each step → O(log n).' },
      { question:'Which data structure uses LIFO principle?',                   options:['Queue','Array','Stack','Linked List'],                             answerIndex:2, explanation:'Stack = Last In First Out (LIFO).' },
      { question:'Time complexity of inserting at HEAD of a linked list?',     options:['O(n)','O(log n)','O(n²)','O(1)'],                                 answerIndex:3, explanation:'Head insertion only updates the head pointer → O(1).' },
      { question:'BST in-order traversal gives elements in what order?',       options:['Random','Reverse sorted','Sorted ascending','Level order'],        answerIndex:2, explanation:'In-order (L→Root→R) on BST always gives sorted ascending order.' },
      { question:'Worst-case time complexity of QuickSort?',                   options:['O(n log n)','O(n)','O(n²)','O(log n)'],                           answerIndex:2, explanation:'QuickSort degrades to O(n²) when pivot is always min/max.' }
    ],
    challenge: {
      title:       'Binary Search Implementation',
      difficulty:  'medium',
      description: 'Implement binary search. Return the index of target in sorted array, or -1 if not found. Must be O(log n).',
      examples:    [
        { input:'nums=[-1,0,3,5,9,12], target=9',  output:'4' },
        { input:'nums=[-1,0,3,5,9,12], target=2',  output:'-1' }
      ],
      constraints: '1 ≤ nums.length ≤ 10000, all values unique, sorted ascending',
      hints: [
        'Initialise left=0, right=len(nums)-1',
        'mid = left + (right - left) // 2  (avoids overflow)',
        'If nums[mid] < target → search right half: left = mid + 1'
      ],
      starterCode: {
        python:     'def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        # TODO: your logic here\n        pass\n    return -1\n\nprint(search([-1,0,3,5,9,12], 9))',
        javascript: 'function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor(left + (right - left) / 2);\n    // TODO: your logic here\n  }\n  return -1;\n}\nconsole.log(search([-1,0,3,5,9,12], 9));',
        cpp:        'int search(vector<int>& n, int t) {\n    int l=0, r=n.size()-1;\n    while(l<=r){\n        int m=l+(r-l)/2;\n        // TODO: your logic here\n    }\n    return -1;\n}'
      },
      sampleOutput: 'Test 1: 4 ✓\nTest 2: -1 ✓\nAll test cases passed!',
      testCases: [
        { input:'[-1,0,3,5,9,12] 9',  expectedOutput:'4' },
        { input:'[-1,0,3,5,9,12] 2',  expectedOutput:'-1' }
      ]
    }
  },
  {
    levelNumber: 3,
    title: 'Level 3: Projects',
    shortTitle:'Projects', icon:'🛠️', totalXP:500,
    description:'Build real projects — a portfolio that speaks louder than grades.',
    theory:{ sections:[], resources:[] }, quiz:[],
    challenge:{ title:'Build a Todo App', difficulty:'medium', description:'Create a full-stack Todo app.', examples:[], constraints:'', hints:[], starterCode:{python:'',javascript:'// Your Todo app here',cpp:''}, sampleOutput:'App running ✓', testCases:[] }
  },
  {
    levelNumber: 4,
    title: 'Level 4: Resume + GitHub',
    shortTitle:'Resume & GitHub', icon:'📄', totalXP:400,
    description:'Polish your online presence — make recruiters notice you.',
    theory:{ sections:[], resources:[] }, quiz:[],
    challenge:{ title:'GitHub Profile README', difficulty:'easy', description:'Create an impressive GitHub profile README.md', examples:[], constraints:'', hints:[], starterCode:{python:'',javascript:'',cpp:''}, sampleOutput:'README looks great! ✓', testCases:[] }
  },
  {
    levelNumber: 5,
    title: 'Level 5: Interview Prep',
    shortTitle:'Interview Prep', icon:'🎯', totalXP:600,
    description:'100 LeetCode + mock interviews + aptitude + HR prep.',
    theory:{ sections:[], resources:[] }, quiz:[],
    challenge:{ title:'Two Sum', difficulty:'hard', description:'Return indices of two numbers that add to target.', examples:[{input:'[2,7,11,15], target=9', output:'[0,1]'}], constraints:'One solution guaranteed', hints:['Use a HashMap'], starterCode:{python:'def twoSum(nums, target):\n    seen = {}\n    # your code here',javascript:'',cpp:''}, sampleOutput:'[0, 1] ✓', testCases:[] }
  },
  {
    levelNumber: 6,
    title: 'Level 6: Job Apply',
    shortTitle:'Job Apply', icon:'📬', totalXP:500,
    description:'Start applying — internships, campus placements, referrals.',
    theory:{ sections:[], resources:[] }, quiz:[],
    challenge:{ title:'Write a Cover Letter', difficulty:'easy', description:'Write a compelling cover letter for a SWE internship.', examples:[], constraints:'', hints:['Strong hook','Mention company projects','Clear CTA'], starterCode:{python:'',javascript:'// Cover letter here',cpp:''}, sampleOutput:'Submitted! ✓', testCases:[] }
  },
  {
    levelNumber: 7,
    title: 'Level 7: Internship Ready 🚀',
    shortTitle:'Internship Ready', icon:'🚀', totalXP:1000,
    description:'You\'ve made it — internship offer in hand. You are a developer!',
    theory:{ sections:[], resources:[] }, quiz:[],
    challenge:{ title:'System Design: URL Shortener', difficulty:'hard', description:'Design bit.ly — explain your architecture.', examples:[], constraints:'Handle 1M req/day', hints:['Hash function','SQL vs NoSQL','Redis caching'], starterCode:{python:'',javascript:'// System Design here',cpp:''}, sampleOutput:'Design accepted! 🏆', testCases:[] }
  }
];

// ── Sample Users ──────────────────────────────────────────────
const usersData = [
  { name:'SKILLUP Admin',  email:'admin@skillup.dev',   password:'adminpassword', username:'admin', xp:9999,level:7, college:'SKILLUP HQ', role:'admin' },
  { name:'Aarav Sharma',   email:'aarav@skillup.dev',   password:'password123',   username:'aarav', xp:340, level:2, college:'KGISL', role:'student' },
  { name:'Priya Nair',     email:'priya@skillup.dev',   password:'password123',   username:'priya', xp:980, level:4, college:'KGISL', role:'mentor'  },
  { name:'Rahul Gupta',    email:'rahul@skillup.dev',   password:'password123',   username:'rahul', xp:1450,level:5, college:'KGISL', role:'mentor'  },
  { name:'Karan Mehta',    email:'karan@skillup.dev',   password:'password123',   username:'karan', xp:2100,level:6, college:'NIT',   role:'mentor'  },
  { name:'Sneha Reddy',    email:'sneha@skillup.dev',   password:'password123',   username:'sneha', xp:450, level:2, college:'VIT',   role:'student' },
  { name:'Arjun Singh',    email:'arjun@skillup.dev',   password:'password123',   username:'arjun', xp:180, level:1, college:'SRM',   role:'student' },
  { name:'Chinmayee M',    email:'chinuu@skillup.dev',  password:'password123',   username:'chinuu.05', xp:720, level:3, college:'Anna University', role:'student' },
  { name:'Rohan Das',      email:'rohan@skillup.dev',   password:'password123',   username:'rohan', xp:1100,level:4, college:'BITS',  role:'student' }
];

// ── Seed function ─────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clear existing data if --clear flag
    if (process.argv.includes('--clear')) {
      await Promise.all([User.deleteMany({}), Level.deleteMany({}), Score.deleteMany({})]);
      console.log('🗑️  Cleared existing data');
    }

    // Seed levels
    for (const lvl of levelsData) {
      await Level.findOneAndUpdate(
        { levelNumber: lvl.levelNumber },
        lvl,
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${levelsData.length} levels`);

    // Seed users (skip if email already exists)
    let created = 0;
    for (const userData of usersData) {
      const exists = await User.findOne({ email: userData.email });
      if (exists) continue;

      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(userData.password, salt);

      const user = new User({
        name:     userData.name,
        email:    userData.email,
        username: userData.username,
        password: hash,
        xp:       userData.xp,
        level:    userData.level,
        college:  userData.college,
        role:     userData.role,
        badges:   [{ id:'first_step', name:'First Step', icon:'🌟' }],
        streak:   { current:5, longest:12, lastLogin: new Date() }
      });
      // Skip pre-save hook's re-hashing since we hashed manually
      user.$skipPasswordHash = true;
      await user.save();
      created++;
    }
    console.log(`✅ Seeded ${created} new users (skipped ${usersData.length - created} existing)`);

    console.log('\n🎮 SKILLUP database seeded successfully!');
    console.log('   Demo login: aarav@skillup.dev / password123\n');

  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
