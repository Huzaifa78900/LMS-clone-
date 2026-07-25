import {
  StudentProfile,
  TeacherProfile,
  Course,
  AcademicRecord,
  UpcomingExam,
  TimetableEntry,
  AttendanceRecord,
  FeeStatement,
  Assignment,
  AssignmentSubmission,
  StudyNote,
  Announcement,
  CalendarEvent,
  ActivityLog,
  TeacherAttendance
} from '../types';

export const initialStudent: StudentProfile = {
  user_id: 'default_student_001',
  name: 'Hassan Raza',
  studentId: 'UG-2024-8842',
  email: 'hassan.raza@nexus.edu',
  program: 'Undergraduate (BS Computer Science)',
  department: 'Computer Science',
  degree: 'BS Computer Science',
  semester: 'Semester 4',
  phone: '+1 (555) 234-5678',
  contactNumber: '+1 (555) 234-5678',
  cgpa: 3.42,
  expectedCredits: 18,
  targetGpa: 3.6,
  earnedCredits: 54,
  attendanceRate: 88,
  enrollmentYear: 2024,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
};

export const initialStudents: StudentProfile[] = [
  initialStudent,
  {
    user_id: 'student_002',
    name: 'Ayesha Khan',
    studentId: 'UG-2024-9102',
    email: 'ayesha.khan@nexus.edu',
    program: 'BS Software Engineering',
    degree: 'BS Software Engineering',
    department: 'Software Engineering',
    semester: 'Semester 4',
    phone: '+1 (555) 321-9876',
    cgpa: 3.88,
    expectedCredits: 18,
    targetGpa: 3.95,
    earnedCredits: 58,
    attendanceRate: 94,
    enrollmentYear: 2024,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
  },
  {
    user_id: 'student_003',
    name: 'Bilal Ahmed',
    studentId: 'UG-2024-7711',
    email: 'bilal.ahmed@nexus.edu',
    program: 'BS Computer Science',
    degree: 'BS Computer Science',
    department: 'Computer Science',
    semester: 'Semester 4',
    phone: '+1 (555) 881-2200',
    cgpa: 2.74,
    expectedCredits: 18,
    targetGpa: 3.2,
    earnedCredits: 48,
    attendanceRate: 68, // At Risk!
    enrollmentYear: 2024,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
  },
  {
    user_id: 'student_004',
    name: 'Zainab Fatima',
    studentId: 'UG-2024-6632',
    email: 'zainab.f@nexus.edu',
    program: 'BS Data Science',
    degree: 'BS Data Science',
    department: 'Data Science',
    semester: 'Semester 4',
    phone: '+1 (555) 441-9922',
    cgpa: 3.92,
    expectedCredits: 18,
    targetGpa: 4.0,
    earnedCredits: 62,
    attendanceRate: 98,
    enrollmentYear: 2024,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250'
  }
];

export const initialTeacher: TeacherProfile = {
  user_id: 'default_teacher_001',
  name: 'Dr. Huzaifa',
  employeeId: 'EMP-8821',
  email: 'huzaifa@nexus.edu',
  department: 'Computer Science',
  designation: 'Associate Professor & CS Chair',
  phone: '+1 (555) 998-1209',
  joiningDate: 'Fall 2020',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  assignedClasses: ['BS Software Engineering Sem 4', 'BS Data Science Sem 3'],
  assignedCourses: ['CS-402', 'CS-301'],
  subjectsTeaching: ['CS-402 Advanced Algorithms', 'CS-301 Software Architecture'],
  pendingAttendanceCount: 1
};

export const initialTeachers: TeacherProfile[] = [
  initialTeacher,
  {
    user_id: 't2',
    name: 'Prof. Alan Turing',
    employeeId: 'EMP-7712',
    email: 'alan.turing@nexus.edu',
    department: 'Computer Science',
    designation: 'Professor',
    phone: '+1 (555) 123-4567',
    joiningDate: 'Fall 2018',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    assignedClasses: ['BS Computer Science Sem 4'],
    assignedCourses: ['DS-201'],
    subjectsTeaching: ['DS-201 Database Management Systems'],
    pendingAttendanceCount: 0
  },
  {
    user_id: 't3',
    name: 'Dr. Geoffrey Hinton',
    employeeId: 'EMP-9901',
    email: 'geoffrey.hinton@nexus.edu',
    department: 'Artificial Intelligence',
    designation: 'Chair of AI Department',
    phone: '+1 (555) 987-6543',
    joiningDate: 'Spring 2021',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    assignedClasses: ['BS AI Sem 4'],
    assignedCourses: ['AI-305'],
    subjectsTeaching: ['AI-305 Neural Networks & ML'],
    pendingAttendanceCount: 0
  }
];

