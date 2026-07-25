import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';

import firebaseConfig from '../../firebase-applet-config.json';
import {
  initialStudent,
  initialTeacher,
  initialCourses,
  initialAcademicRecords,
  initialUpcomingExams,
  initialTimetable,
  initialAttendance,
  initialFeeStatements,
  initialAssignments,
  initialSubmissions,
  initialStudyNotes,
  initialAnnouncements,
  initialCalendarEvents,
  initialActivityLogs,
  initialTeacherAttendance
} from '../data/initialData';
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
  TeacherAttendance,
  AppUser
} from '../types';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

let currentUser: User | null = null;

// Ensure Anonymous Auth for Firestore Rules
export async function initAuth(): Promise<User> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUser = user;
        unsubscribe();
        resolve(user);
      } else {
        try {
          const userCred = await signInAnonymously(auth);
          currentUser = userCred.user;
          unsubscribe();
          resolve(userCred.user);
        } catch (err) {
          console.warn('Anonymous auth fallback or error:', err);
          unsubscribe();
          reject(err);
        }
      }
    });
  });
}

// User role management
export async function getUserRole(uid: string): Promise<AppUser | null> {
  try {
    const docRef = doc(db, 'users', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { uid: snap.id, ...snap.data() } as AppUser;
    }
  } catch (e) {
    console.warn('Error fetching user role:', e);
  }
  return null;
}

export async function setUserRole(userData: AppUser): Promise<void> {
  try {
    const docRef = doc(db, 'users', userData.uid);
    await setDoc(docRef, userData, { merge: true });
  } catch (e) {
    console.warn('Error setting user role:', e);
  }
}

// Ensure Student Profile
export async function getStudentProfile(targetUserId?: string): Promise<StudentProfile> {
  try {
    await initAuth();
    const userId = targetUserId || currentUser?.uid || 'default_student_001';
    const docRef = doc(db, 'students', userId);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as StudentProfile;
    } else {
      const newProfile: StudentProfile = {
        ...initialStudent,
        user_id: userId
      };
      await setDoc(docRef, newProfile);
      return newProfile;
    }
  } catch (e) {
    console.warn('Firestore fetch student profile error, using initial dataset:', e);
    return initialStudent;
  }
}

export async function getAllStudents(): Promise<StudentProfile[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'students');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      await setDoc(doc(db, 'students', 'default_student_001'), initialStudent);
      return [initialStudent];
    }
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudentProfile));
  } catch (e) {
    console.warn('Error getting all students:', e);
    return [initialStudent];
  }
}
export const getStudents = getAllStudents;

export async function updateStudentProfile(profile: Partial<StudentProfile>, targetUserId?: string): Promise<void> {
  try {
    await initAuth();
    const userId = targetUserId || profile.user_id || currentUser?.uid || 'default_student_001';
    const docRef = doc(db, 'students', userId);
    await setDoc(docRef, profile, { merge: true });
  } catch (e) {
    console.warn('Failed to update student profile in Firestore:', e);
  }
}

export async function addStudent(studentData: Omit<StudentProfile, 'id'>): Promise<StudentProfile> {
  try {
    await initAuth();
    const docRef = doc(db, 'students', studentData.user_id);
    await setDoc(docRef, studentData);
    return { id: studentData.user_id, ...studentData };
  } catch (e) {
    console.warn('Failed to add student:', e);
    return { id: studentData.user_id, ...studentData };
  }
}
export const addStudentProfile = addStudent;

// Teacher Profile
export async function getTeacherProfile(targetUserId?: string): Promise<TeacherProfile> {
  try {
    await initAuth();
    const userId = targetUserId || currentUser?.uid || 'default_teacher_001';
    const docRef = doc(db, 'teachers', userId);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as TeacherProfile;
    } else {
      const newProfile: TeacherProfile = {
        ...initialTeacher,
        user_id: userId
      };
      await setDoc(docRef, newProfile);
      return newProfile;
    }
  } catch (e) {
    console.warn('Error fetching teacher profile:', e);
    return initialTeacher;
  }
}

export async function getAllTeachers(): Promise<TeacherProfile[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'teachers');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      await setDoc(doc(db, 'teachers', 'default_teacher_001'), initialTeacher);
      return [initialTeacher];
    }
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeacherProfile));
  } catch (e) {
    console.warn('Error getting all teachers:', e);
    return [initialTeacher];
  }
}
export const getTeachers = getAllTeachers;

export async function addTeacher(teacherData: Omit<TeacherProfile, 'id'>): Promise<TeacherProfile> {
  try {
    await initAuth();
    const docRef = doc(db, 'teachers', teacherData.user_id);
    await setDoc(docRef, teacherData);
    return { id: teacherData.user_id, ...teacherData };
  } catch (e) {
    console.warn('Failed to add teacher:', e);
    return { id: teacherData.user_id, ...teacherData };
  }
}

