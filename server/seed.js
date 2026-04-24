
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const bcrypt   = require('bcryptjs');

dotenv.config();

const User  = require('./models/User');
const Level = require('./models/Level');
const Score = require('./models/Score');
const Feedback = require('./models/Feedback');

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
        javascript: 'function fizzbuzz(n) {\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) console.log("FizzBuzz");\n    else if (i % 3 === 0) console.log("Fizz");\n    else if (i % 5 === 0) console.log("Buzz");\n    else console.log(i);\n  }\n}',
        cpp:        '#include<iostream>\nusing namespace std;\nvoid fizzbuzz(int n){\n    for(int i=1;i<=n;i++){\n        if(i%15==0) cout<<"FizzBuzz ";\n        else if(i%3==0) cout<<"Fizz ";\n        else if(i%5==0) cout<<"Buzz ";\n        else cout<<i<<" ";\n    }\n}'
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
        'mid = left + (right - left) // 2',
        'If nums[mid] < target → search right half: left = mid + 1'
      ],
      starterCode: {
        python:     'def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1',
        javascript: 'function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor(left + (right - left) / 2);\n    if (nums[mid] === target) return mid;\n    else if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}',
        cpp:        'int search(vector<int>& n, int t) {\n    int l=0, r=n.size()-1;\n    while(l<=r){\n        int m=l+(r-l)/2;\n        if(n[m]==t) return m;\n        else if(n[m]<t) l=m+1;\n        else r=m-1;\n    }\n    return -1;\n}'
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
    description:'Build real projects — a portfolio that speaks louder than grades. Web apps, REST APIs, and deployment await.',
    theory:{
      sections:[
        { title:'🌐 Frontend Architecture & Modern React', content:'Modern frontend development goes beyond just HTML/CSS. React is the industry standard. Key patterns: Component Lifecycle, Hooks (useEffect, useMemo), and State Management.', code:'import React, { useState, useEffect } from "react";\n\nfunction Dashboard({ userId }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(`/api/user/${userId}/stats`)\n      .then(res => res.json())\n      .then(json => setData(json));\n  }, [userId]);\n\n  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;\n}' },
        { title:'⚙️ Scalable Backend with Node.js', content:'A professional backend handles security, scalability, and performance using Middleware, Environment Variables, and JWT.', code:'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\napp.get("/api/data", (req, res) => {\n  res.json({ success: true, data: [] });\n});' },
        { title:'🗄️ Database Modeling', content:'In NoSQL, data modeling is driven by access patterns. Embedding vs Referencing and Indexing are key concepts.', code:'const mongoose = require("mongoose");\nconst userSchema = new mongoose.Schema({\n  name: String,\n  email: { type: String, index: true }\n});' }
      ],
      resources:[
        { icon:'🎥', title:'React Crash Course', type:'Video Tutorial', url:'https://youtube.com' },
        { icon:'📖', title:'MDN Web Docs', type:'Documentation', url:'https://developer.mozilla.org' }
      ]
    },
    quiz:[
      { question:'What does REST stand for?', options:['Representational State Transfer', 'Remote Execution Syntax', 'Random End State', 'Rapid Execution'], answerIndex:0, explanation:'REST is an architectural style for APIs.' },
      { question:'Which is a NoSQL database?', options:['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'], answerIndex:2, explanation:'MongoDB is a popular NoSQL document store.' },
      { question:'Which HTTP method creates a new resource?', options:['GET', 'PUT', 'POST', 'DELETE'], answerIndex:2, explanation:'POST is used for creating new resources.' },
      { question:'What is React primarily used for?', options:['Database management', 'Building user interfaces', 'Server-side routing', 'Creating APIs'], answerIndex:1, explanation:'React is a library for building UIs.' },
      { question:'Which status code represents "Not Found"?', options:['200', '404', '500', '403'], answerIndex:1, explanation:'404 is the standard Not Found code.' }
    ],
    challenge:{ title:'Build a Todo App', difficulty:'medium', description:'Create a full-stack Todo app.', examples:[], constraints:'', hints:[], starterCode:{python:'',javascript:'// Your Todo app here',cpp:''}, sampleOutput:'App running ✓', testCases:[] }
  },
  {
    levelNumber: 4,
    title: 'Level 4: Resume + GitHub',
    shortTitle:'Resume & GitHub', icon:'📄', totalXP:400,
    description:'Polish your online presence — make recruiters notice you.',
    theory:{
      sections:[
        { title:'📄 ATS-Friendly Resume', content:'Recruiters and ATS scan resumes in seconds. Use the XYZ formula and strong action verbs.', code:'✅ Good: \n- Architected a React-based student dashboard, reducing page load time by 40% through lazy loading.' },
        { title:'🐙 GitHub Profile & Portfolio', content:'Your GitHub is your proof of work. Create a Profile README and pin your top projects.', code:'# Hi there, I\'m Aarav! 👋\n\nI\'m a Full-Stack Developer passionate about building scalable web apps.' }
      ],
      resources:[
        { icon:'🎥', title:'Resume Tips for Tech Jobs', type:'Video Tutorial', url:'https://youtube.com' },
        { icon:'📖', title:'GitHub Profile README Guide', type:'Documentation', url:'https://docs.github.com' }
      ]
    },
    quiz:[
      { question:'How long should a student resume ideally be?', options:['1 page', '2 pages', '3 pages', 'As long as needed'], answerIndex:0, explanation:'Recruiters spend ~6 seconds per resume. Keep it concise.' },
      { question:'Which format is best for submitting resumes online?', options:['Word', 'PDF', 'Text', 'Image'], answerIndex:1, explanation:'PDF ensures formatting remains consistent.' },
      { question:'What is a "pinned" repository on GitHub?', options:['A private repo', 'A deleted repo', 'A highlighted repo at the top', 'A forked repo'], answerIndex:2, explanation:'Pinning showcases your best work.' },
      { question:'Which tool is standard for version control?', options:['Dropbox', 'Google Drive', 'Git', 'FTP'], answerIndex:2, explanation:'Git is the industry standard.' },
      { question:'What does ATS stand for?', options:['Automated Tracking System', 'Applicant Tracking System', 'Advanced Tech Screening', 'App Testing Suite'], answerIndex:1, explanation:'ATS software manages the recruiting process.' }
    ],
    challenge:{ title:'GitHub Profile README', difficulty:'easy', description:'Create an impressive GitHub profile README.md', examples:[], constraints:'', hints:[], starterCode:{python:'',javascript:'',cpp:''}, sampleOutput:'README looks great! ✓', testCases:[] }
  },
  {
    levelNumber: 5,
    title: 'Level 5: Interview Prep',
    shortTitle:'Interview Prep', icon:'🎯', totalXP:600,
    description:'100 LeetCode + mock interviews + aptitude + HR preparation.',
    theory:{
      sections:[
        { title:'🗣️ Behavioral Interviews', content:'Companies test your EQ and conflict resolution. Focus on the STAR method and showing growth.', code:'STAR Method Refined:\n1. Situation: High stakes...\n2. Task: Migrating records...\n3. Action: Coordinated with DevOps...\n4. Result: finished in 4h with 0% loss.' },
        { title:'💻 Master DSA Patterns', content:'FAANG+ interviews require deep DSA knowledge: DP, Graph Algorithms, and Sliding Window.', code:'function maxSubarraySum(arr, k) {\n  let maxSum = 0, windowSum = 0;\n  for (let i = 0; i < k; i++) maxSum += arr[i];\n  windowSum = maxSum;\n  for (let i = k; i < arr.length; i++) {\n    windowSum += arr[i] - arr[i-k];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  return maxSum;\n}' },
        { title:'🏗️ System Design', content:'System design is about trade-offs: Load Balancers, Sharding, and Caching.', code:'Asynchronous Task Workflow:\n1. User clicks Sign Up.\n2. Server creates user in DB.\n3. Server sends message to Queue.\n4. Server returns Success.' }
      ],
      resources:[
        { icon:'🎥', title:'Mock Interview Example', type:'Video Tutorial', url:'https://youtube.com' }
      ]
    },
    quiz:[
      { question:'What does STAR stand for?', options:['Situation, Task, Action, Result', 'Start, Think, Act, Review', 'System, Tech, Architecture, Requirement', 'Standard, Test, Analysis, Report'], answerIndex:0, explanation:'STAR is a framework for structuring behavioral answers.' },
      { question:'Purpose of a Load Balancer?', options:['Store data', 'Compile code', 'Distribute network traffic', 'Balance trees'], answerIndex:2, explanation:'Load balancers ensure no single server is overwhelmed.' },
      { question:'Why is caching used?', options:['Delete data', 'Speed up retrieval by storing in memory', 'Secure passwords', 'Balance traffic'], answerIndex:1, explanation:'Caches provide sub-millisecond access.' },
      { question:'What is Horizontal Scaling?', options:['Upgrade RAM', 'Add more servers', 'Scale image', 'Optimize algorithm'], answerIndex:1, explanation:'Horizontal scaling means adding more machines.' },
      { question:'What is "brute force"?', options:['Optimized solution', 'Hardware solution', 'Naive solution checking all possibilities', 'AI solution'], answerIndex:2, explanation:'Brute force is often the first step before optimizing.' }
    ],
    challenge:{ title:'Two Sum', difficulty:'hard', description:'Return indices of two numbers that add to target.', examples:[{input:'[2,7,11,15], target=9', output:'[0,1]'}], constraints:'One solution guaranteed', hints:['Use a HashMap'], starterCode:{python:'def twoSum(nums, target):\n    seen = {}\n    # your code here',javascript:'',cpp:''}, sampleOutput:'[0, 1] ✓', testCases:[] }
  },
  {
    levelNumber: 6,
    title: 'Level 6: Job Apply',
    shortTitle:'Job Apply', icon:'📬', totalXP:500,
    description:'Start applying — internships, campus placements, referrals.',
    theory:{
      sections:[
        { title:'📧 Cold Emailing', content:'Direct outreach to recruiters or managers can boost response rates. Keep it short and personalize.', code:'Subject: SE Intern Application — [Name]\n\nHi [Name], I saw [Company] is expanding and I\'d love to contribute...' },
        { title:'🤝 Networking', content:'A referral guarantees a human looks at your resume. Connect with alumni on LinkedIn.', code:'Connection Note:\n"Hi [Name], I\'m a CS student at [University]. I love the work your team is doing..."' }
      ],
      resources:[
        { icon:'🎥', title:'How to Ask for a Referral', type:'Video Tutorial', url:'https://youtube.com' }
      ]
    },
    quiz:[
      { question:'Main benefit of a referral?', options:['Guaranteed job', 'Higher salary', 'Resume seen faster by human', 'No technical interview'], answerIndex:2, explanation:'Referrals often bypass initial automated screening.' },
      { question:'How long should a cold email be?', options:['3-4 paragraphs', 'Short (3-4 sentences)', 'Just attachment', 'Technical essay'], answerIndex:1, explanation:'Recruiters are busy. Get straight to the point.' },
      { question:'What is an elevator pitch?', options:['30-second summary', 'Pitch for new elevator', '10-minute speech', 'Sales technique'], answerIndex:0, explanation:'It\'s a quick, compelling introduction.' },
      { question:'Should you apply if you meet 60% of requirements?', options:['No', 'Yes, apply anyway', 'Only if you know CEO', 'Yes, but lie'], answerIndex:1, explanation:'Job descriptions are often wish lists.' },
      { question:'What does LGTM mean?', options:['Let\'s Go To Meeting', 'Looks Good To Me', 'Leave Github To Me', 'Little Giant Monkey'], answerIndex:1, explanation:'LGTM signifies approval of a PR.' }
    ],
    challenge:{ title:'Write a Cover Letter', difficulty:'easy', description:'Write a compelling cover letter for a SWE internship.', examples:[], constraints:'', hints:['Strong hook','Mention company projects','Clear CTA'], starterCode:{python:'',javascript:'// Cover letter here',cpp:''}, sampleOutput:'Submitted! ✓', testCases:[] }
  },
  {
    levelNumber: 7,
    title: 'Level 7: Internship Ready 🚀',
    shortTitle:'Internship Ready', icon:'🚀', totalXP:1000,
    description:'You\'ve made it — internship offer in hand. You are a developer!',
    theory:{
      sections:[
        { title:'🎉 Evaluating Offers', content:'Evaluate Total Compensation (TC) including Base, Bonus, and Equity. Check Engineering Culture too.', code:'Negotiation Tip: Negotiation is a collaboration, not a confrontation.' },
        { title:'🚀 First 30 Days', content:'Absorb and Assist. Focus on setup, small bugs, and consistent communication in Standups.', code:'Standup Format:\n1. Yesterday: fixed bug X.\n2. Today: starting Y.\n3. Blockers: none.' }
      ],
      resources:[
        { icon:'🎥', title:'How to Negotiate Your Salary', type:'Video Tutorial', url:'https://youtube.com' }
      ]
    },
    quiz:[
      { question:'What is "onboarding"?', options:['Boat ride', 'Process of integrating new employee', 'Being fired', 'Coding test'], answerIndex:1, explanation:'Onboarding includes setting up accounts and learning culture.' },
      { question:'What is an "exploding offer"?', options:['High paying offer', 'Offer with unreasonably short deadline', 'A scam', 'A promotion'], answerIndex:1, explanation:'Exploding offers pressure candidates to accept quickly.' },
      { question:'What is "equity" in a job offer?', options:['Equal treatment', 'Stock options or shares', 'Type of bonus', 'Health insurance'], answerIndex:1, explanation:'Equity means owning a small piece of the company.' },
      { question:'What is "imposter syndrome"?', options:['A virus', 'Feeling like a fraud despite achievements', 'Design pattern', 'Type of hacker'], answerIndex:1, explanation:'Very common in tech; feeling you don\'t belong.' },
      { question:'What is a "1-on-1"?', options:['Coding battle', 'Private meeting with manager', 'Basketball game', 'Performance review'], answerIndex:1, explanation:'1-on-1s are for discussing growth and blockers.' }
    ],
    challenge:{ title:'System Design: URL Shortener', difficulty:'hard', description:'Design bit.ly — explain your architecture.', examples:[], constraints:'Handle 1M req/day', hints:['Hash function','SQL vs NoSQL','Redis caching'], starterCode:{python:'',javascript:'// System Design here',cpp:''}, sampleOutput:'Design accepted! 🏆', testCases:[] }
  }
];

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

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    if (process.argv.includes('--clear')) {
      await Promise.all([
        User.deleteMany({}),
        Level.deleteMany({}),
        Score.deleteMany({}),
        Feedback.deleteMany({})
      ]);
      console.log('🗑️  Cleared existing data');
    }

    for (const lvl of levelsData) {
      await Level.findOneAndUpdate(
        { levelNumber: lvl.levelNumber },
        lvl,
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${levelsData.length} levels`);

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

      user.$skipPasswordHash = true;
      await user.save();
      created++;
    }
    console.log(`✅ Seeded ${created} new users (skipped ${usersData.length - created} existing)`);

    const studentUsers = await User.find({ role: 'student' }).limit(3);
    if (studentUsers.length > 0) {
      const feedbackData = [
        {
          user: studentUsers[0]._id,
          rating: 5,
          type: 'praise',
          title: 'Amazing UI!',
          content: 'The high-tech golden theme is absolutely stunning. Best learning platform I have used.'
        },
        {
          user: studentUsers[1]._id,
          rating: 4,
          type: 'suggestion',
          title: 'More C++ content',
          content: 'I would love to see more DSA challenges specifically for C++ in Level 2.'
        },
        {
          user: studentUsers[2]._id,
          rating: 2,
          type: 'bug',
          title: 'Quiz timer glitch',
          content: 'The timer occasionally skips a few seconds on mobile view. Please check.'
        }
      ];
      await Feedback.insertMany(feedbackData);
      console.log('✅ Seeded 3 sample feedback records');
    }

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