export const initialCourses: Course[] = [
  {
    id: 'c1',
    code: 'CS-402',
    title: 'Advanced Algorithms',
    creditHours: 4,
    department: 'Computer Science',
    semester: 'Semester 4',
    instructor: 'Dr. Sarah Jenkins',
    enrolledCount: 38,
    scheduleTime: 'Mon/Wed 09:00 AM',
    roomNumber: 'Lab 3'
  },
  {
    id: 'c2',
    code: 'DS-201',
    title: 'Database Management Systems',
    creditHours: 4,
    department: 'Computer Science',
    semester: 'Semester 4',
    instructor: 'Prof. Alan Turing',
    enrolledCount: 42,
    scheduleTime: 'Mon/Wed 11:00 AM',
    roomNumber: 'Hall B'
  },
  {
    id: 'c3',
    code: 'AI-305',
    title: 'Neural Networks & ML',
    creditHours: 4,
    department: 'Artificial Intelligence',
    semester: 'Semester 4',
    instructor: 'Dr. Geoffrey Hinton',
    enrolledCount: 35,
    scheduleTime: 'Tue/Thu 10:00 AM',
    roomNumber: 'AI Studio Lab'
  },
  {
    id: 'c4',
    code: 'MA-410',
    title: 'Discrete Mathematics II',
    creditHours: 3,
    department: 'Mathematics',
    semester: 'Semester 4',
    instructor: 'Prof. Katherine Johnson',
    enrolledCount: 40,
    scheduleTime: 'Wed/Fri 01:30 PM',
    roomNumber: 'Room 102'
  }
];

export const initialAcademicRecords: AcademicRecord[] = [
  {
    user_id: 'default_student_001',
    semester: 'Semester 4 (Current)',
    code: 'CS-402',
    title: 'Advanced Algorithms',
    weight: 40,
    marks: 88,
    grade: 'A',
    credits: 4
  },
  {
    user_id: 'default_student_001',
    semester: 'Semester 4 (Current)',
    code: 'DS-201',
    title: 'Database Management Systems',
    weight: 30,
    marks: 76,
    grade: 'B+',
    credits: 4
  },
  {
    user_id: 'default_student_001',
    semester: 'Semester 4 (Current)',
    code: 'AI-305',
    title: 'Neural Networks & ML',
    weight: 40,
    marks: 92,
    grade: 'A+',
    credits: 4
  },
  {
    user_id: 'default_student_001',
    semester: 'Semester 4 (Current)',
    code: 'MA-410',
    title: 'Discrete Mathematics II',
    weight: 30,
    marks: 64,
    grade: 'C+',
    credits: 3
  }
];

export const initialUpcomingExams: UpcomingExam[] = [
  {
    user_id: 'default_student_001',
    title: 'Final Capstone Presentation',
    date: '2026-05-12',
    month: 'MAY',
    dayNumber: 12,
    location: 'L-302 Auditorium',
    time: '09:00 AM',
    courseCode: 'CS-402'
  },
  {
    user_id: 'default_student_001',
    title: 'OS Architecture Final',
    date: '2026-05-15',
    month: 'MAY',
    dayNumber: 15,
    location: 'Virtual Hall B',
    time: '02:00 PM',
    courseCode: 'CS-301'
  },
  {
    user_id: 'default_student_001',
    title: 'Data Ethics Colloquium',
    date: '2026-05-18',
    month: 'MAY',
    dayNumber: 18,
    location: 'Room 405',
    time: '11:30 AM',
    courseCode: 'AI-305'
  }
];

