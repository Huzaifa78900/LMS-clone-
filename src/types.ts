export type ViewMode =
  | 'dashboard'
  | 'timetable'
  | 'attendance'
  | 'courses'
  | 'assignments'
  | 'study_notes'
  | 'notifications'
  | 'fees'
  | 'settings'
  // Teacher views
  | 'teacher_dashboard'
  | 'teacher_classes'
  | 'teacher_attendance'
  | 'teacher_marks'
  | 'teacher_notes'
  | 'teacher_timetable'
  | 'teacher_personal_attendance'
  | 'teacher_assignments'
  | 'teacher_announcements'
  | 'teacher_analytics'
  // Admin views
  | 'admin_dashboard'
  | 'admin_students'
  | 'admin_teachers'
  | 'admin_fees'
  | 'admin_attendance'
  | 'admin_courses'
  | 'admin_calendar'
  | 'admin_roles'
  | 'admin_activity'
  | 'admin_reports';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface AppUser {
  uid: string;
  name?: string;
  displayName?: string;
  email: string;
  role: UserRole;
  department?: string;
  studentId?: string;
  employeeId?: string;
  avatarUrl?: string;
}

export interface StudentProfile {
  id?: string;
  user_id: string;
  name: string;
  studentId: string;
  email: string;
  program?: string;
  degree?: string;
  department?: string;
  semester?: string;
  contactNumber?: string;
  phone?: string;
  cgpa: number;
  expectedCredits?: number;
  targetGpa?: number;
  avatarUrl: string;
  earnedCredits?: number;
  attendanceRate?: number;
  enrollmentYear?: number;
}

export interface TeacherProfile {
  id?: string;
  user_id: string;
  name: string;
  employeeId: string;
  email: string;
  department: string;
  designation: string;
  phone?: string;
  joiningDate?: string;
  avatarUrl: string;
  assignedClasses?: string[];
  assignedCourses?: string[];
  subjectsTeaching?: string[];
  pendingAttendanceCount?: number;
}

export interface Course {
  id?: string;
  code: string;
  title: string;
  credits?: number;
  creditHours?: number;
  department: string;
  semester: string;
  instructor: string;
  teacherId?: string;
  weight?: number;
  enrolledCount?: number;
  scheduleTime?: string;
  roomNumber?: string;
}

export interface AcademicRecord {
  id?: string;
  user_id?: string;
  semester: string;
  code?: string;
  courseCode?: string;
  title?: string;
  courseTitle?: string;
  weight?: number; // percentage e.g. 40
  marks?: number;  // 0-100
  marksObtained?: number;
  totalMarks?: number;
  grade?: string;  // e.g. A+, A, B+, C+
  gradeLetter?: string;
  gradePoint?: number;
  credits?: number;
}

export interface UpcomingExam {
  id?: string;
  user_id: string;
  title: string;
  date: string;       // e.g. "2026-05-12"
  month: string;      // e.g. "MAY"
  dayNumber: number;  // e.g. 12
  location: string;   // e.g. "L-302 Auditorium"
  time: string;       // e.g. "09:00 AM"
  courseCode?: string;
}

export interface TimetableEntry {
  id?: string;
  user_id?: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  code?: string;
  courseCode?: string;
  title?: string;
  courseTitle?: string;
  time: string;
  room?: string;
  roomNumber?: string;
  instructor: string;
}

export interface AttendanceRecord {
  id?: string;
  user_id: string;
  code: string;
  title: string;
  totalClasses: number;
  attendedClasses: number;
}

export interface FeeStatement {
  id?: string;
  user_id: string;
  term?: string;
  semester?: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  invoiceRef: string;
}

export interface Assignment {
  id?: string;
  courseCode: string;
  courseTitle?: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  createdByTeacherId?: string;
  createdAt?: string;
}

export interface AssignmentSubmission {
  id?: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  fileName: string;
  fileUrl?: string;
  content?: string;
  status: 'Submitted' | 'Graded' | 'Pending';
  score?: number;
  feedback?: string;
}

export interface StudyNote {
  id?: string;
  courseCode: string;
  title?: string;
  topic?: string;
  description: string;
  uploadDate?: string;
  uploadedAt?: string;
  fileSize?: string;
  fileUrl: string;
  fileName?: string;
  uploadedBy: string;
}

export interface Announcement {
  id?: string;
  title: string;
  message: string;
  targetClass: string;
  targetRole?: 'all' | 'students' | 'teachers';
  createdAt: string;
  author: string;
  authorRole?: 'teacher' | 'admin';
}

export interface NotificationItem {
  id: string;
  type: 'exam' | 'fee' | 'announcement' | 'event' | 'assignment';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface CalendarEvent {
  id?: string;
  title: string;
  type?: 'exam' | 'holiday' | 'event' | 'deadline';
  category?: 'Exam' | 'Holiday' | 'Event' | 'Deadline';
  date: string;
  time?: string;
  location?: string;
  description?: string;
  courseCode?: string;
}

export interface ActivityLog {
  id?: string;
  timestamp: string;
  user: string;
  role?: UserRole;
  action: string;
  details?: string;
  ipAddress?: string;
}

export interface TeacherAttendance {
  id?: string;
  teacherId?: string;
  teacherName: string;
  date?: string;
  month?: string;
  totalWorkingDays?: number;
  presentDays?: number;
  leaveDays?: number;
  status: 'Present' | 'Leave' | 'On Duty';
  punchIn?: string;
  punchOut?: string;
  lastUpdated?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
