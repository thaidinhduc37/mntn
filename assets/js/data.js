// ===== MOCK DATA FOR TRƯỜNG MẦM NON TUỔI NGỌC =====

// School Information
const schoolInfo = {
    name: "Trường Mầm non Tuổi Ngọc",
    address: "Xã Quảng Phú, Huyện Cư M'gar, Tỉnh Đắk Lắk",
    phone: "0262.XXX.XXXX",
    email: "truongmamnontuoingoc@daklak.edu.vn",
    website: "https://truongmamnontuoingoc.edu.vn",
    establishedYear: 2009,
    principal: "Cô Nguyễn Thị A",
    workingHours: {
        weekdays: "6:30 - 17:00",
        saturday: "6:30 - 11:30",
        sunday: "Nghỉ"
    }
};

// Statistics
const schoolStats = {
    students: 180,
    teachers: 25,
    classes: 8,
    yearsOfOperation: 15
};

// News and Announcements
const newsData = [
    {
        id: 1,
        title: "Thông báo tuyển sinh năm học 2024-2025",
        content: "Trường Mầm non Tuổi Ngọc thông báo tuyển sinh cho năm học mới. Phụ huynh có thể đăng ký trực tiếp tại trường hoặc liên hệ qua số điện thoại để được tư vấn chi tiết về chương trình học, học phí và các hoạt động giáo dục.",
        category: "Thông báo",
        date: "2024-11-15",
        image: "assets/images/news-1.jpg",
        featured: true,
        author: "Ban Giám hiệu"
    },
    {
        id: 2,
        title: "Lễ kỷ niệm ngày Nhà giáo Việt Nam 20/11",
        content: "Chương trình văn nghệ chào mừng ngày Nhà giáo Việt Nam với sự tham gia của các em học sinh và phụ huynh. Chương trình bao gồm các tiết mục ca hát, múa và trao tặng hoa tới các cô giáo.",
        category: "Hoạt động",
        date: "2024-11-10",
        image: "assets/images/news-2.jpg",
        featured: false,
        author: "Phòng Đào tạo"
    },
    {
        id: 3,
        title: "Thực đơn dinh dưỡng tháng 11/2024",
        content: "Thực đơn được lập theo khuyến nghị của Viện Dinh dưỡng Quốc gia, đảm bảo đầy đủ chất dinh dưỡng cho trẻ. Thực đơn bao gồm các món ăn đa dạng, cân bằng dinh dưỡng phù hợp với từng độ tuổi.",
        category: "Dinh dưỡng",
        date: "2024-11-05",
        image: "assets/images/news-3.jpg",
        featured: false,
        author: "Phòng Y tế"
    },
    {
        id: 4,
        title: "Khám sức khỏe định kỳ cho trẻ",
        content: "Lịch khám sức khỏe định kỳ 6 tháng/lần cho các em học sinh tại Trung tâm Y tế xã Quảng Phú. Việc khám sức khỏe định kỳ giúp theo dõi sự phát triển của trẻ và phát hiện sớm các vấn đề sức khỏe.",
        category: "Sức khỏe",
        date: "2024-11-01",
        image: "assets/images/news-4.jpg",
        featured: false,
        author: "Phòng Y tế"
    },
    {
        id: 5,
        title: "Hoạt động ngoại khóa tháng 11",
        content: "Các hoạt động ngoại khóa đa dạng giúp trẻ phát triển toàn diện. Bao gồm: vẽ tranh, làm đồ chơi từ nguyên liệu tái chế, học hát dân ca địa phương và tham quan các địa điểm lịch sử gần trường.",
        category: "Hoạt động",
        date: "2024-10-28",
        image: "assets/images/news-5.jpg",
        featured: false,
        author: "Phòng Đào tạo"
    }
];

