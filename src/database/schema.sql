-- ============================================================================
-- ADMISSIONS & STUDENT PORTAL WEB APPLICATION
-- PostgreSQL Database Schema
-- Author: Architecture Template
-- Description: Complete DDL with RBAC, Triggers, and RLS Policies
-- ============================================================================

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Role enumeration for RBAC
CREATE TYPE user_role AS ENUM (
    'superadmin',
    'admin',
    'student',
    'applicant'
);

-- Application status
CREATE TYPE application_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'waitlisted'
);

-- Course status for pass/fail
CREATE TYPE course_status AS ENUM (
    'not_started',
    'in_progress',
    'passed',
    'failed'
);

-- Admission block (Khối thi)
CREATE TYPE admission_block AS ENUM (
    'A',
    'A1',
    'B',
    'C',
    'D',
    'D1'
);

-- Gender
CREATE TYPE gender AS ENUM (
    'male',
    'female',
    'other'
);

-- ============================================================================
-- TABLES
-- ============================================================================

-- Roles table (reference for role management)
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name user_role NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles linked to Supabase Auth
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    role user_role NOT NULL DEFAULT 'applicant',
    full_name TEXT,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender gender,
    avatar_url TEXT,
    student_id TEXT UNIQUE, -- MSSV (e.g., SV2024001)
    major_id INTEGER,
    admission_year INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admission Information (tuyển sinh)
CREATE TABLE admission_info (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    admission_year INTEGER NOT NULL,
    admission_block admission_block NOT NULL,
    quota INTEGER NOT NULL DEFAULT 0,
    tuition_fee_per_year DECIMAL(12, 2) NOT NULL,
    tuition_fee_per_credit DECIMAL(10, 2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    requirements TEXT,
    contact_email TEXT,
    contact_phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Majors/Ngành học
CREATE TABLE majors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    admission_block admission_block NOT NULL,
    duration_years INTEGER NOT NULL DEFAULT 4,
    total_credits INTEGER NOT NULL DEFAULT 120,
    tuition_fee_per_year DECIMAL(12, 2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications (đơn đăng ký tuyển sinh)
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender gender NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    high_school_name VARCHAR(255),
    graduation_year INTEGER,
    admission_block admission_block NOT NULL,
    first_choice_major_id INTEGER REFERENCES majors(id),
    second_choice_major_id INTEGER REFERENCES majors(id),
    total_score DECIMAL(5, 2),
    status application_status DEFAULT 'pending',
    notes TEXT,
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses (môn học)
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    name_vi VARCHAR(255) NOT NULL, -- Vietnamese name
    credits INTEGER NOT NULL DEFAULT 3,
    semester INTEGER NOT NULL,
    description TEXT,
    prerequisites INTEGER[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course-Major mapping
CREATE TABLE course_major (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    major_id INTEGER NOT NULL REFERENCES majors(id) ON DELETE CASCADE,
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, major_id)
);

-- Academic Records (bảng điểm)
CREATE TABLE academic_records (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    major_id INTEGER REFERENCES majors(id),
    semester INTEGER NOT NULL,
    academic_year INTEGER NOT NULL,
    raw_score DECIMAL(5, 2),
    letter_grade CHAR(1),
    gpa DECIMAL(4, 2), -- Calculated GPA for this course
    status course_status DEFAULT 'not_started',
    is_passed BOOLEAN DEFAULT false,
    passed_at TIMESTAMPTZ,
    graded_by UUID REFERENCES auth.users(id),
    graded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id, semester, academic_year)
);

-- Student Schedule (lịch học)
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    semester INTEGER NOT NULL,
    academic_year INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL, -- 1=Monday, 7=Sunday
    start_period INTEGER NOT NULL, -- 1-10
    end_period INTEGER NOT NULL,
    room VARCHAR(50),
    teacher_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id, semester, academic_year, day_of_week, start_period)
);