// Courses
export async function getCourses(): Promise<Course[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'courses');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      const seeded: Course[] = [];
      for (const c of initialCourses) {
        const docRef = await addDoc(colRef, c);
        seeded.push({ ...c, id: docRef.id });
      }
      return seeded;
    }
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
  } catch (e) {
    console.warn('Error fetching courses:', e);
    return initialCourses;
  }
}

export async function addCourse(courseData: Omit<Course, 'id'>): Promise<Course> {
  try {
    await initAuth();
    const colRef = collection(db, 'courses');
    const docRef = await addDoc(colRef, courseData);
    return { id: docRef.id, ...courseData };
  } catch (e) {
    console.warn('Failed to add course:', e);
    return { id: `local_${Date.now()}`, ...courseData };
  }
}

// Academic Records
export async function getAcademicRecords(semesterFilter?: string): Promise<AcademicRecord[]> {
  try {
    await initAuth();
    const userId = currentUser?.uid || 'default_student_001';
    const colRef = collection(db, 'academic_records');
    const snap = await getDocs(colRef);

    if (snap.empty) {
      const seeded: AcademicRecord[] = [];
      for (const rec of initialAcademicRecords) {
        const docRef = await addDoc(colRef, { ...rec, user_id: userId });
        seeded.push({ ...rec, id: docRef.id, user_id: userId });
      }
      return semesterFilter ? seeded.filter(r => r.semester === semesterFilter) : seeded;
    }

    const records = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as AcademicRecord));
    return semesterFilter ? records.filter(r => r.semester === semesterFilter) : records;
  } catch (e) {
    console.warn('Firestore getAcademicRecords error:', e);
    return semesterFilter ? initialAcademicRecords.filter(r => r.semester === semesterFilter) : initialAcademicRecords;
  }
}

export async function addAcademicRecord(record: Omit<AcademicRecord, 'id'>): Promise<AcademicRecord> {
  try {
    await initAuth();
    const userId = record.user_id || currentUser?.uid || 'default_student_001';
    const colRef = collection(db, 'academic_records');
    const newDoc = { ...record, user_id: userId };
    const docRef = await addDoc(colRef, newDoc);
    return { id: docRef.id, ...newDoc };
  } catch (e) {
    console.warn('Failed to add academic record:', e);
    return { id: `local_${Date.now()}`, user_id: record.user_id || 'default_student_001', ...record };
  }
}

export async function updateAcademicRecord(id: string, recordData: Partial<AcademicRecord>): Promise<void> {
  try {
    await initAuth();
    const docRef = doc(db, 'academic_records', id);
    await updateDoc(docRef, recordData);
  } catch (e) {
    console.warn('Failed to update academic record:', e);
  }
}

// Upcoming Exams
export async function getUpcomingExams(): Promise<UpcomingExam[]> {
  try {
    await initAuth();
    const userId = currentUser?.uid || 'default_student_001';
    const colRef = collection(db, 'upcoming_exams');
    const snap = await getDocs(colRef);

    if (snap.empty) {
      const seeded: UpcomingExam[] = [];
      for (const exam of initialUpcomingExams) {
        const docRef = await addDoc(colRef, { ...exam, user_id: userId });
        seeded.push({ ...exam, id: docRef.id, user_id: userId });
      }
      return seeded;
    }

    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as UpcomingExam));
  } catch (e) {
    console.warn('Firestore getUpcomingExams error:', e);
    return initialUpcomingExams;
  }
}

export async function addUpcomingExam(exam: Omit<UpcomingExam, 'id' | 'user_id'>): Promise<UpcomingExam> {
  try {
    await initAuth();
    const userId = currentUser?.uid || 'default_student_001';
    const colRef = collection(db, 'upcoming_exams');
    const newDoc = { ...exam, user_id: userId };
    const docRef = await addDoc(colRef, newDoc);
    return { id: docRef.id, ...newDoc };
  } catch (e) {
    console.warn('Failed to add upcoming exam:', e);
    return { id: `local_${Date.now()}`, user_id: 'default_student_001', ...exam };
  }
}

// Timetable
export async function getTimetable(): Promise<TimetableEntry[]> {
  try {
    await initAuth();
    const userId = currentUser?.uid || 'default_student_001';
    const colRef = collection(db, 'timetable');
    const snap = await getDocs(colRef);

    if (snap.empty) {
      const seeded: TimetableEntry[] = [];
      for (const item of initialTimetable) {
        const docRef = await addDoc(colRef, { ...item, user_id: userId });
        seeded.push({ ...item, id: docRef.id, user_id: userId });
      }
      return seeded;
    }

    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as TimetableEntry));
  } catch (e) {
    console.warn('Firestore getTimetable error:', e);
    return initialTimetable;
  }
}