// Educational Programs
const programs = [
    {
        id: 1,
        name: "Nhóm Nhà trẻ",
        ageRange: "18-36 tháng",
        description: "Chăm sóc và giáo dục trẻ nhỏ với sự quan tâm đặc biệt đến sự phát triển thể chất và tinh thần.",
        features: [
            "Phát triển kỹ năng vận động cơ bản",
            "Học tập qua vui chơi",
            "Rèn luyện thói quen sinh hoạt",
            "Chăm sóc sức khỏe toàn diện"
        ],
        activities: [
            "Vui chơi với đồ chơi an toàn",
            "Học hát, học nói qua trò chơi",
            "Tập đi, tập nói",
            "Ăn uống đúng giờ"
        ],
        icon: "fas fa-baby"
    },
    {
        id: 2,
        name: "Nhóm Mẫu giáo nhỏ",
        ageRange: "3-4 tuổi",
        description: "Phát triển toàn diện các kỹ năng cơ bản, chuẩn bị cho bé bước vào giai đoạn học tập cao hơn.",
        features: [
            "Phát triển ngôn ngữ và giao tiếp",
            "Học số đếm và nhận biết hình khối",
            "Rèn luyện kỹ năng xã hội",
            "Phát triển tư duy sáng tạo"
        ],
        activities: [
            "Kể chuyện và đọc sách tranh",
            "Vẽ, tô màu và làm thủ công",
            "Chơi các trò chơi nhóm",
            "Học hát và múa"
        ],
        icon: "fas fa-child"
    },
    {
        id: 3,
        name: "Nhóm Mẫu giáo lớn",
        ageRange: "4-5 tuổi",
        description: "Chuẩn bị toàn diện cho trẻ bước vào lớp 1, tập trung phát triển tư duy và kỹ năng học tập.",
        features: [
            "Làm quen với chữ số và chữ cái",
            "Phát triển tư duy logic",
            "Chuẩn bị vào lớp 1",
            "Rèn luyện kỹ năng tự lập"
        ],
        activities: [
            "Học viết chữ cái và số",
            "Toán học cơ bản",
            "Đọc hiểu câu chuyện",
            "Thực hành kỹ năng sống"
        ],
        icon: "fas fa-users"
    }
];

// Gallery Images
const galleryData = [
    {
        id: 1,
        title: "Phòng học hiện đại",
        description: "Không gian học tập thoáng mát",
        category: "classroom",
        image: "assets/images/gallery-1.jpg"
    },
    {
        id: 2,
        title: "Hoạt động ngoài trời",
        description: "Vui chơi và rèn luyện thể chất",
        category: "activities",
        image: "assets/images/gallery-2.jpg"
    },
    {
        id: 3,
        title: "Ngày hội văn hóa",
        description: "Tham gia các hoạt động văn hóa",
        category: "events",
        image: "assets/images/gallery-3.jpg"
    },
    {
        id: 4,
        title: "Khu vui chơi",
        description: "Thiết bị vui chơi an toàn",
        category: "facilities",
        image: "assets/images/gallery-4.jpg"
    },
    {
        id: 5,
        title: "Hoạt động học tập",
        description: "Học tập qua trò chơi",
        category: "classroom",
        image: "assets/images/gallery-5.jpg"
    },
    {
        id: 6,
        title: "Thể dục buổi sáng",
        description: "Rèn luyện sức khỏe hàng ngày",
        category: "activities",
        image: "assets/images/gallery-6.jpg"
    },
    {
        id: 7,
        title: "Thư viện trường",
        description: "Không gian đọc sách yên tĩnh",
        category: "facilities",
        image: "assets/images/gallery-7.jpg"
    },
    {
        id: 8,
        title: "Lễ khai giảng",
        description: "Ngày đầu tiên đến trường",
        category: "events",
        image: "assets/images/gallery-8.jpg"
    },
    {
        id: 9,
        title: "Phòng ăn",
        description: "Không gian ăn uống sạch sẽ",
        category: "facilities",
        image: "assets/images/gallery-9.jpg"
    }
];

// Teacher Information
const teachersData = [
    {
        id: 1,
        name: "Cô Nguyễn Thị A",
        position: "Hiệu trưởng",
        education: "Thạc sĩ Giáo dục Mầm non",
        experience: "15 năm",
        specialization: "Quản lý giáo dục",
        image: "assets/images/teacher-1.jpg"
    },
    {
        id: 2,
        name: "Cô Trần Thị B",
        position: "Phó Hiệu trưởng",
        education: "Cử nhân Giáo dục Mầm non",
        experience: "12 năm",
        specialization: "Chương trình giáo dục",
        image: "assets/images/teacher-2.jpg"
    },
    {
        id: 3,
        name: "Cô Lê Thị C",
        position: "Giáo viên lớp Mầm",
        education: "Cử nhân Giáo dục Mầm non",
        experience: "8 năm",
        specialization: "Chăm sóc trẻ nhỏ",
        image: "assets/images/teacher-3.jpg"
    }
];