export const initialTimetable: TimetableEntry[] = [
  {
    user_id: 'default_student_001',
    day: 'Monday',
    code: 'CS-402',
    courseCode: 'CS-402',
    title: 'Advanced Algorithms',
    courseTitle: 'Advanced Algorithms',
    time: '09:00 AM - 10:30 AM',
    room: 'Lab 3',
    roomNumber: 'Lab 3',
    instructor: 'Dr. Sarah Jenkins'
  },
  {
    user_id: 'default_student_001',
    day: 'Monday',
    code: 'DS-201',
    courseCode: 'DS-201',
    title: 'Database Systems',
    courseTitle: 'Database Systems',
    time: '11:00 AM - 12:30 PM',
    room: 'Hall B',
    roomNumber: 'Hall B',
    instructor: 'Prof. Alan Turing'
  },
  {
    user_id: 'default_student_001',
    day: 'Tuesday',
    code: 'AI-305',
    courseCode: 'AI-305',
    title: 'Neural Networks & ML',
    courseTitle: 'Neural Networks & ML',
    time: '10:00 AM - 12:00 PM',
    room: 'AI Studio Lab',
    roomNumber: 'AI Studio Lab',
    instructor: 'Dr. Geoffrey Hinton'
  },
  {
    user_id: 'default_student_001',
    day: 'Wednesday',
    code: 'MA-410',
    courseCode: 'MA-410',
    title: 'Discrete Mathematics II',
    courseTitle: 'Discrete Mathematics II',
    time: '01:30 PM - 03:00 PM',
    room: 'Room 102',
    roomNumber: 'Room 102',
    instructor: 'Prof. Katherine Johnson'
  },
  {
    user_id: 'default_student_001',
    day: 'Thursday',
    code: 'CS-402',
    courseCode: 'CS-402',
    title: 'Advanced Algorithms Lab',
    courseTitle: 'Advanced Algorithms Lab',
    time: '02:00 PM - 04:00 PM',
    room: 'Lab 3',
    roomNumber: 'Lab 3',
    instructor: 'Dr. Sarah Jenkins'
  },
  {
    user_id: 'default_student_001',
    day: 'Friday',
    code: 'AI-305',
    courseCode: 'AI-305',
    title: 'Machine Learning Seminar',
    courseTitle: 'Machine Learning Seminar',
    time: '09:30 AM - 11:30 AM',
    room: 'Auditorium A',
    roomNumber: 'Auditorium A',
    instructor: 'Dr. Geoffrey Hinton'
  }
];

export const initialAttendance: AttendanceRecord[] = [
  {
    user_id: 'default_student_001',
    code: 'CS-402',
    title: 'Advanced Algorithms',
    totalClasses: 30,
    attendedClasses: 27
  },
  {
    user_id: 'default_student_001',
    code: 'DS-201',
    title: 'Database Management Systems',
    totalClasses: 28,
    attendedClasses: 19
  },
  {
    user_id: 'default_student_001',
    code: 'AI-305',
    title: 'Neural Networks & ML',
    totalClasses: 32,
    attendedClasses: 31
  },
  {
    user_id: 'default_student_001',
    code: 'MA-410',
    title: 'Discrete Mathematics II',
    totalClasses: 25,
    attendedClasses: 22
  }
];

export const initialFeeStatements: FeeStatement[] = [
  {
    user_id: 'default_student_001',
    semester: 'Semester 4',
    description: 'Undergraduate Tuition Fee - Semester 4',
    amount: 3800,
    dueDate: '2026-02-15',
    status: 'Paid',
    invoiceRef: 'INV-2024-00192'
  },
  {
    user_id: 'default_student_001',
    semester: 'Semester 4',
    description: 'Laboratory & High-Performance Compute Fee',
    amount: 250,
    dueDate: '2026-02-15',
    status: 'Paid',
    invoiceRef: 'INV-2024-00193'
  },
  {
    user_id: 'default_student_001',
    semester: 'Semester 5',
    description: 'Advance Enrollment Deposit - Semester 5',
    amount: 1200,
    dueDate: '2026-08-01',
    status: 'Pending',
    invoiceRef: 'INV-2024-00410'
  }
];

export const initialAssignments: Assignment[] = [
  {
    id: 'asg-1',
    courseCode: 'CS-402',
    title: 'Dynamic Programming & Graph Optimizations',
    description: 'Implement Floyd-Warshall and Bellman-Ford algorithms with time complexity analysis report.',
    dueDate: '2026-05-10',
    totalPoints: 100
  },
  {
    id: 'asg-2',
    courseCode: 'DS-201',
    title: 'B+ Tree Indexing & Transaction Concurrency',
    description: 'Design relational schema with 3NF normalization and write SQL queries for concurrency benchmarks.',
    dueDate: '2026-05-14',
    totalPoints: 50
  },
  {
    id: 'asg-3',
    courseCode: 'AI-305',
    title: 'PyTorch CNN Image Classification',
    description: 'Train a Convolutional Neural Network on CIFAR-10 with data augmentation techniques.',
    dueDate: '2026-05-20',
    totalPoints: 100
  }
];

export const initialSubmissions: AssignmentSubmission[] = [
  {
    id: 'sub-1',
    assignmentId: 'asg-1',
    studentId: 'UG-2024-8842',
    studentName: 'Hassan Raza',
    submittedAt: '2026-05-08 14:30',
    fileName: 'Hassan_Raza_Algorithms_Asg1.pdf',
    fileUrl: '#',
    status: 'Graded',
    score: 95,
    feedback: 'Excellent complexity breakdown and clean code implementation!'
  },
  {
    id: 'sub-2',
    assignmentId: 'asg-2',
    studentId: 'UG-2024-9102',
    studentName: 'Ayesha Khan',
    submittedAt: '2026-05-09 11:15',
    fileName: 'Ayesha_Khan_Database_Indexing.pdf',
    fileUrl: '#',
    status: 'Submitted',
    score: 0,
    feedback: ''
  }
];