-- Password reset tokens
CREATE TABLE password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit log
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id INTEGER,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_student_id ON profiles(student_id);
CREATE INDEX idx_profiles_major_id ON profiles(major_id);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_academic_records_user_id ON academic_records(user_id);
CREATE INDEX idx_academic_records_course_id ON academic_records(course_id);
CREATE INDEX idx_academic_records_status ON academic_records(status);
CREATE INDEX idx_schedules_user_id ON schedules(user_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================================================
-- SEED DATA: ROLES
-- ============================================================================

INSERT INTO roles (name, description) VALUES
    ('superadmin', 'System-wide control. Can manage admission info, view all logs, and upgrade/downgrade users.'),
    ('admin', 'Can review and approve applicants, input grades and academic records.'),
    ('student', 'Can access Student Portal to view schedules, courses, grades, and failed courses.'),
    ('applicant', 'Can view admission info, fill registration forms, select majors/blocks.');

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- 1. Trigger: Auto append "@email.com" suffix to emails (except SuperAdmin)
CREATE OR REPLACE FUNCTION auto_email_suffix()
RETURNS TRIGGER AS $$
BEGIN
    -- Only append if not ending with @admin.com (for SuperAdmin)
    IF NEW.email NOT LIKE '%@admin.com' THEN
        -- Check if email already has @ symbol
        IF NEW.email NOT LIKE '%@%' THEN
            NEW.email := NEW.email || '@email.com';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_auto_email_suffix
    BEFORE INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auto_email_suffix();

-- 2. Trigger: Auto calculate GPA and Pass/Fail status
CREATE OR REPLACE FUNCTION calculate_gpa_and_pass()
RETURNS TRIGGER AS $$
DECLARE
    passing_threshold DECIMAL(4, 2) := 4.00;
    grade_value DECIMAL(4, 2);
BEGIN
    -- Calculate GPA based on raw score (0-10 scale)
    IF NEW.raw_score IS NOT NULL THEN
        NEW.gpa := NEW.raw_score;

        -- Determine pass/fail status
        IF NEW.raw_score >= passing_threshold THEN
            NEW.is_passed := true;
            NEW.status := 'passed';
            NEW.passed_at := NOW();
        ELSE
            NEW.is_passed := false;
            NEW.status := 'failed';
            NEW.passed_at := NULL;
        END IF;

        -- Calculate letter grade
        IF NEW.raw_score >= 9.0 THEN
            NEW.letter_grade := 'A';
        ELSIF NEW.raw_score >= 8.0 THEN
            NEW.letter_grade := 'B+';
        ELSIF NEW.raw_score >= 7.0 THEN
            NEW.letter_grade := 'B';
        ELSIF NEW.raw_score >= 6.0 THEN
            NEW.letter_grade := 'C+';
        ELSIF NEW.raw_score >= 5.0 THEN
            NEW.letter_grade := 'C';
        ELSIF NEW.raw_score >= 4.0 THEN
            NEW.letter_grade := 'D';
        ELSE
            NEW.letter_grade := 'F';
        END IF;
    END IF;

    NEW.graded_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_calculate_gpa
    BEFORE INSERT OR UPDATE ON academic_records
    FOR EACH ROW
    EXECUTE FUNCTION calculate_gpa_and_pass();

-- 3. Trigger: When applicant approved, generate student ID and update role
CREATE OR REPLACE FUNCTION on_application_approved()
RETURNS TRIGGER AS $$
DECLARE
    new_student_id TEXT;
    admission_year_val INTEGER;
    major_code TEXT;
    sequence_num INTEGER;
BEGIN
    -- Only trigger when status changes to approved
    IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
        -- Get admission year from application
        SELECT EXTRACT(YEAR FROM NEW.created_at)::INTEGER INTO admission_year_val;

        -- Get major code
        SELECT m.code INTO major_code
        FROM majors m
        WHERE m.id = NEW.first_choice_major_id;

        -- Generate sequence number based on approved applications for this major/year
        SELECT COUNT(*) + 1 INTO sequence_num
        FROM applications a
        JOIN profiles p ON a.user_id = p.id
        WHERE a.status = 'approved'
            AND a.first_choice_major_id = NEW.first_choice_major_id
            AND EXTRACT(YEAR FROM a.created_at) = admission_year_val;

        -- Generate student ID: SV + Year + MajorCode + Sequence (e.g., SV2024CNTT001)
        new_student_id := 'SV' || admission_year_val || COALESCE(major_code, 'XX') || LPAD(sequence_num::TEXT, 3, '0');

        -- Update profile with student ID and role
        UPDATE profiles
        SET student_id = new_student_id,
            role = 'student',
            major_id = NEW.first_choice_major_id,
            admission_year = admission_year_val,
            updated_at = NOW()
        WHERE id = NEW.user_id;

        -- Log the action
        INSERT INTO audit_logs (user_id, action, table_name, record_id, new_values)
        VALUES (NEW.reviewed_by, 'APPROVE_APPLICATION', 'applications', NEW.id,
            jsonb_build_object('user_id', NEW.user_id, 'student_id', new_student_id));
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_application_approved
    AFTER UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION on_application_approved();

-- 4. Trigger: Update timestamp on record changes
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_admission_info_timestamp
    BEFORE UPDATE ON admission_info
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_majors_timestamp
    BEFORE UPDATE ON majors
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_applications_timestamp
    BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_courses_timestamp
    BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_academic_records_timestamp
    BEFORE UPDATE ON academic_records
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_schedules_timestamp
    BEFORE UPDATE ON schedules
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- 5. Trigger: Audit logging for profile changes
CREATE OR REPLACE FUNCTION audit_profile_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD IS NOT NULL THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values)
        VALUES (NEW.id, 'UPDATE_PROFILE', 'profiles', NEW.id,
            jsonb_build_object(
                'role', OLD.role,
                'student_id', OLD.student_id,
                'full_name', OLD.full_name
            ),
            jsonb_build_object(
                'role', NEW.role,
                'student_id', NEW.student_id,
                'full_name', NEW.full_name
            ));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_profile_changes
    AFTER UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION audit_profile_change();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE majors ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_major ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- PROFILES RLS
