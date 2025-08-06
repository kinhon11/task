# Personal Task Manager

Ứng dụng quản lý công việc cá nhân được xây dựng bằng ReactJS với các tính năng đầy đủ cho việc quản lý task hàng ngày.

## 🚀 Tính năng

### 🔐 Xác thực người dùng
- **Đăng ký tài khoản**: Tạo tài khoản mới với email và mật khẩu
- **Đăng nhập**: Xác thực người dùng với thông tin đã đăng ký
- **Đăng xuất**: Thoát khỏi phiên làm việc hiện tại
- **Bảo vệ route**: Chỉ người dùng đã đăng nhập mới có thể truy cập các trang được bảo vệ

### 📋 Quản lý công việc
- **Thêm công việc mới**: Tạo task với tiêu đề, mô tả và ngày hết hạn
- **Chỉnh sửa công việc**: Cập nhật thông tin của task đã có
- **Xóa công việc**: Loại bỏ task không cần thiết với xác nhận
- **Đánh dấu hoàn thành**: Toggle trạng thái hoàn thành/chưa hoàn thành
- **Hiển thị trạng thái**: Phân biệt task hoàn thành, chưa hoàn thành, quá hạn

### 🔍 Tìm kiếm và lọc
- **Tìm kiếm theo từ khóa**: Tìm task theo tiêu đề hoặc mô tả
- **Lọc theo trạng thái**: Hiển thị tất cả, đã hoàn thành, hoặc chưa hoàn thành
- **Sắp xếp thông minh**: Hiển thị task quá hạn và task hôm nay với badge đặc biệt

### 👤 Quản lý hồ sơ
- **Xem thông tin cá nhân**: Hiển thị thông tin người dùng
- **Thống kê tham gia**: Ngày tham gia và thời gian sử dụng

## 🛠️ Công nghệ sử dụng

- **ReactJS 18**: Framework chính với Class Components
- **React Router DOM**: Quản lý routing và navigation
- **Bootstrap 5**: CSS Framework cho UI responsive
- **Font Awesome**: Icon library
- **localStorage**: Lưu trữ dữ liệu người dùng và task

## 📁 Cấu trúc dự án

```
src/
├── components/           # Các component UI
│   ├── Navbar.js        # Navigation bar
│   ├── TaskList.js      # Danh sách và quản lý task
│   ├── TaskItem.js      # Component hiển thị từng task
│   ├── TaskForm.js      # Form thêm/sửa task
│   └── TaskFilter.js    # Bộ lọc và tìm kiếm
├── pages/               # Các trang chính
│   ├── Home.js          # Trang chủ - quản lý task
│   ├── Login.js         # Trang đăng nhập
│   ├── Register.js      # Trang đăng ký
│   └── Profile.js       # Trang hồ sơ cá nhân
├── router/              # Quản lý routing
│   └── AppRoutes.js     # Định nghĩa routes và bảo vệ
├── utils/               # Tiện ích và logic
│   └── storage.js       # Quản lý localStorage
├── styles/              # CSS files
│   ├── components.css   # Styles chung cho components
│   ├── TaskList.css     # Styles cho TaskList
│   ├── TaskForm.css     # Styles cho TaskForm
│   ├── TaskItem.css     # Styles cho TaskItem
│   └── TaskFilter.css   # Styles cho TaskFilter
└── App.js               # Component chính
```

## 🎨 Thiết kế UI/UX

### 🎯 Nguyên tắc thiết kế
- **Responsive Design**: Tương thích với mọi thiết bị
- **Modern UI**: Giao diện hiện đại với Bootstrap 5
- **Smooth Animations**: Hiệu ứng mượt mà và chuyên nghiệp
- **Intuitive UX**: Trải nghiệm người dùng trực quan

### 🎨 Component Styles
- **TaskList**: Hiển thị danh sách task với animation fadeIn
- **TaskForm**: Form thêm/sửa với validation và feedback
- **TaskItem**: Card hiển thị task với hover effects
- **TaskFilter**: Bộ lọc với focus animations

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js (version 14 trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd personal-task-manager
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy ứng dụng**
```bash
npm start
```

4. **Truy cập ứng dụng**
Mở trình duyệt và truy cập: `http://localhost:3000`

## 📖 Hướng dẫn sử dụng

### Đăng ký tài khoản
1. Truy cập trang đăng ký
2. Điền đầy đủ thông tin: Họ tên, Email, Mật khẩu
3. Xác nhận mật khẩu
4. Nhấn "Đăng ký"

### Đăng nhập
1. Truy cập trang đăng nhập
2. Nhập Email và Mật khẩu đã đăng ký
3. Nhấn "Đăng nhập"

### Quản lý công việc
1. **Thêm task mới**: Nhấn "Thêm công việc mới"
2. **Chỉnh sửa**: Nhấn icon edit trên task
3. **Xóa task**: Nhấn icon delete và xác nhận
4. **Đánh dấu hoàn thành**: Nhấn nút tròn bên trái task
5. **Tìm kiếm**: Sử dụng ô tìm kiếm
6. **Lọc**: Chọn trạng thái trong dropdown

## 💾 Lưu trữ dữ liệu

### localStorage Structure
```javascript
// Users
'users': [
  {
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: string
  }
]

// Current User
'currentUser': {
  id: number,
  name: string,
  email: string,
  password: string,
  createdAt: string
}

// Tasks per user
'tasks_${userId}': [
  {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    completed: boolean,
    userId: number,
    createdAt: string
  }
]
```

## 🔧 Tính năng nổi bật

### ✅ Validation đầy đủ
- Kiểm tra email hợp lệ
- Mật khẩu tối thiểu 6 ký tự
- Xác nhận mật khẩu khớp
- Validation form task

### 🎨 UI/UX chuyên nghiệp
- Loading states với spinner
- Error handling với alert
- Success feedback
- Smooth transitions

### 📱 Responsive Design
- Mobile-first approach
- Tablet và desktop optimized
- Touch-friendly interactions

### 🔒 Bảo mật
- Protected routes
- Session management
- Data validation

## 🚀 Mở rộng trong tương lai

### 📊 Tính năng có thể thêm
- **Thống kê**: Biểu đồ hoàn thành task
- **Categories**: Phân loại task theo danh mục
- **Priority levels**: Mức độ ưu tiên
- **Reminders**: Nhắc nhở deadline
- **Export/Import**: Xuất/nhập dữ liệu
- **Dark mode**: Chế độ tối
- **Offline support**: Hoạt động offline
- **Real-time sync**: Đồng bộ real-time

### 🔧 Cải tiến kỹ thuật
- **Backend API**: Kết nối với server
- **Database**: PostgreSQL/MongoDB
- **Authentication**: JWT tokens
- **State Management**: Redux/Context API
- **Testing**: Unit tests và E2E tests
- **PWA**: Progressive Web App

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👥 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:
1. Fork project
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

---

**Personal Task Manager** - Quản lý công việc cá nhân một cách hiệu quả! 🚀