// Facilities
const facilitiesData = [
    {
        id: 1,
        name: "Phòng học",
        description: "8 phòng học được trang bị đầy đủ thiết bị hiện đại",
        features: ["Điều hòa nhiệt độ", "Bàn ghế phù hợp", "Tivi thông minh", "Đồ chơi giáo dục"]
    },
    {
        id: 2,
        name: "Sân chơi",
        description: "Khu vực vui chơi ngoài trời an toàn với nhiều thiết bị đa dạng",
        features: ["Cầu trượt", "Xích đu", "Bập bênh", "Sân bóng mini"]
    },
    {
        id: 3,
        name: "Phòng ăn",
        description: "Không gian ăn uống sạch sẽ, đảm bảo vệ sinh an toàn thực phẩm",
        features: ["Bàn ăn phù hợp", "Bếp hiện đại", "Tủ lạnh bảo quản", "Hệ thống lọc nước"]
    },
    {
        id: 4,
        name: "Phòng y tế",
        description: "Trang bị đầy đủ thuốc và thiết bị y tế cơ bản",
        features: ["Tủ thuốc", "Giường nghỉ", "Nhiệt kế", "Hộp sơ cứu"]
    }
];

// Contact Form Subjects
const contactSubjects = [
    { value: "tuyen-sinh", label: "Tuyển sinh" },
    { value: "chuong-trinh", label: "Chương trình học" },
    { value: "hoc-phi", label: "Học phí" },
    { value: "hoat-dong", label: "Hoạt động ngoại khóa" },
    { value: "suc-khoe", label: "Chăm sóc sức khỏe" },
    { value: "khac", label: "Khác" }
];

// Menu Data for Navigation
const menuItems = [
    { id: 1, label: "Trang chủ", href: "#home", active: true },
    { id: 2, label: "Giới thiệu", href: "#about", active: false },
    { id: 3, label: "Chương trình", href: "#programs", active: false },
    { id: 4, label: "Tin tức", href: "#news", active: false },
    { id: 5, label: "Thư viện", href: "#gallery", active: false },
    { id: 6, label: "Liên hệ", href: "#contact", active: false }
];

// Social Media Links
const socialMedia = [
    { platform: "facebook", url: "#", icon: "fab fa-facebook-f" },
    { platform: "youtube", url: "#", icon: "fab fa-youtube" },
    { platform: "instagram", url: "#", icon: "fab fa-instagram" }
];

// Hero Slides Data
const heroSlides = [
    {
        id: 1,
        image: "assets/images/hero-1.jpg",
        title: "Chào mừng đến với Trường Mầm non Tuổi Ngọc",
        description: "Môi trường giáo dục chất lượng, an toàn và yêu thương cho trẻ em xã Quảng Phú",
        buttonText: "Tìm hiểu thêm",
        buttonLink: "#about"
    },
    {
        id: 2,
        image: "assets/images/hero-2.jpg",
        title: "Phương pháp giáo dục hiện đại",
        description: "Áp dụng chương trình giáo dục mầm non theo định hướng phát triển năng lực",
        buttonText: "Xem chương trình",
        buttonLink: "#programs"
    },
    {
        id: 3,
        image: "assets/images/hero-3.jpg",
        title: "Cơ sở vật chất khang trang",
        description: "Không gian học tập thoáng mát, an toàn với đầy đủ trang thiết bị hiện đại",
        buttonText: "Xem hình ảnh",
        buttonLink: "#gallery"
    }
];

// Export all data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        schoolInfo,
        schoolStats,
        newsData,
        programs,
        galleryData,
        teachersData,
        facilitiesData,
        contactSubjects,
        menuItems,
        socialMedia,
        heroSlides
    };
}