-- Superadmin: can view/update all
CREATE POLICY "superadmin_full_access_profiles" ON profiles
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM profiles WHERE role = 'superadmin')
    );

-- Admin: can view all profiles, update student records
CREATE POLICY "admin_view_all_profiles" ON profiles
    FOR SELECT USING (
        auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
    );

-- Students: can view/update their own profile
CREATE POLICY "student_own_profile" ON profiles
    FOR ALL USING (auth.uid() = id);

-- Applicants: can only view their own profile (read-only)
CREATE POLICY "applicant_view_own_profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- ADMISSION INFO RLS
-- Everyone can view active admission info
CREATE POLICY "public_view_admission_info" ON admission_info
    FOR SELECT USING (is_active = true);

-- Only admins/superadmin can insert/update
CREATE POLICY "admin_manage_admission_info" ON admission_info
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM profiles WHERE role IN ('superadmin', 'admin'))
    );

-- MAJORS RLS
-- Everyone can view majors
CREATE POLICY "public_view_majors" ON majors
    FOR SELECT USING (is_active = true);

-- Only admins/superadmin can manage
CREATE POLICY "admin_manage_majors" ON majors
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM profiles WHERE role IN ('superadmin', 'admin'))
    );

-- APPLICATIONS RLS
-- Applicants: can create and view their own
CREATE POLICY "applicant_manage_own_application" ON applications
    FOR ALL USING (
        auth.uid() = user_id
    );

-- Admins/superadmin: can view all and update status
CREATE POLICY "admin_manage_applications" ON applications
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM profiles WHERE role IN ('superadmin', 'admin'))
    );

-- COURSES RLS
-- Everyone can view courses
CREATE POLICY "public_view_courses" ON courses
    FOR SELECT USING (is_active = true);

-- Only admins/superadmin can manage
CREATE POLICY "admin_manage_courses" ON courses
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM profiles WHERE role IN ('superadmin', 'admin'))
    );

-- ACADEMIC RECORDS RLS
-- Students: can view their own records
CREATE POLICY "student_view_own_records" ON academic_records
    FOR SELECT USING (auth.uid() = user_id);

-- Admins/superadmin: can manage all
CREATE POLICY "admin_manage_academic_records" ON academic_records
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM profiles WHERE role IN ('superadmin', 'admin'))
    );

-- SCHEDULES RLS
-- Students: can view their own schedules
CREATE POLICY "student_view_own_schedules" ON schedules
    FOR SELECT USING (auth.uid() = user_id);

-- Admins/superadmin: can manage all
CREATE POLICY "admin_manage_schedules" ON schedules
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM profiles WHERE role IN ('superadmin', 'admin'))
    );

-- AUDIT LOGS RLS
-- Only superadmin can view audit logs
CREATE POLICY "superadmin_view_audit_logs" ON audit_logs
    FOR SELECT USING (
        auth.uid() IN (SELECT id FROM profiles WHERE role = 'superadmin')
    );

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Get user's current role
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS user_role AS $$
DECLARE
    role_val user_role;
BEGIN
    SELECT p.role INTO role_val
    FROM profiles p
    WHERE p.id = user_id;
    RETURN role_val;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Calculate cumulative GPA for a student
CREATE OR REPLACE FUNCTION calculate_cumulative_gpa(user_uuid UUID)
RETURNS DECIMAL(4, 2) AS $$
DECLARE
    gpa_result DECIMAL(4, 2);
BEGIN
    SELECT COALESCE(AVG(gpa), 0)::DECIMAL(4, 2)
    INTO gpa_result
    FROM academic_records
    WHERE user_id = user_uuid AND gpa IS NOT NULL;

    RETURN gpa_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get failed courses count for a student
CREATE OR REPLACE FUNCTION get_failed_courses_count(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    count_result INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO count_result
    FROM academic_records
    WHERE user_id = user_uuid AND status = 'failed';

    RETURN count_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user can access admin workspace
CREATE OR REPLACE FUNCTION can_access_admin_workspace(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    role_val user_role;
BEGIN
    SELECT p.role INTO role_val
    FROM profiles p
    WHERE p.id = user_uuid;

    RETURN role_val IN ('superadmin', 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- SEED DATA: SUPERADMIN ACCOUNT
-- Note: This account must be created manually via Supabase Dashboard
-- or via auth.admin.create_user() with email "SU@admin.com"
-- ============================================================================

-- The SuperAdmin account will be created with:
-- Email: SU@admin.com
-- Password: thanhchung204
-- Role: superadmin

-- After creating the auth user, insert the profile:
-- INSERT INTO profiles (id, email, username, role, full_name)
-- VALUES (
--     <auth_users_id>,
--     'SU@admin.com',
--     'SU',
--     'superadmin',
--     'Super Admin'
-- );