// Attendance Records
export async function getAttendanceRecords(): Promise<AttendanceRecord[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'attendance_records');
    const snap = await getDocs(colRef);

    if (snap.empty) {
      const seeded: AttendanceRecord[] = [];
      for (const item of initialAttendance) {
        const docRef = await addDoc(colRef, { ...item, user_id: 'default_student_001' });
        seeded.push({ ...item, id: docRef.id, user_id: 'default_student_001' });
      }
      return seeded;
    }

    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as AttendanceRecord));
  } catch (e) {
    console.warn('Firestore getAttendanceRecords error:', e);
    return initialAttendance;
  }
}

export async function updateAttendanceRecord(id: string, data: Partial<AttendanceRecord>): Promise<void> {
  try {
    await initAuth();
    const docRef = doc(db, 'attendance_records', id);
    await updateDoc(docRef, data);
  } catch (e) {
    console.warn('Failed to update attendance record:', e);
  }
}

export async function addAttendanceRecord(data: Omit<AttendanceRecord, 'id'>): Promise<AttendanceRecord> {
  try {
    await initAuth();
    const colRef = collection(db, 'attendance_records');
    const docRef = await addDoc(colRef, data);
    return { id: docRef.id, ...data };
  } catch (e) {
    console.warn('Failed to add attendance record:', e);
    return { id: `local_${Date.now()}`, ...data };
  }
}

// Fee Statements
export async function getFeeStatements(): Promise<FeeStatement[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'fee_statements');
    const snap = await getDocs(colRef);

    if (snap.empty) {
      const seeded: FeeStatement[] = [];
      for (const item of initialFeeStatements) {
        const docRef = await addDoc(colRef, { ...item, user_id: 'default_student_001' });
        seeded.push({ ...item, id: docRef.id, user_id: 'default_student_001' });
      }
      return seeded;
    }

    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as FeeStatement));
  } catch (e) {
    console.warn('Firestore getFeeStatements error:', e);
    return initialFeeStatements;
  }
}

export async function addFeeStatement(data: Omit<FeeStatement, 'id'>): Promise<FeeStatement> {
  try {
    await initAuth();
    const colRef = collection(db, 'fee_statements');
    const docRef = await addDoc(colRef, data);
    return { id: docRef.id, ...data };
  } catch (e) {
    console.warn('Failed to add fee statement:', e);
    return { id: `local_${Date.now()}`, ...data };
  }
}

export async function updateFeeStatus(invoiceRef: string, status: 'Paid' | 'Pending' | 'Overdue'): Promise<void> {
  try {
    await initAuth();
    const colRef = collection(db, 'fee_statements');
    const q = query(colRef, where('invoiceRef', '==', invoiceRef));
    const snap = await getDocs(q);
    snap.forEach(async (d) => {
      await updateDoc(doc(db, 'fee_statements', d.id), { status });
    });
  } catch (e) {
    console.warn('Failed to update fee status:', e);
  }
}

// Assignments
export async function getAssignments(): Promise<Assignment[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'assignments');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      const seeded: Assignment[] = [];
      for (const a of initialAssignments) {
        const docRef = await addDoc(colRef, a);
        seeded.push({ ...a, id: docRef.id });
      }
      return seeded;
    }
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Assignment));
  } catch (e) {
    console.warn('Error fetching assignments:', e);
    return initialAssignments;
  }
}

export async function addAssignment(assignmentData: Omit<Assignment, 'id'>): Promise<Assignment> {
  try {
    await initAuth();
    const colRef = collection(db, 'assignments');
    const docRef = await addDoc(colRef, assignmentData);
    return { id: docRef.id, ...assignmentData };
  } catch (e) {
    console.warn('Failed to add assignment:', e);
    return { id: `local_${Date.now()}`, ...assignmentData };
  }
}

// Submissions
export async function getSubmissions(assignmentId?: string): Promise<AssignmentSubmission[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'submissions');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      const seeded: AssignmentSubmission[] = [];
      for (const s of initialSubmissions) {
        const docRef = await addDoc(colRef, s);
        seeded.push({ ...s, id: docRef.id });
      }
      return assignmentId ? seeded.filter(s => s.assignmentId === assignmentId) : seeded;
    }
    const all = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as AssignmentSubmission));
    return assignmentId ? all.filter(s => s.assignmentId === assignmentId) : all;
  } catch (e) {
    console.warn('Error fetching submissions:', e);
    return assignmentId ? initialSubmissions.filter(s => s.assignmentId === assignmentId) : initialSubmissions;
  }
}

export async function addSubmission(subData: Omit<AssignmentSubmission, 'id'>): Promise<AssignmentSubmission> {
  try {
    await initAuth();
    const colRef = collection(db, 'submissions');
    const docRef = await addDoc(colRef, subData);
    return { id: docRef.id, ...subData };
  } catch (e) {
    console.warn('Failed to add submission:', e);
    return { id: `local_${Date.now()}`, ...subData };
  }
}