export const initialStudyNotes: StudyNote[] = [
  {
    id: 'note-1',
    courseCode: 'CS-402',
    title: 'NP-Completeness & Reductions',
    description: 'Lecture slides covering 3-SAT to Graph Coloring reductions.',
    uploadedAt: '2026-04-18',
    fileSize: '4.2 MB',
    fileUrl: '#',
    uploadedBy: 'Dr. Sarah Jenkins'
  },
  {
    id: 'note-2',
    courseCode: 'DS-201',
    title: 'ACID Transactions & Two-Phase Locking',
    description: 'Comprehensive guide to isolation levels and deadlock detection.',
    uploadedAt: '2026-04-21',
    fileSize: '2.8 MB',
    fileUrl: '#',
    uploadedBy: 'Prof. Alan Turing'
  },
  {
    id: 'note-3',
    courseCode: 'AI-305',
    title: 'Backpropagation Mathematical Derivation',
    description: 'Step-by-step calculus derivations for multi-layer perceptron gradients.',
    uploadedAt: '2026-04-24',
    fileSize: '5.1 MB',
    fileUrl: '#',
    uploadedBy: 'Dr. Geoffrey Hinton'
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Mid-Term Exam Schedule & Room Allocations Released',
    message: 'The official Spring 2026 Mid-Term examination dates and hall allocations are now live on the student portal.',
    targetClass: 'All Enrolled Classes',
    createdAt: '2026-04-28 09:00',
    author: 'Dean Vance (Admin)'
  },
  {
    id: 'ann-2',
    title: 'CS-402 Assignment 1 Deadline Extended',
    message: 'Due to upcoming Hackathon events, the deadline for DP & Graph Optimizations has been moved to May 10th.',
    targetClass: 'CS-402',
    createdAt: '2026-04-26 11:15',
    author: 'Dr. Sarah Jenkins'
  },
  {
    id: 'ann-3',
    title: 'Annual Tech Symposium 2026 Registration Open',
    message: 'Join workshops on Quantum Computing and AI Ethics. Register before May 15th to secure your badge.',
    targetClass: 'All Enrolled Classes',
    createdAt: '2026-04-24 16:40',
    author: 'University Admin Council'
  }
];

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Spring Mid-Term Exams',
    category: 'Exam',
    date: '2026-05-12',
    time: '09:00 AM',
    location: 'Main Exam Block',
    description: 'Departmental Midterm Exams for CS, SE, and AI'
  },
  {
    id: 'ev-2',
    title: 'Memorial Holiday - University Closed',
    category: 'Holiday',
    date: '2026-05-25',
    time: 'All Day',
    location: 'Campus Wide',
    description: 'Gazetted University Holiday'
  },
  {
    id: 'ev-3',
    title: 'CS-402 Final Assignment Deadline',
    category: 'Deadline',
    date: '2026-05-10',
    time: '11:59 PM',
    location: 'Online Portal',
    description: 'Dynamic Programming & Graph Optimizations Submission'
  },
  {
    id: 'ev-4',
    title: 'Annual Robotics Showcase & Job Fair',
    category: 'Event',
    date: '2026-06-02',
    time: '10:00 AM',
    location: 'University Gymnasium',
    description: 'Industry hiring partners and senior project presentations'
  }
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-04-28 10:45 AM',
    user: 'Dr. Sarah Jenkins',
    action: 'Attendance Updated',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'log-2',
    timestamp: '2026-04-28 09:12 AM',
    user: 'Dean Vance (Admin)',
    action: 'Fee Invoice Issued',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'log-3',
    timestamp: '2026-04-27 04:30 PM',
    user: 'Hassan Raza',
    action: 'Assignment Submitted',
    ipAddress: '192.168.1.210'
  },
  {
    id: 'log-4',
    timestamp: '2026-04-27 02:15 PM',
    user: 'Prof. Alan Turing',
    action: 'Marks Graded',
    ipAddress: '192.168.1.112'
  }
];

export const initialTeacherAttendance: TeacherAttendance[] = [
  {
    id: 'ta-1',
    teacherName: 'Dr. Sarah Jenkins',
    date: '2026-04-28',
    status: 'Present',
    punchIn: '08:45 AM',
    punchOut: '05:00 PM'
  },
  {
    id: 'ta-2',
    teacherName: 'Prof. Alan Turing',
    date: '2026-04-28',
    status: 'Present',
    punchIn: '08:52 AM',
    punchOut: '05:15 PM'
  },
  {
    id: 'ta-3',
    teacherName: 'Dr. Geoffrey Hinton',
    date: '2026-04-28',
    status: 'Leave',
    punchIn: '',
    punchOut: ''
  }
];
