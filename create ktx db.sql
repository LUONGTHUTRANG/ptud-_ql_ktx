-- 1. TẠO DATABASE
CREATE DATABASE IF NOT EXISTS dormitory_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dormitory_management;

-- 2. TẠO CÁC BẢNG (TABLES)

-- Bảng Học kỳ (Dùng để quản lý thời gian mở/đóng đăng ký)
CREATE TABLE semesters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL COMMENT 'Ví dụ: Học kỳ 1 năm 2024-2025',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    
    -- Thời gian đăng ký ở mới
    registration_open_date DATETIME,
    registration_close_date DATETIME,
    
    -- Thời gian đăng ký gia hạn
    renewal_open_date DATETIME,
    renewal_close_date DATETIME,
    
    is_active BOOLEAN DEFAULT FALSE COMMENT 'Chỉ có 1 học kỳ active tại 1 thời điểm'
);

-- Bảng Quản trị viên (Admin)
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100)
);

-- Bảng Tòa nhà
CREATE TABLE buildings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL COMMENT 'Ví dụ: Tòa A1, Tòa B2',
    location VARCHAR(255) COMMENT 'Vị trí trong khuôn viên',
    gender_restriction ENUM('MALE', 'FEMALE', 'MIXED') DEFAULT 'MIXED' COMMENT 'Tòa dành riêng cho nam/nữ hoặc hỗn hợp'
);

-- Bảng Cán bộ quản lý (Manager)
CREATE TABLE managers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    is_first_login BOOLEAN DEFAULT TRUE COMMENT 'Bắt buộc đổi mật khẩu lần đầu',
    building_id INT, -- 1 Cán bộ quản lý 1 tòa
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE SET NULL
);

-- Bảng Phòng (Rooms)
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    building_id INT NOT NULL,
    room_number VARCHAR(10) NOT NULL COMMENT 'Số phòng, vd: 301',
    floor INT NOT NULL COMMENT 'Tầng',
    max_capacity INT NOT NULL DEFAULT 4, -- Số người tối đa
    current_occupancy INT DEFAULT 0, -- Số người đang ở hiện tại
    price_per_semester DECIMAL(10, 2) NOT NULL,
    
    -- Tiện ích
    has_ac BOOLEAN DEFAULT FALSE COMMENT 'Điều hòa',
    has_heater BOOLEAN DEFAULT FALSE COMMENT 'Nóng lạnh',
    has_washer BOOLEAN DEFAULT FALSE COMMENT 'Máy giặt chung/riêng',
    
    status ENUM('AVAILABLE', 'FULL', 'MAINTENANCE') DEFAULT 'AVAILABLE',
    
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE,
    UNIQUE(building_id, room_number) -- Một tòa không thể có 2 phòng trùng số
);

-- Bảng Sinh viên (Students)
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mssv VARCHAR(20) UNIQUE NOT NULL COMMENT 'Mã số sinh viên',
    password_hash VARCHAR(255) NOT NULL COMMENT 'Mật khẩu đồng bộ hệ thống trường',
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    gender ENUM('MALE', 'FEMALE') NOT NULL,
    class_name VARCHAR(50), -- Lớp sinh hoạt
    
    -- Trạng thái ở hiện tại
    current_room_id INT DEFAULT NULL,
    FOREIGN KEY (current_room_id) REFERENCES rooms(id) ON DELETE SET NULL
);

-- Bảng Hợp đồng/Lưu trú (Dùng để xác định sinh viên đang ở đâu trong kỳ nào)
CREATE TABLE stay_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    room_id INT NOT NULL,
    semester_id INT NOT NULL,
    start_date DATE,
    end_date DATE,
    status ENUM('ACTIVE', 'CHECKED_OUT', 'CANCELLED') DEFAULT 'ACTIVE',
    
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (semester_id) REFERENCES semesters(id)
);

-- Bảng Đăng ký ở (Bao gồm thường và ưu tiên)
CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    semester_id INT NOT NULL,
    
    registration_type ENUM('NORMAL', 'PRIORITY', 'RENEWAL') NOT NULL,
    
    -- Với đăng ký thường: Bắt buộc chọn phòng
    desired_room_id INT, 
    -- Với đăng ký ưu tiên: Chọn tòa
    desired_building_id INT,
    
    -- Thông tin ưu tiên
    priority_category ENUM('NONE', 'POOR_HOUSEHOLD', 'DISABILITY', 'OTHER') DEFAULT 'NONE',
    priority_description TEXT,
    evidence_file_path VARCHAR(255),
    
    -- CẬP NHẬT QUAN TRỌNG VỀ TRẠNG THÁI
    -- PENDING: Chờ Admin duyệt (Dùng cho PRIORITY)
    -- AWAITING_PAYMENT: Đã chọn phòng, đang chờ thanh toán (Dùng cho NORMAL)
    -- APPROVED: Admin đã duyệt (cho PRIORITY) nhưng chưa đóng tiền (nếu quy trình tách biệt)
    -- COMPLETED: Đã xong xuôi (Đã thanh toán / Đã xếp phòng thành công)
    -- REJECTED: Admin từ chối
    -- CANCELLED: Sinh viên hủy hoặc Hết hạn thanh toán
    status ENUM('PENDING', 'AWAITING_PAYMENT', 'APPROVED', 'COMPLETED', 'REJECTED', 'CANCELLED') DEFAULT 'PENDING',
    
    -- Link tới hóa đơn (để biết đăng ký này ứng với hóa đơn nào)
    invoice_id INT NULL, 

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    admin_note TEXT,
    
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (desired_room_id) REFERENCES rooms(id),
    FOREIGN KEY (desired_building_id) REFERENCES buildings(id),
    FOREIGN KEY (semester_id) REFERENCES semesters(id)
    -- Lưu ý: Khóa ngoại invoice_id sẽ được thêm sau khi tạo bảng invoices
);

