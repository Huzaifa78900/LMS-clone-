import React, { useState, useEffect } from 'react';
import {
  ViewMode,
  UserRole,
  AppUser,
  StudentProfile,
  TeacherProfile,
  AcademicRecord,
  UpcomingExam,
  TimetableEntry,
  AttendanceRecord,
  FeeStatement,
  Course,
  Assignment,
  AssignmentSubmission,
  StudyNote,
  Announcement,
  CalendarEvent,
  ActivityLog,
  TeacherAttendance
} from './types';
import {
  getStudentProfile,
  updateStudentProfile,
  getAcademicRecords,
  addAcademicRecord,
  getUpcomingExams,
  addUpcomingExam,
  getTimetable,
  getAttendanceRecords,
  getFeeStatements,
  addFeeStatement,
  updateFeeStatus,
  getTeachers,
  addTeacher,
  getCourses,
  addCourse,
  getAssignments,
  addAssignment,
  getSubmissions,
  addSubmission,
  gradeSubmission,
  getStudyNotes,
  addStudyNote,
  getAnnouncements,
  addAnnouncement,
  getCalendarEvents,
  addCalendarEvent,
  getActivityLogs,
  addActivityLog,
  getTeacherAttendance,
  addTeacherAttendance,
  getStudents,
  addStudentProfile
} from './lib/firebase';
import { initialTeachers, initialCourses, initialAssignments, initialSubmissions, initialStudyNotes, initialAnnouncements, initialCalendarEvents, initialActivityLogs, initialTeacherAttendance, initialStudents } from './data/initialData';

// Component Imports
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

// Student Portal Views
import { DashboardView } from './components/DashboardView';
import { TimetableMode } from './components/TimetableMode';
import { AttendanceMode } from './components/AttendanceMode';
import { CoursesMode } from './components/CoursesMode';
import { AssignmentsMode } from './components/student/AssignmentsMode';
import { StudyNotesMode } from './components/student/StudyNotesMode';
import { NotificationCenter } from './components/student/NotificationCenter';
import { FeesMode } from './components/FeesMode';
import { SettingsMode } from './components/SettingsMode';

// Teacher Portal Views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { ClassManagement } from './components/teacher/ClassManagement';
import { AttendanceManagement } from './components/teacher/AttendanceManagement';
import { MarksManagement } from './components/teacher/MarksManagement';
import { TeacherAssignments } from './components/teacher/TeacherAssignments';
import { NotesUpload } from './components/teacher/NotesUpload';
import { TeacherAnnouncements } from './components/teacher/TeacherAnnouncements';
import { TeacherTimetable } from './components/teacher/TeacherTimetable';
import { TeacherPersonalAttendance } from './components/teacher/TeacherPersonalAttendance';
import { StudentAnalytics } from './components/teacher/StudentAnalytics';

// Admin Portal Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentManagement } from './components/admin/StudentManagement';
import { TeacherManagement } from './components/admin/TeacherManagement';
import { AdminFeeManagement } from './components/admin/AdminFeeManagement';
import { AdminAttendanceMonitoring } from './components/admin/AdminAttendanceMonitoring';
import { CourseManagement } from './components/admin/CourseManagement';
import { UniversityCalendar } from './components/admin/UniversityCalendar';
import { RolePermissions } from './components/admin/RolePermissions';
import { ActivityLogs } from './components/admin/ActivityLogs';
import { ReportGenerator } from './components/admin/ReportGenerator';

// Modals
import { TranscriptModal } from './components/TranscriptModal';
import { RetakeModal } from './components/RetakeModal';
import { AddGradeModal } from './components/AddGradeModal';
import { SupportBotModal } from './components/SupportBotModal';