export async function gradeSubmission(submissionId: string, score: number, feedback: string): Promise<void> {
  try {
    await initAuth();
    const docRef = doc(db, 'submissions', submissionId);
    await updateDoc(docRef, { score, feedback, status: 'Graded' });
  } catch (e) {
    console.warn('Failed to grade submission:', e);
  }
}

// Study Notes
export async function getStudyNotes(): Promise<StudyNote[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'notes');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      const seeded: StudyNote[] = [];
      for (const n of initialStudyNotes) {
        const docRef = await addDoc(colRef, n);
        seeded.push({ ...n, id: docRef.id });
      }
      return seeded;
    }
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudyNote));
  } catch (e) {
    console.warn('Error fetching notes:', e);
    return initialStudyNotes;
  }
}

export async function addStudyNote(noteData: Omit<StudyNote, 'id'>): Promise<StudyNote> {
  try {
    await initAuth();
    const colRef = collection(db, 'notes');
    const docRef = await addDoc(colRef, noteData);
    return { id: docRef.id, ...noteData };
  } catch (e) {
    console.warn('Failed to add study note:', e);
    return { id: `local_${Date.now()}`, ...noteData };
  }
}

// Announcements
export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'announcements');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      const seeded: Announcement[] = [];
      for (const a of initialAnnouncements) {
        const docRef = await addDoc(colRef, a);
        seeded.push({ ...a, id: docRef.id });
      }
      return seeded;
    }
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
  } catch (e) {
    console.warn('Error fetching announcements:', e);
    return initialAnnouncements;
  }
}

export async function addAnnouncement(annData: Omit<Announcement, 'id'>): Promise<Announcement> {
  try {
    await initAuth();
    const colRef = collection(db, 'announcements');
    const docRef = await addDoc(colRef, annData);
    return { id: docRef.id, ...annData };
  } catch (e) {
    console.warn('Failed to add announcement:', e);
    return { id: `local_${Date.now()}`, ...annData };
  }
}

// Calendar Events
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'calendar_events');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      const seeded: CalendarEvent[] = [];
      for (const ev of initialCalendarEvents) {
        const docRef = await addDoc(colRef, ev);
        seeded.push({ ...ev, id: docRef.id });
      }
      return seeded;
    }
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as CalendarEvent));
  } catch (e) {
    console.warn('Error fetching calendar events:', e);
    return initialCalendarEvents;
  }
}

export async function addCalendarEvent(evData: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
  try {
    await initAuth();
    const colRef = collection(db, 'calendar_events');
    const docRef = await addDoc(colRef, evData);
    return { id: docRef.id, ...evData };
  } catch (e) {
    console.warn('Failed to add calendar event:', e);
    return { id: `local_${Date.now()}`, ...evData };
  }
}

// Activity Logs
export async function getActivityLogs(): Promise<ActivityLog[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'activity_logs');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      const seeded: ActivityLog[] = [];
      for (const l of initialActivityLogs) {
        const docRef = await addDoc(colRef, l);
        seeded.push({ ...l, id: docRef.id });
      }
      return seeded;
    }
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ActivityLog));
  } catch (e) {
    console.warn('Error fetching activity logs:', e);
    return initialActivityLogs;
  }
}

export async function addActivityLog(logData: Omit<ActivityLog, 'id'>): Promise<ActivityLog> {
  try {
    await initAuth();
    const colRef = collection(db, 'activity_logs');
    const docRef = await addDoc(colRef, logData);
    return { id: docRef.id, ...logData };
  } catch (e) {
    console.warn('Failed to add activity log:', e);
    return { id: `local_${Date.now()}`, ...logData };
  }
}

// Teacher Attendance
export async function getTeacherAttendance(): Promise<TeacherAttendance[]> {
  try {
    await initAuth();
    const colRef = collection(db, 'teacher_attendance');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      const seeded: TeacherAttendance[] = [];
      for (const ta of initialTeacherAttendance) {
        const docRef = await addDoc(colRef, ta);
        seeded.push({ ...ta, id: docRef.id });
      }
      return seeded;
    }
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeacherAttendance));
  } catch (e) {
    console.warn('Error fetching teacher attendance:', e);
    return initialTeacherAttendance;
  }
}

export async function addTeacherAttendance(taData: Omit<TeacherAttendance, 'id'>): Promise<TeacherAttendance> {
  try {
    await initAuth();
    const colRef = collection(db, 'teacher_attendance');
    const docRef = await addDoc(colRef, taData);
    return { id: docRef.id, ...taData };
  } catch (e) {
    console.warn('Failed to add teacher attendance:', e);
    return { id: `local_${Date.now()}`, ...taData };
  }
}