-- Bảng Hóa đơn (Invoices)
CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_code VARCHAR(20) UNIQUE NOT NULL,
    type ENUM('ROOM_FEE', 'UTILITY_FEE') NOT NULL,
    
    semester_id INT NOT NULL,
    room_id INT NOT NULL, -- Hóa đơn luôn gắn với phòng
    student_id INT, -- Nếu là Tiền phòng -> Gắn với sinh viên cụ thể. Nếu Điện nước -> NULL (hoặc người đại diện)
    
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) COMMENT 'Vd: Tiền điện tháng 10',
    
    status ENUM('UNPAID', 'PAID', 'CANCELLED') DEFAULT 'UNPAID',
    due_date DATE,
    paid_at DATETIME,
    paid_by_student_id INT COMMENT 'Người thực hiện thanh toán (quan trọng cho hóa đơn điện nước)',
    created_by_manager_id INT,
    
    FOREIGN KEY (semester_id) REFERENCES semesters(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (paid_by_student_id) REFERENCES students(id),
    FOREIGN KEY (created_by_manager_id) REFERENCES managers(id)
);

-- Bảng Yêu cầu hỗ trợ (Support Requests)
CREATE TABLE support_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    type ENUM('COMPLAINT', 'REPAIR', 'PROPOSAL') NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    attachment_path VARCHAR(255), -- Ảnh đính kèm
    
    status ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    
    processed_by_manager_id INT,
    response_content TEXT, -- Phản hồi của quản lý
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (processed_by_manager_id) REFERENCES managers(id)
);

-- Bảng Thông báo (Notifications)
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    attachment_path VARCHAR(255),
    
    sender_role ENUM('ADMIN', 'MANAGER') NOT NULL,
    sender_id INT NOT NULL, -- ID của Admin hoặc Manager tùy role
    
    -- Logic gửi thông báo
    target_scope ENUM('ALL', 'BUILDING', 'ROOM', 'INDIVIDUAL') NOT NULL,
    
    -- Các trường ID đích (Chỉ điền 1 trong các trường này tùy scope)
    target_building_id INT DEFAULT NULL,
    target_room_id INT DEFAULT NULL,
    target_student_id INT DEFAULT NULL,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (target_building_id) REFERENCES buildings(id),
    FOREIGN KEY (target_room_id) REFERENCES rooms(id),
    FOREIGN KEY (target_student_id) REFERENCES students(id)
);

-- 3. INSERT DỮ LIỆU MẪU (DEMO DATA)

-- Thêm Học kỳ
INSERT INTO semesters (name, start_date, end_date, is_active) 
VALUES ('Học kỳ 1 2024-2025', '2024-09-01', '2025-01-15', TRUE);

-- Thêm Admin
INSERT INTO admins (username, password_hash, full_name) 
VALUES ('admin', 'hashed_password_secret', 'Quản Trị Viên Hệ Thống');

-- Thêm Tòa nhà
INSERT INTO buildings (name, location, gender_restriction) VALUES 
('Tòa A1', 'Khu A - Phía Đông', 'MALE'),
('Tòa B1', 'Khu B - Phía Tây', 'FEMALE');

-- Thêm Cán bộ quản lý
INSERT INTO managers (username, email, password_hash, full_name, phone_number, building_id) VALUES 
('quanlyA1', 'managerA1@school.edu.vn', 'hashed_password_123', 'Nguyễn Văn Quản Lý', '0987654321', 1),
('quanlyB1', 'managerB1@school.edu.vn', 'hashed_password_456', 'Trần Thị Quản Lý', '0912345678', 2);

-- Thêm Phòng
INSERT INTO rooms (building_id, room_number, floor, max_capacity, price_per_semester, has_ac, has_heater) VALUES 
(1, '101', 1, 4, 2500000, FALSE, TRUE), -- Phòng tòa A1
(1, '102', 1, 4, 2500000, FALSE, TRUE),
(2, '201', 2, 6, 1800000, FALSE, FALSE); -- Phòng tòa B1

-- Thêm Sinh viên
INSERT INTO students (mssv, password_hash, full_name, email, gender, class_name) VALUES 
('SV001', 'student_pass_hash', 'Lê Văn Sinh Viên', 'sv001@st.school.edu.vn', 'MALE', 'CNTT-K64'),
('SV002', 'student_pass_hash', 'Phạm Thị Sinh Viên', 'sv002@st.school.edu.vn', 'FEMALE', 'KT-K64');

INSERT INTO registrations (student_id, semester_id, registration_type, desired_room_id, status, created_at)
VALUES (1, 1, 'NORMAL', 1, 'AWAITING_PAYMENT', NOW());

-- Thêm Hóa đơn điện nước (Ví dụ phòng 101 tòa A1)
INSERT INTO invoices (invoice_code, type, semester_id, room_id, amount, description, status)
VALUES ('INV-101-OCT', 'UTILITY_FEE', 1, 1, 500000, 'Tiền điện tháng 10/2024', 'UNPAID');

ALTER TABLE students 
ADD COLUMN fcm_token VARCHAR(255) DEFAULT NULL COMMENT 'Lưu Device Token để bắn thông báo';

ALTER TABLE managers 
ADD COLUMN fcm_token VARCHAR(255) DEFAULT NULL;