export default function App() {
  // Authentication & Role State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<AppUser>({
    uid: 'demo_user_001',
    email: 'amna.ahmed@nexus.edu',
    displayName: 'Amna',
    role: 'student'
  });
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Primary Collections State
  const [student, setStudent] = useState<StudentProfile>(initialStudents[0]);
  const [students, setStudentsList] = useState<StudentProfile[]>(initialStudents);
  const [teachers, setTeachersList] = useState<TeacherProfile[]>(initialTeachers);
  const [courses, setCoursesList] = useState<Course[]>(initialCourses);
  const [assignments, setAssignmentsList] = useState<Assignment[]>(initialAssignments);
  const [submissions, setSubmissionsList] = useState<AssignmentSubmission[]>(initialSubmissions);
  const [studyNotes, setStudyNotesList] = useState<StudyNote[]>(initialStudyNotes);
  const [announcements, setAnnouncementsList] = useState<Announcement[]>(initialAnnouncements);
  const [calendarEvents, setCalendarEventsList] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [activityLogs, setActivityLogsList] = useState<ActivityLog[]>(initialActivityLogs);
  const [teacherAttendance, setTeacherAttendanceList] = useState<TeacherAttendance[]>(initialTeacherAttendance);

  const [records, setRecords] = useState<AcademicRecord[]>([]);
  const [exams, setExams] = useState<UpcomingExam[]>([]);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [feeStatements, setFeeStatements] = useState<FeeStatement[]>([]);

  // Modals state
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isRetakeOpen, setIsRetakeOpen] = useState(false);
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);

  // Sync data on startup with Firebase
  useEffect(() => {
    async function loadData() {
      try {
        const profile = await getStudentProfile();
        if (profile) setStudent(profile);

        const allStus = await getStudents();
        if (allStus.length > 0) setStudentsList(allStus);

        const recs = await getAcademicRecords();
        if (recs.length > 0) setRecords(recs);

        const exms = await getUpcomingExams();
        if (exms.length > 0) setExams(exms);

        const tt = await getTimetable();
        if (tt.length > 0) setTimetable(tt);

        const att = await getAttendanceRecords();
        if (att.length > 0) setAttendance(att);

        const fees = await getFeeStatements();
        if (fees.length > 0) setFeeStatements(fees);

        const tchrs = await getTeachers();
        if (tchrs.length > 0) setTeachersList(tchrs);

        const crss = await getCourses();
        if (crss.length > 0) setCoursesList(crss);

        const assgns = await getAssignments();
        if (assgns.length > 0) setAssignmentsList(assgns);

        const subs = await getSubmissions();
        if (subs.length > 0) setSubmissionsList(subs);

        const notes = await getStudyNotes();
        if (notes.length > 0) setStudyNotesList(notes);

        const anns = await getAnnouncements();
        if (anns.length > 0) setAnnouncementsList(anns);

        const evts = await getCalendarEvents();
        if (evts.length > 0) setCalendarEventsList(evts);

        const logs = await getActivityLogs();
        if (logs.length > 0) setActivityLogsList(logs);

        const tAtt = await getTeacherAttendance();
        if (tAtt.length > 0) setTeacherAttendanceList(tAtt);
      } catch (err) {
        console.warn('Firebase data sync fallback to local initial state:', err);
      }
    }
    loadData();
  }, []);

  // Login Handler
  const handleLoginSuccess = (user: AppUser) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    // Set default initial view based on role
    if (user.role === 'teacher') {
      setCurrentView('teacher_dashboard');
    } else if (user.role === 'admin') {
      setCurrentView('admin_dashboard');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Filter records/exams by top search query
  const filteredRecords = searchQuery.trim()
    ? records.filter(
        (r) =>
          r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.grade.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : records;

  const filteredExams = searchQuery.trim()
    ? exams.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : exams;

  // Handlers for Student
  const handleAddGrade = async (newRec: Omit<AcademicRecord, 'id' | 'user_id'>) => {
    const saved = await addAcademicRecord({
      ...newRec,
      user_id: student.user_id,
      code: newRec.code || 'CS-402',
      title: newRec.title || 'Academic Course',
      weight: newRec.weight || 40,
      marks: newRec.marks || 80,
      grade: newRec.grade || 'A',
      credits: newRec.credits || 4
    });
    setRecords((prev) => [saved, ...prev]);

    const totalMarks = [...records, saved].reduce((sum, item) => sum + item.marks, 0);
    const avgMarks = totalMarks / (records.length + 1);
    const newGpa = Number((avgMarks / 25).toFixed(2));

    const updated = { ...student, cgpa: Math.min(newGpa, 4.0) };
    setStudent(updated);
    await updateStudentProfile(updated);
  };

  const handleUpdateStudentTarget = async (cgpa: number, expectedCredits: number, targetGpa: number) => {
    const updated = { ...student, cgpa, expectedCredits, targetGpa };
    setStudent(updated);
    await updateStudentProfile(updated);
  };

  const handleRegisterRetakeSuccess = async (courseCode: string) => {
    const retakeExam: Omit<UpcomingExam, 'id' | 'user_id'> = {
      title: `${courseCode} Retake Examination`,
      date: '2026-06-15',
      month: 'JUN',
      dayNumber: 15,
      location: 'Auditorium Hall C',
      time: '10:00 AM',
      courseCode
    };
    const savedExam = await addUpcomingExam(retakeExam);
    setExams((prev) => [savedExam, ...prev]);
  };

  const handleSaveProfile = async (updated: Partial<StudentProfile>) => {
    const newStudent = { ...student, ...updated };
    setStudent(newStudent);
    await updateStudentProfile(newStudent);
  };

  const handlePayFee = (invoiceRef: string) => {
    setFeeStatements((prev) =>
      prev.map((s) => (s.invoiceRef === invoiceRef ? { ...s, status: 'Paid' } : s))
    );
  };

  const handleSubmitAssignmentWork = async (assignmentId: string, fileName: string) => {
    const newSub: Omit<AssignmentSubmission, 'id'> = {
      assignmentId,
      studentName: student.name,
      studentId: student.studentId,
      submittedAt: 'Just Now',
      fileName,
      fileUrl: '#',
      status: 'Submitted',
      score: 0,
      feedback: ''
    };
    const saved = await addSubmission(newSub);
    setSubmissionsList((prev) => [saved, ...prev]);
  };

  // Handlers for Teacher
  const handleTeacherCreateAssignment = async (data: Omit<Assignment, 'id'>) => {
    const saved = await addAssignment(data);
    setAssignmentsList((prev) => [saved, ...prev]);
  };

  const handleTeacherGradeSubmission = async (subId: string, score: number, feedback: string) => {
    await gradeSubmission(subId, score, feedback);
    setSubmissionsList((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, score, feedback, status: 'Graded' } : s))
    );
  };

  const handleTeacherAddNote = async (note: Omit<StudyNote, 'id'>) => {
    const saved = await addStudyNote(note);
    setStudyNotesList((prev) => [saved, ...prev]);
  };

  const handleTeacherAddAnnouncement = async (ann: Omit<Announcement, 'id'>) => {
    const saved = await addAnnouncement(ann);
    setAnnouncementsList((prev) => [saved, ...prev]);
  };

  // Handlers for Admin
  const handleAdminAddStudent = async (data: Omit<StudentProfile, 'id'>) => {
    const saved = await addStudentProfile(data);
    setStudentsList((prev) => [saved, ...prev]);
  };

  const handleAdminUpdateStudent = async (id: string, data: Partial<StudentProfile>) => {
    setStudentsList((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  };

  const handleAdminAddTeacher = async (data: Omit<TeacherProfile, 'id'>) => {
    const saved = await addTeacher(data);
    setTeachersList((prev) => [saved, ...prev]);
  };

  const handleAdminAddFee = async (data: Omit<FeeStatement, 'id'>) => {
    const saved = await addFeeStatement(data);
    setFeeStatements((prev) => [saved, ...prev]);
  };

  const handleAdminUpdateFeeStatus = async (invoiceRef: string, status: 'Paid' | 'Pending' | 'Overdue') => {
    await updateFeeStatus(invoiceRef, status);
    setFeeStatements((prev) => prev.map((f) => (f.invoiceRef === invoiceRef ? { ...f, status } : f)));
  };

  const handleAdminAddCourse = async (data: Omit<Course, 'id'>) => {
    const saved = await addCourse(data);
    setCoursesList((prev) => [saved, ...prev]);
  };

  const handleAdminAddEvent = async (data: Omit<CalendarEvent, 'id'>) => {
    const saved = await addCalendarEvent(data);
    setCalendarEventsList((prev) => [saved, ...prev]);
  };

  // If not logged in, render the Login Screen
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 sleek-gradient-bg font-sans text-slate-900 antialiased selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Sidebar Navigation */}
      <Sidebar
        userRole={currentUser.role}
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenBot={() => setIsBotOpen(true)}
        onOpenHelp={() => setIsBotOpen(true)}
      />

      {/* Top Header Bar */}
      <Header
        user={currentUser}
        student={student}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenBot={() => setIsBotOpen(true)}
        onOpenHelp={() => setIsBotOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Canvas Area */}
      <main className="ml-[260px] mt-16 p-8 min-h-[calc(100vh-64px)] max-w-[1440px]">
        {/* STUDENT PORTAL VIEWS */}
        {currentUser.role === 'student' && (
          <>
            {currentView === 'dashboard' && (
              <DashboardView
                student={student}
                records={filteredRecords}
                exams={filteredExams}
                onOpenTranscript={() => setIsTranscriptOpen(true)}
                onOpenRetake={() => setIsRetakeOpen(true)}
                onOpenAddGrade={() => setIsAddGradeOpen(true)}
                onOpenExamsModal={() => setIsBotOpen(true)}
                onUpdateStudentTarget={handleUpdateStudentTarget}
              />
            )}

            {currentView === 'timetable' && <TimetableMode entries={timetable} />}

            {currentView === 'attendance' && <AttendanceMode records={attendance} />}

            {currentView === 'courses' && <CoursesMode records={records} />}

            {currentView === 'assignments' && (
              <AssignmentsMode
                assignments={assignments}
                submissions={submissions}
                onSubmitAssignment={handleSubmitAssignmentWork}
              />
            )}

            {currentView === 'study_notes' && <StudyNotesMode notes={studyNotes} />}

            {currentView === 'notifications' && (
              <NotificationCenter
                isOpen={true}
                onClose={() => setCurrentView('dashboard')}
                announcements={announcements}
                feeStatements={feeStatements}
                fees={feeStatements}
              />
            )}

            {currentView === 'fees' && (
              <FeesMode statements={feeStatements} onPayFee={handlePayFee} />
            )}

            {currentView === 'settings' && (
              <SettingsMode student={student} onSaveProfile={handleSaveProfile} />
            )}
          </>
        )}

        {/* TEACHER PORTAL VIEWS */}
        {currentUser.role === 'teacher' && (
          <>
            {(currentView === 'teacher_dashboard' || currentView === 'dashboard') && (
              <TeacherDashboard
                teacher={teachers[0] || initialTeachers[0]}
                students={students}
                courses={courses}
                submissions={submissions}
                onNavigate={setCurrentView}
              />
            )}

            {currentView === 'teacher_classes' && <ClassManagement courses={courses} students={students} />}

            {currentView === 'teacher_attendance' && (
              <AttendanceManagement
                students={students}
                courses={courses}
                attendanceRecords={attendance}
                onSaveAttendance={async () => {
                  alert('Attendance submitted successfully to Firestore!');
                }}
              />
            )}

            {currentView === 'teacher_marks' && (
              <MarksManagement
                students={students}
                courses={courses}
                academicRecords={records}
                onSaveMarks={async (rec) => {
                  const saved = await addAcademicRecord(rec);
                  setRecords((prev) => [saved, ...prev]);
                }}
              />
            )}

            {currentView === 'teacher_assignments' && (
              <TeacherAssignments
                courses={courses}
                assignments={assignments}
                submissions={submissions}
                onCreateAssignment={handleTeacherCreateAssignment}
                onGradeSubmission={handleTeacherGradeSubmission}
              />
            )}

            {currentView === 'teacher_notes' && (
              <NotesUpload
                courses={courses}
                notes={studyNotes}
                onAddNote={handleTeacherAddNote}
              />
            )}

            {currentView === 'teacher_announcements' && (
              <TeacherAnnouncements
                courses={courses}
                announcements={announcements}
                onAddAnnouncement={handleTeacherAddAnnouncement}
              />
            )}

            {currentView === 'teacher_timetable' && <TeacherTimetable timetable={timetable} />}

            {currentView === 'teacher_personal_attendance' && (
              <TeacherPersonalAttendance teacherAttendance={teacherAttendance} />
            )}

            {currentView === 'teacher_analytics' && <StudentAnalytics students={students} />}
          </>
        )}

        {/* ADMIN PORTAL VIEWS */}
        {currentUser.role === 'admin' && (
          <>
            {(currentView === 'admin_dashboard' || currentView === 'dashboard') && (
              <AdminDashboard
                students={students}
                teachers={teachers}
                courses={courses}
                feeStatements={feeStatements}
                activityLogs={activityLogs}
                onNavigate={setCurrentView}
              />
            )}

            {currentView === 'admin_students' && (
              <StudentManagement
                students={students}
                onAddStudent={handleAdminAddStudent}
                onUpdateStudent={handleAdminUpdateStudent}
              />
            )}

            {currentView === 'admin_teachers' && (
              <TeacherManagement teachers={teachers} onAddTeacher={handleAdminAddTeacher} />
            )}

            {currentView === 'admin_fees' && (
              <AdminFeeManagement
                students={students}
                feeStatements={feeStatements}
                onAddFeeStatement={handleAdminAddFee}
                onUpdateFeeStatus={handleAdminUpdateFeeStatus}
              />
            )}

            {currentView === 'admin_attendance' && (
              <AdminAttendanceMonitoring
                students={students}
                teacherAttendance={teacherAttendance}
              />
            )}

            {currentView === 'admin_courses' && (
              <CourseManagement
                courses={courses}
                teachers={teachers}
                onAddCourse={handleAdminAddCourse}
              />
            )}

            {currentView === 'admin_calendar' && (
              <UniversityCalendar events={calendarEvents} onAddEvent={handleAdminAddEvent} />
            )}

            {currentView === 'admin_roles' && <RolePermissions />}

            {currentView === 'admin_activity' && <ActivityLogs activityLogs={activityLogs} />}

            {currentView === 'admin_reports' && (
              <ReportGenerator
                students={students}
                teachers={teachers}
                feeStatements={feeStatements}
              />
            )}
          </>
        )}
      </main>

      {/* Modals & AI Support Bot */}
      <TranscriptModal
        isOpen={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
        student={student}
        records={records}
      />

      <RetakeModal
        isOpen={isRetakeOpen}
        onClose={() => setIsRetakeOpen(false)}
        records={records}
        onRegisterSuccess={handleRegisterRetakeSuccess}
      />

      <AddGradeModal
        isOpen={isAddGradeOpen}
        onClose={() => setIsAddGradeOpen(false)}
        onAddGrade={handleAddGrade}
      />

      <SupportBotModal
        isOpen={isBotOpen}
        onClose={() => setIsBotOpen(false)}
        student={student}
        records={records}
        exams={exams}
      />
    </div>
  );
}
