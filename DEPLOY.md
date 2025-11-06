# Hướng dẫn Deploy Website lên GitHub Pages

## Bước 1: Chuẩn bị

1. **Tạo tài khoản GitHub** (nếu chưa có): https://github.com
2. **Cài đặt Git** trên máy tính: https://git-scm.com
3. **Chuẩn bị hình ảnh** cho website theo danh sách trong DOCS.md

## Bước 2: Tạo Repository trên GitHub

1. Đăng nhập GitHub
2. Click nút **"New"** để tạo repository mới
3. Đặt tên repository: `truong-mam-non-tuoi-ngoc`
4. Chọn **Public** (để GitHub Pages miễn phí)
5. Tick **"Add a README file"**
6. Click **"Create repository"**

## Bước 3: Upload Code lên GitHub

### Cách 1: Sử dụng Git Command Line

```bash
# Mở Command Prompt/Terminal tại thư mục chứa website
cd "e:\HTML CSS JAVASCRIPT\mnhh"

# Khởi tạo git repository
git init

# Thêm remote repository
git remote add origin https://github.com/USERNAME/truong-mam-non-tuoi-ngoc.git

# Thêm tất cả file
git add .

# Commit với message
git commit -m "Initial commit - Website Trường Mầm non Tuổi Ngọc"

# Push lên GitHub
git push -u origin main
```

### Cách 2: Sử dụng GitHub Desktop

1. Download và cài **GitHub Desktop**: https://desktop.github.com
2. Đăng nhập tài khoản GitHub
3. **Clone** repository vừa tạo về máy
4. **Copy** tất cả file website vào thư mục repository
5. **Commit** và **Push** lên GitHub

### Cách 3: Upload trực tiếp trên web

1. Vào repository trên GitHub.com
2. Click **"uploading an existing file"**
3. **Drag & drop** tất cả file và folder
4. Commit changes

## Bước 4: Bật GitHub Pages

1. Vào **Settings** của repository
2. Scroll xuống phần **"Pages"**
3. Trong **Source**, chọn **"Deploy from a branch"**
4. Chọn branch **"main"** và folder **"/ (root)"**
5. Click **"Save"**

## Bước 5: Truy cập Website

- Website sẽ có địa chỉ: `https://USERNAME.github.io/truong-mam-non-tuoi-ngoc`
- Có thể mất 5-10 phút để website có thể truy cập được

## Bước 6: Cập nhật Website

Khi cần cập nhật nội dung:

1. **Sửa file** trên máy local
2. **Add, commit và push** lên GitHub
3. Website sẽ **tự động cập nhật** sau vài phút

```bash
git add .
git commit -m "Cập nhật tin tức mới"
git push
```

## Bước 7: Tùy chỉnh Domain (Tùy chọn)

Nếu muốn sử dụng domain riêng (vd: truongtuoingoc.edu.vn):

1. Mua domain từ nhà cung cấp
2. Tạo file **CNAME** trong repository với nội dung là domain
3. Cấu hình DNS pointing đến GitHub Pages
4. Trong Settings > Pages, nhập custom domain

## Lưu ý quan trọng

### Hình ảnh

- **Thêm hình ảnh** vào thư mục `assets/images/`
- **Tối ưu kích thước** hình ảnh trước khi upload
- **Đặt tên file** đúng như trong code

### Cập nhật thông tin

- **Sửa thông tin** trong file `assets/js/data.js`
- **Thay đổi màu sắc** trong file `assets/css/style.css`
- **Cập nhật cấu hình** trong file `assets/js/config.js`

### Bảo mật

- **Không upload** thông tin nhạy cảm
- **Sử dụng email** và số điện thoại công khai
- **Repository private** nếu cần bảo mật source code

### Performance

- **Nén hình ảnh** trước khi upload
- **Sử dụng format** WebP nếu có thể
- **Kiểm tra tốc độ** website với PageSpeed Insights

## Troubleshooting

### Website không hiển thị

- Kiểm tra file `index.html` có ở root folder
- Đợi 10-15 phút sau khi enable Pages
- Kiểm tra Settings > Pages có báo lỗi không

### Hình ảnh không hiển thị

- Kiểm tra đường dẫn file hình
- Đảm bảo file tồn tại trong repository
- Kiểm tra tên file có đúng case sensitive

### CSS/JS không hoạt động

- Kiểm tra đường dẫn file CSS/JS
- Mở Developer Tools để xem lỗi
- Đảm bảo file được commit và push đầy đủ

## Liên hệ hỗ trợ

Nếu gặp khó khăn trong quá trình deploy, có thể:

- Tìm kiếm trên Google với từ khóa cụ thể
- Xem documentation của GitHub Pages
- Liên hệ IT support của trường
