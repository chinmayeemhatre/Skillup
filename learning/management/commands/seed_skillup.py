from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

from learning.models import Badge, Level, LevelTask, Profile, Resource, TaskCompletion, UserBadge, UserLevelProgress


LEVELS = [
    {
        'number': 1,
        'title': 'Basics',
        'tagline': 'Build programming confidence with Python, Git, terminal, and web foundations.',
        'xp_reward': 120,
        'theory': (
            'Start by learning how programs think: variables store values, conditions choose paths, '
            'loops repeat work, functions package logic, and debugging helps you inspect mistakes. '
            'A beginner developer should also know how the terminal works, how Git records code history, '
            'and how HTML, CSS, and JavaScript combine to create a web page.'
        ),
        'mini_project': 'Build a personal developer profile page with HTML/CSS, add a JavaScript theme toggle, and push it to GitHub.',
        'example_questions': 'What is a variable? How is a list different from a dictionary? Why do we use Git branches? Explain the request-response cycle in simple words.',
        'tasks': [
            ('Python fundamentals sprint', 'Write 20 small programs covering input, strings, lists, loops, and functions.', 30),
            ('GitHub profile setup', 'Create a GitHub account, add a profile README, and push your first repository.', 25),
            ('Responsive portfolio card', 'Design a mobile-friendly card with name, skills, contact links, and one project preview.', 35),
            ('Debugging journal', 'Solve five beginner bugs and write what caused each bug and how you fixed it.', 20),
        ],
        'resources': [
            ('video', 'Python for Beginners - freeCodeCamp', 'https://www.youtube.com/watch?v=eWRfhZUzrAc', 'A practical long-form Python introduction.'),
            ('video', 'HTML CSS JavaScript Crash Course', 'https://www.youtube.com/watch?v=UB1O30fR-EE', 'Beginner web development overview.'),
            ('reference', 'MDN Web Docs', 'https://developer.mozilla.org/en-US/docs/Learn', 'Reliable web learning docs for HTML, CSS, and JavaScript.'),
            ('reference', 'Git Handbook', 'https://guides.github.com/introduction/git-handbook/', 'Beginner-friendly Git concepts.'),
            ('tip', 'Practice tiny programs daily', '', 'Do not wait for a big project. Small repetitions build fluency quickly.'),
            ('tip', 'Read error messages from top to bottom', '', 'Most beginner bugs reveal the exact line and reason if you slow down.'),
        ],
    },
    {
        'number': 2,
        'title': 'DSA',
        'tagline': 'Use data structures and algorithms to solve problems with clarity and speed.',
        'xp_reward': 180,
        'theory': (
            'DSA is the skill of choosing the right structure and strategy. Arrays and strings help with ordered data, '
            'hash maps help with fast lookups, stacks and queues model process flow, trees model hierarchy, and graphs model relationships. '
            'Learn time complexity so you can explain why one solution scales better than another.'
        ),
        'mini_project': 'Create a visual DSA notebook site that explains 10 patterns with examples and complexity notes.',
        'example_questions': 'Find two-sum. Reverse a linked list. Detect a cycle. Explain binary search. Compare BFS and DFS. What is O(n log n)?',
        'tasks': [
            ('Pattern notebook', 'Document arrays, hashing, two pointers, sliding window, stack, recursion, binary search, trees, graphs, and DP.', 45),
            ('LeetCode starter set', 'Solve 25 easy problems and 10 medium problems with written explanations.', 60),
            ('Complexity practice', 'Write time and space complexity for every solution before you submit it.', 30),
            ('Mock DSA interview', 'Record yourself explaining one problem from brute force to optimized solution.', 45),
        ],
        'resources': [
            ('video', 'Data Structures Easy to Advanced', 'https://www.youtube.com/watch?v=RBSGKlAvoiM', 'Strong DSA course with implementations.'),
            ('video', 'NeetCode Patterns', 'https://www.youtube.com/c/NeetCode', 'Pattern-based coding interview prep.'),
            ('reference', 'VisuAlgo', 'https://visualgo.net/en', 'Animations for common algorithms.'),
            ('reference', 'LeetCode Explore', 'https://leetcode.com/explore/', 'Guided problem collections.'),
            ('tip', 'Solve by pattern, not memory', '', 'Name the technique before coding; this trains interview thinking.'),
            ('tip', 'Explain tradeoffs out loud', '', 'Interviewers value reasoning as much as final code.'),
        ],
    },
    {
        'number': 3,
        'title': 'Projects',
        'tagline': 'Turn knowledge into portfolio-ready products with real users and clean code.',
        'xp_reward': 220,
        'theory': (
            'Projects prove that you can plan, build, ship, and improve software. A good student project has a clear problem, '
            'auth or data storage, a polished interface, meaningful validation, and a README that explains the build. '
            'Use Git issues, commits, and deployment links to show professional habits.'
        ),
        'mini_project': 'Build a full-stack task tracker with authentication, CRUD, filters, dashboard stats, and deployment.',
        'example_questions': 'How did you design the database? What tradeoff did you make? How did you handle errors? What would you improve next?',
        'tasks': [
            ('Project brief', 'Write a one-page problem statement, user stories, data model, and feature list.', 35),
            ('Full-stack build', 'Create one complete app with login, database models, CRUD, search/filter, and validation.', 80),
            ('Deployment', 'Deploy the project and add live URL, screenshots, and setup steps to README.', 45),
            ('Code review pass', 'Refactor duplicate code, add comments only where useful, and create at least five meaningful commits.', 35),
        ],
        'resources': [
            ('video', 'Django Full Course', 'https://www.youtube.com/watch?v=F5mRW0jo-U4', 'End-to-end Django application tutorial.'),
            ('video', 'JavaScript Project Ideas', 'https://www.youtube.com/watch?v=3PHXvlpOkf4', 'Ideas for frontend practice.'),
            ('reference', 'Django Documentation', 'https://docs.djangoproject.com/en/stable/', 'Official framework documentation.'),
            ('reference', 'Render Deployment Docs', 'https://render.com/docs/deploy-django', 'Guide to deploy Django apps.'),
            ('tip', 'Choose boring features and polish them', '', 'A finished simple product beats five unfinished complex ideas.'),
            ('tip', 'Your README is part of the product', '', 'Recruiters often read the README before opening your code.'),
        ],
    },
    {
        'number': 4,
        'title': 'Resume',
        'tagline': 'Present your skills with evidence, metrics, and recruiter-friendly clarity.',
        'xp_reward': 160,
        'theory': (
            'A software resume should be one page, impact-focused, and easy to scan. Every project bullet should mention the technology, '
            'the feature you built, and the result. Your GitHub and LinkedIn should match the story: a student who builds, learns, and communicates.'
        ),
        'mini_project': 'Create a resume website that mirrors your PDF resume and links to deployed projects.',
        'example_questions': 'What is your strongest project? Why should this bullet matter? Which skill is proven by your GitHub?',
        'tasks': [
            ('Resume rewrite', 'Rewrite education, skills, projects, and achievements into one clean page.', 45),
            ('Project bullets', 'Add three bullets per project using action verb, technical detail, and outcome.', 35),
            ('GitHub cleanup', 'Pin your best repositories and improve each README with screenshots and setup.', 35),
            ('LinkedIn alignment', 'Update headline, about section, skills, and featured project links.', 25),
        ],
        'resources': [
            ('video', 'Software Engineer Resume Guide', 'https://www.youtube.com/watch?v=BYUy1yvjHxE', 'Practical resume advice for developers.'),
            ('reference', 'GitHub Profile README Guide', 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/about-your-profile-readme', 'Official GitHub profile docs.'),
            ('reference', 'LinkedIn Profile Tips', 'https://www.linkedin.com/help/linkedin/answer/a554351', 'LinkedIn profile basics.'),
            ('tip', 'Lead with proof', '', 'Replace "learned Django" with "built a Django app with auth, SQLite, and dashboard analytics."'),
            ('tip', 'Remove weak filler', '', 'Do not list every tool you touched once. Keep skills you can discuss.'),
        ],
    },
    {
        'number': 5,
        'title': 'Interview Prep',
        'tagline': 'Practice technical, project, and behavioral interviews with a repeatable system.',
        'xp_reward': 220,
        'theory': (
            'Interview prep combines DSA practice, project storytelling, CS fundamentals, and communication. '
            'Use STAR for behavioral answers, draw diagrams for system-style questions, and practice explaining your code clearly under time pressure.'
        ),
        'mini_project': 'Build an interview tracker that stores questions, answers, confidence score, and next revision date.',
        'example_questions': 'Tell me about yourself. Explain your best project. Design a URL shortener. What happens when you type a URL in a browser?',
        'tasks': [
            ('Behavioral answers', 'Prepare STAR answers for teamwork, conflict, failure, leadership, and learning quickly.', 35),
            ('CS fundamentals', 'Revise OS basics, DBMS SQL joins, networking HTTP/DNS, and OOP principles.', 45),
            ('Mock interviews', 'Complete two DSA mocks and one project deep-dive with a peer.', 70),
            ('Revision loop', 'Create a mistake log and revisit weak topics every three days.', 35),
        ],
        'resources': [
            ('video', 'System Design Primer', 'https://www.youtube.com/watch?v=UzLMhqg3_Wc', 'Beginner-friendly design concepts.'),
            ('video', 'Behavioral Interview Tips', 'https://www.youtube.com/watch?v=PJKYqLP6MRE', 'How to structure interview stories.'),
            ('reference', 'Tech Interview Handbook', 'https://www.techinterviewhandbook.org/', 'Comprehensive interview preparation guide.'),
            ('reference', 'SQLBolt', 'https://sqlbolt.com/', 'Interactive SQL practice.'),
            ('tip', 'Practice with a timer', '', 'Interviews reward clear thinking under constraints.'),
            ('tip', 'Keep a mistake log', '', 'Repeated mistakes reveal the next best topic to study.'),
        ],
    },
    {
        'number': 6,
        'title': 'Job Apply',
        'tagline': 'Build a consistent application pipeline with tracking, outreach, and follow-ups.',
        'xp_reward': 180,
        'theory': (
            'Applying is a pipeline, not a one-time event. Use a spreadsheet or tracker to manage company, role, source, status, '
            'follow-up date, referral contact, and interview notes. Tailor your resume for each role and write short, specific outreach messages.'
        ),
        'mini_project': 'Create a job application CRM with role cards, statuses, notes, referral contacts, and reminders.',
        'example_questions': 'Why this company? How does your project match this role? What did you learn from a rejection?',
        'tasks': [
            ('Application tracker', 'Track 40 roles with source, deadline, status, and follow-up date.', 45),
            ('Tailored resume', 'Create two resume versions: full-stack web and backend/DSA focused.', 35),
            ('Referral outreach', 'Send 15 polite, specific messages to alumni, seniors, or engineers.', 45),
            ('Weekly review', 'Review response rates and improve resume, GitHub, and outreach copy every week.', 30),
        ],
        'resources': [
            ('video', 'How to Get Software Internships', 'https://www.youtube.com/watch?v=4pucH2Q3qHc', 'Practical job search strategy.'),
            ('reference', 'Wellfound Jobs', 'https://wellfound.com/jobs', 'Startup job and internship board.'),
            ('reference', 'LinkedIn Jobs', 'https://www.linkedin.com/jobs/', 'Mainstream job search platform.'),
            ('reference', 'Naukri', 'https://www.naukri.com/', 'Popular India-focused job portal.'),
            ('tip', 'Apply early and follow up', '', 'Many internship roles fill quickly; speed matters.'),
            ('tip', 'Customize the top third', '', 'Recruiters scan first. Make the first half of the resume match the role.'),
        ],
    },
    {
        'number': 7,
        'title': 'Internship Ready',
        'tagline': 'Enter the internship with engineering habits, communication, and delivery confidence.',
        'xp_reward': 260,
        'theory': (
            'Internship-ready students can onboard quickly, ask precise questions, read existing code, ship small improvements, '
            'and communicate progress. Learn Git workflow, issue breakdown, code review etiquette, testing basics, and how to write daily updates.'
        ),
        'mini_project': 'Contribute to an open-source issue or improve an existing project with tests and a clean pull request.',
        'example_questions': 'How do you read a new codebase? How do you ask for help? What makes a pull request easy to review?',
        'tasks': [
            ('Engineering workflow', 'Practice creating branches, opening pull requests, responding to review, and squashing commits.', 45),
            ('Testing basics', 'Add unit tests or integration checks to one existing project.', 55),
            ('Open-source contribution', 'Find a good first issue or improve documentation in a real repository.', 70),
            ('Internship operating manual', 'Write your personal checklist for onboarding, daily updates, blockers, and weekly demos.', 40),
        ],
        'resources': [
            ('video', 'How to Contribute to Open Source', 'https://www.youtube.com/watch?v=yzeVMecydCE', 'Practical first contribution guide.'),
            ('reference', 'First Contributions', 'https://github.com/firstcontributions/first-contributions', 'Friendly open-source starter repo.'),
            ('reference', 'Conventional Commits', 'https://www.conventionalcommits.org/en/v1.0.0/', 'Commit message convention used by many teams.'),
            ('reference', 'Google Engineering Practices', 'https://google.github.io/eng-practices/', 'Code review and engineering practice guidance.'),
            ('tip', 'Ask with context', '', 'Show what you tried, what failed, and the exact question.'),
            ('tip', 'Ship small slices', '', 'Small pull requests get reviewed faster and teach you team habits.'),
        ],
    },
]


BADGES = [
    ('Beginner', 'Created an account and started the roadmap.', '[B]', 0),
    ('Task Crusher', 'Completed at least ten learning tasks.', '[T]', 250),
    ('DSA Master', 'Reached serious DSA practice momentum.', '[D]', 600),
    ('Project Builder', 'Built enough proof to show recruiters.', '[P]', 1000),
    ('Consistency Spark', 'Maintained a three-day streak.', '[S]', 0),
    ('Level Finisher', 'Completed one full SKILLUP level.', '[L]', 0),
    ('Internship Ready', 'Reached the final readiness zone.', '[I]', 1800),
]


DEMO_USERS = [
    ('aarav', 'Aarav Sharma', 'aarav@skillup.dev', 'KGISL Institute of Technology', 360, 2, 4, 'AS'),
    ('priya', 'Priya Nair', 'priya@skillup.dev', 'PSG College of Technology', 980, 4, 8, 'PN'),
    ('rahul', 'Rahul Gupta', 'rahul@skillup.dev', 'SRM University', 1420, 5, 12, 'RG'),
    ('karan', 'Karan Mehta', 'karan@skillup.dev', 'VIT Chennai', 2050, 6, 18, 'KM'),
    ('meera', 'Meera Iyer', 'meera@skillup.dev', 'Anna University', 2480, 7, 21, 'MI'),
]


class Command(BaseCommand):
    help = 'Seed SKILLUP with levels, tasks, resources, badges, and demo users.'

    def handle(self, *args, **options):
        for data in LEVELS:
            tasks = data.pop('tasks')
            resources = data.pop('resources')
            level, _ = Level.objects.update_or_create(number=data['number'], defaults=data)
            level.tasks.all().delete()
            level.resources.all().delete()
            for title, description, xp in tasks:
                LevelTask.objects.create(level=level, title=title, description=description, xp=xp)
            for kind, title, url, description in resources:
                Resource.objects.create(level=level, kind=kind, title=title, url=url, description=description)

        for name, description, icon, xp_required in BADGES:
            Badge.objects.update_or_create(name=name, defaults={'description': description, 'icon': icon, 'xp_required': xp_required})

        for username, full_name, email, college, xp, current_level, streak, avatar in DEMO_USERS:
            user, created = User.objects.get_or_create(username=username, defaults={'email': email, 'first_name': full_name})
            if created:
                user.set_password('password123')
                user.save()
            else:
                user.email = email
                user.first_name = full_name
                user.save(update_fields=['email', 'first_name'])
            Profile.objects.update_or_create(
                user=user,
                defaults={'college': college, 'xp': xp, 'current_level': current_level, 'streak': streak, 'avatar': avatar},
            )
            for level in Level.objects.filter(number__lt=current_level):
                UserLevelProgress.objects.update_or_create(user=user, level=level, defaults={'completed': True})
                for task in level.tasks.all()[:2]:
                    TaskCompletion.objects.get_or_create(user=user, task=task)
            for badge in Badge.objects.filter(xp_required__lte=xp):
                UserBadge.objects.get_or_create(user=user, badge=badge)

        self.stdout.write(self.style.SUCCESS('SKILLUP seed data loaded. Demo password: password123'))
