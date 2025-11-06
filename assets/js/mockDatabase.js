// ===== MOCK DATABASE - TRƯỜNG MẦM NON TUỔI NGỌC =====
// File này chứa TẤT CẢ dữ liệu của website
// Chỉ cần sửa trong file này là cập nhật toàn bộ website

const MOCK_DATABASE = {
  // ===== THÔNG TIN CƠ BẢN TRƯỜNG =====
  schoolInfo: {
    name: "Trường Mầm non Tuổi Ngọc",
    shortName: "Tuổi Ngọc",
    englishName: "Tuoi Ngoc Kindergarten",
    foundedYear: 2014,
    address: {
      full: "Xã Quảng Phú, Huyện Cư M'gar, Tỉnh Đắk Lắk",
      ward: "Xã Quảng Phú",
      district: "Huyện Cư M'gar",
      province: "Tỉnh Đắk Lắk",
    },
    contact: {
      phone: "0262.123.4567",
      email: "tuoinoc@gmail.com",
      website: "https://thaidinhduc37.github.io/mntn",
      facebook: "https://facebook.com/truongmamnontuoingoc",
      youtube: "https://youtube.com/@truongmamnontuoingoc",
    },
    workingHours: {
      weekdays: "6:30 - 17:30",
      saturday: "6:30 - 12:00",
      sunday: "Nghỉ",
    },
    leadership: {
      principal: "Cô Nguyễn Thị Hoa",
      vicePrincipal: "Cô Trần Văn Minh",
      academicDirector: "Cô Lê Thị Lan",
    },
  },

  // ===== THỐNG KÊ TRƯỜNG =====
  statistics: {
    students: 120,
    teachers: 15,
    classes: 6,
    yearsInOperation: 10,
    graduatedStudents: 800,
    awards: 12,
  },

  // ===== LỊCH SỬ VÀ GIỚI THIỆU =====
  aboutUs: {
    history: `Trường Mầm non Tuổi Ngọc được thành lập vào năm 2014 với mục đích cung cấp dịch vụ giáo dục mầm non chất lượng cho trẻ em trên địa bàn xã Quảng Phú. Qua 10 năm phát triển, trường đã trở thành một cơ sở giáo dục đáng tin cậy của cộng đồng địa phương.`,

    mission: `Nuôi dạy những hạt giống tương lai với tình yêu, trách nhiệm và chuyên nghiệp. Tạo môi trường an toàn, lành mạnh, thúc đẩy sự phát triển toàn diện về thể chất, trí tuệ, cảm xúc và xã hội cho trẻ.`,

    vision: `Trở thành trường mầm non hàng đầu tại địa bàn, được cộng đồng tin tưởng, nơi mỗi trẻ em được yêu thương, chăm sóc và phát triển toàn diện theo tiềm năng của mình.`,

    coreValues: [
      {
        title: "Tình yêu thương",
        description:
          "Chúng tôi yêu thương mỗi trẻ em như những đứa con của mình",
      },
      {
        title: "An toàn",
        description: "Bảo đảm an toàn tuyệt đối cho trẻ em trong mọi hoạt động",
      },
      {
        title: "Chuyên nghiệp",
        description: "Áp dụng các phương pháp giáo dục hiện đại và khoa học",
      },
      {
        title: "Phát triển toàn diện",
        description:
          "Phát triển mọi khía cạnh của trẻ: thể chất, trí tuệ, cảm xúc, xã hội",
      },
    ],
  },

  // ===== CƠ SỞ VẬT CHẤT =====
  facilities: [
    {
      name: "Phòng học",
      description:
        "6 phòng học được trang bị đầy đủ tiện nghi, đồ chơi và dụng cụ học tập",
      features: [
        "Máy lạnh",
        "Tivi thông minh",
        "Bàn ghế phù hợp",
        "Đồ chơi giáo dục",
      ],
    },
    {
      name: "Sân chơi ngoài trời",
      description: "Sân chơi rộng với các thiết bị vui chơi an toàn",
      features: ["Cầu trượt", "Xích đu", "Bập bênh", "Hồ cát", "Sân bóng mini"],
    },
    {
      name: "Phòng ăn",
      description: "Phòng ăn sạch sẽ, bếp nấu ăn chuẩn ATTP",
      features: ["Bàn ăn trẻ em", "Bếp hiện đại", "Tủ lạnh", "Máy lọc nước"],
    },
    {
      name: "Phòng ngủ",
      description: "Phòng ngủ thoáng mát với giường ngủ riêng biệt",
      features: ["Giường đơn", "Điều hòa", "Tủ đồ cá nhân", "Đèn ngủ"],
    },
    {
      name: "Thư viện",
      description: "Thư viện với sách tranh, đĩa DVD giáo dục",
      features: [
        "Sách tranh",
        "Truyện thiếu nhi",
        "DVD giáo dục",
        "Khu đọc sách",
      ],
    },
    {
      name: "Phòng y tế",
      description: "Phòng y tế với đầy đủ thiết bị sơ cứu",
      features: ["Tủ thuốc", "Cân sức khỏe", "Nhiệt kế", "Giường nghỉ"],
    },
  ],

  // ===== CHƯƠNG TRÌNH GIÁO DỤC =====
  programs: [
    {
      id: "nha-tre",
      name: "Nhóm Nhà trẻ",
      ageRange: "18-30 tháng",
      description: "Chăm sóc và giáo dục trẻ nhỏ với sự quan tâm đặc biệt",
      objectives: [
        "Phát triển kỹ năng vận động cơ bản",
        "Học tập qua vui chơi",
        "Rèn luyện thói quen sinh hoạt",
        "Phát triển ngôn ngữ sơ khởi",
      ],
      activities: [
        "Vui chơi với đồ chơi an toàn",
        "Học hát, học nói qua trò chơi",
        "Tập đi, tập nói",
        "Ăn uống đúng giờ",
        "Ngủ trưa theo lịch",
      ],
      curriculum: "Chương trình nhà trẻ theo quy định của Bộ GD&ĐT",
    },
    {
      id: "mau-giao-nho",
      name: "Nhóm Mẫu giáo nhỏ",
      ageRange: "3-4 tuổi",
      description: "Phát triển toàn diện các kỹ năng cơ bản",
      objectives: [
        "Phát triển ngôn ngữ và giao tiếp",
        "Học số đếm và nhận biết hình khối",
        "Rèn luyện kỹ năng xã hội",
        "Phát triển tư duy sáng tạo",
      ],
      activities: [
        "Kể chuyện và đọc sách tranh",
        "Vẽ, tô màu và làm thủ công",
        "Chơi các trò chơi nhóm",
        "Học hát và múa",
        "Hoạt động ngoài trời",
      ],
      curriculum: "Chương trình mẫu giáo theo định hướng phát triển năng lực",
    },
    {
      id: "mau-giao-lon",
      name: "Nhóm Mẫu giáo lớn",
      ageRange: "4-5 tuổi",
      description: "Chuẩn bị toàn diện cho trẻ bước vào lớp 1",
      objectives: [
        "Làm quen với chữ số và chữ cái",
        "Phát triển tư duy logic",
        "Chuẩn bị vào lớp 1",
        "Rèn luyện kỹ năng tự lập",
      ],
      activities: [
        "Học viết chữ cái và số",
        "Toán học cơ bản",
        "Đọc hiểu câu chuyện",
        "Thực hành kỹ năng sống",
        "Tham gia hoạt động nhóm",
      ],
      curriculum: "Chương trình chuẩn bị vào lớp 1",
    },
  ],

  // ===== ĐỘI NGŨ GIÁO VIÊN =====
  teachers: [
    {
      id: 1,
      name: "Cô Nguyễn Thị Hoa",
      position: "Hiệu trưởng",
      education: "Thạc sĩ Giáo dục Mầm non - ĐH Sư phạm Hà Nội",
      experience: "15 năm",
      specialization: "Quản lý giáo dục, Tâm lý trẻ em",
      achievements: ["Giáo viên ưu tú cấp tỉnh", "Bằng khen của UBND tỉnh"],
      phone: "0905.123.456",
      email: "hoa.nt@tuoingoc.edu.vn",
    },
    {
      id: 2,
      name: "Cô Trần Văn Minh",
      position: "Phó Hiệu trưởng",
      education: "Cử nhân Giáo dục Mầm non - ĐH Sư phạm TP.HCM",
      experience: "12 năm",
      specialization: "Quản lý chương trình, Phát triển năng lực",
      achievements: [
        "Giáo viên dạy giỏi cấp huyện",
        "Tập thể lao động xuất sắc",
      ],
      phone: "0905.234.567",
      email: "minh.tv@tuoingoc.edu.vn",
    },
    {
      id: 3,
      name: "Cô Lê Thị Lan",
      position: "Trưởng bộ môn",
      education: "Cao đẳng Sư phạm Mầm non - CĐ Sư phạm Đắk Lắk",
      experience: "10 năm",
      specialization: "Chăm sóc trẻ nhỏ, Dinh dưỡng trẻ em",
      achievements: ["Cán bộ xuất sắc", "Giấy khen của Sở GD&ĐT"],
      phone: "0905.345.678",
      email: "lan.lt@tuoingoc.edu.vn",
    },
    {
      id: 4,
      name: "Cô Phạm Thị Mai",
      position: "Giáo viên lớp Mẫu giáo lớn",
      education: "Cử nhân Giáo dục Mầm non - ĐH Sư phạm Đà Nẵng",
      experience: "8 năm",
      specialization: "Chuẩn bị vào lớp 1, Phát triển ngôn ngữ",
      achievements: ["Giáo viên tiêu biểu", "Lớp học xuất sắc 3 năm liên tiếp"],
      phone: "0905.456.789",
      email: "mai.pt@tuoingoc.edu.vn",
    },
    {
      id: 5,
      name: "Cô Võ Thị Hương",
      position: "Giáo viên lớp Mẫu giáo nhỏ",
      education: "Cao đẳng Sư phạm Mầm non - CĐ Sư phạm Đắk Lắk",
      experience: "6 năm",
      specialization: "Phát triển vận động, Hoạt động nghệ thuật",
      achievements: ["Giáo viên trẻ tiêu biểu", "Bài giảng hay cấp trường"],
      phone: "0905.567.890",
      email: "huong.vt@tuoingoc.edu.vn",
    },
  ],

  // ===== TIN TỨC & THÔNG BÁO =====
  news: [
    {
      id: 1,
      title: "Thông báo tuyển sinh năm học 2024-2025",
      summary: "Trường thông báo tuyển sinh cho năm học mới với nhiều ưu đãi",
      content: `
                <p>Trường Mầm non Tuổi Ngọc thông báo tuyển sinh cho năm học 2024-2025.</p>
                <h3>Đối tượng tuyển sinh:</h3>
                <ul>
                    <li>Nhóm Nhà trẻ: Trẻ từ 18-30 tháng tuổi</li>
                    <li>Nhóm Mẫu giáo nhỏ: Trẻ từ 3-4 tuổi</li>
                    <li>Nhóm Mẫu giáo lớn: Trẻ từ 4-5 tuổi</li>
                </ul>
                <h3>Thời gian đăng ký:</h3>
                <p>Từ ngày 15/3/2024 đến hết ngày 30/4/2024</p>
                <h3>Hồ sơ nhập học:</h3>
                <ul>
                    <li>Đơn đăng ký nhập học</li>
                    <li>Giấy khai sinh (bản chính)</li>
                    <li>Sổ tiêm chủng đầy đủ</li>
                    <li>Giấy khám sức khỏe</li>
                    <li>4 ảnh 3x4 của trẻ</li>
                </ul>
            `,
      category: "Thông báo",
      date: "2024-03-15",
      author: "Ban Giám hiệu",
      featured: true,
      image: "assets/images/news/tuyen-sinh-2024.jpg",
    },
    {
      id: 2,
      title: "Khai giảng năm học mới 2024-2025",
      summary:
        "Lễ khai giảng năm học mới diễn ra long trọng với nhiều hoạt động ý nghĩa",
      content: `
                <p>Sáng ngày 5/9/2024, Trường Mầm non Tuổi Ngọc đã tổ chức Lễ khai giảng năm học 2024-2025.</p>
                <p>Lễ khai giảng có sự tham dự của:</p>
                <ul>
                    <li>Đại diện UBND xã Quảng Phú</li>
                    <li>Phòng GD&ĐT huyện Cư M'gar</li>
                    <li>Toàn thể cán bộ, giáo viên, nhân viên</li>
                    <li>Phụ huynh và các em học sinh</li>
                </ul>
                <p>Năm học này, trường đón nhận 120 học sinh chia thành 6 lớp.</p>
            `,
      category: "Sự kiện",
      date: "2024-09-05",
      author: "Phòng Đào tạo",
      featured: false,
      image: "assets/images/news/khai-giang-2024.jpg",
    },
    {
      id: 3,
      title: "Hoạt động Trung thu 2024",
      summary: "Tết Trung thu ấm áp với nhiều hoạt động vui nhộn cho các em",
      content: `
                <p>Nhân dịp Tết Trung thu, trường đã tổ chức nhiều hoạt động ý nghĩa:</p>
                <h3>Các hoạt động chính:</h3>
                <ul>
                    <li>Múa lân sư rồng</li>
                    <li>Thi làm bánh trung thu</li>
                    <li>Kể chuyện cổ tích về chú Cuội</li>
                    <li>Đèn lồng rước phố</li>
                    <li>Liên hoan ca nhạc</li>
                </ul>
                <p>Chương trình đã để lại nhiều kỷ niệm đẹp cho các em học sinh.</p>
            `,
      category: "Hoạt động",
      date: "2024-09-17",
      author: "Đoàn thanh niên",
      featured: false,
      image: "assets/images/news/trung-thu-2024.jpg",
    },
    {
      id: 4,
      title: "Khám sức khỏe định kỳ học kỳ I",
      summary: "Khám sức khỏe định kỳ giúp theo dõi sự phát triển của trẻ",
      content: `
                <p>Trường phối hợp với Trung tâm Y tế xã Quảng Phú tổ chức khám sức khỏe định kỳ cho toàn thể học sinh.</p>
                <h3>Nội dung khám:</h3>
                <ul>
                    <li>Đo chiều cao, cân nặng</li>
                    <li>Khám mắt, tai mũi họng</li>
                    <li>Khám răng miệng</li>
                    <li>Khám tổng quát</li>
                    <li>Tư vấn dinh dưỡng</li>
                </ul>
                <p>Kết quả: 98% học sinh có sức khỏe tốt và phát triển bình thường.</p>
            `,
      category: "Sức khỏe",
      date: "2024-10-20",
      author: "Phòng Y tế",
      featured: false,
      image: "assets/images/news/kham-suc-khoe.jpg",
    },
    {
      id: 5,
      title: "Hội thi giáo viên dạy giỏi cấp huyện",
      summary: "Cô Phạm Thị Mai đạt giải nhì hội thi giáo viên dạy giỏi",
      content: `
                <p>Cô Phạm Thị Mai - giáo viên lớp Mẫu giáo lớn đã tham gia hội thi giáo viên dạy giỏi cấp huyện.</p>
                <h3>Thành tích đạt được:</h3>
                <ul>
                    <li>Giải nhì toàn đoàn</li>
                    <li>Giải nhất phần thuyết trình</li>
                    <li>Giải khuyến khích phần dạy thực hành</li>
                </ul>
                <p>Đây là kết quả của sự nỗ lực không ngừng trong công tác giảng dạy.</p>
            `,
      category: "Thành tích",
      date: "2024-11-02",
      author: "Ban Giám hiệu",
      featured: false,
      image: "assets/images/news/giao-vien-gioi.jpg",
    },
  ],

  // ===== THỰC ĐƠN & DINH DƯỠNG =====
  menu: {
    week1: {
      monday: {
        breakfast: "Cháo thịt bằm + Bánh mì + Sữa",
        lunch: "Cơm + Canh chua cá + Thịt kho tàu + Rau luộc",
        snack: "Bánh quy + Nước ép cam",
      },
      tuesday: {
        breakfast: "Phở gà + Bánh bao + Sữa chua",
        lunch: "Cơm + Canh rau cải + Gà rang gừng + Đậu hũ sốt cà",
        snack: "Bánh flan + Nước chanh",
      },
      wednesday: {
        breakfast: "Bún bò + Bánh mì pate + Sữa",
        lunch: "Cơm + Canh bí đỏ + Cá kho tiêu + Rau muống xào",
        snack: "Chè đậu xanh + Bánh su kem",
      },
      thursday: {
        breakfast: "Cháo cá + Bánh ngọt + Sữa đậu nành",
        lunch: "Cơm + Canh chua tôm + Thịt luộc + Bắp cải xào",
        snack: "Yaourt + Bánh crackers",
      },
      friday: {
        breakfast: "Mì Quảng + Bánh bông lan + Sữa",
        lunch: "Cơm + Canh khổ qua + Cá chiên + Rau dền luộc",
        snack: "Trái cây theo mùa + Bánh quy",
      },
    },
  },

  // ===== ALBUM HÌNH ẢNH =====
  gallery: [
    {
      id: 1,
      title: "Lễ khai giảng năm học 2024-2025",
      description: "Những khoảnh khắc đầy ý nghĩa trong ngày khai giảng",
      category: "events",
      images: [
        "assets/images/gallery/khai-giang-1.jpg",
        "assets/images/gallery/khai-giang-2.jpg",
        "assets/images/gallery/khai-giang-3.jpg",
      ],
      date: "2024-09-05",
    },
    {
      id: 2,
      title: "Hoạt động học tập trong lớp",
      description: "Các em chăm chỉ học tập và vui chơi",
      category: "classroom",
      images: [
        "assets/images/gallery/hoc-tap-1.jpg",
        "assets/images/gallery/hoc-tap-2.jpg",
        "assets/images/gallery/hoc-tap-3.jpg",
        "assets/images/gallery/hoc-tap-4.jpg",
      ],
      date: "2024-10-15",
    },
    {
      id: 3,
      title: "Vui chơi ngoài trời",
      description: "Thời gian vui chơi và rèn luyện thể chất",
      category: "activities",
      images: [
        "assets/images/gallery/vui-choi-1.jpg",
        "assets/images/gallery/vui-choi-2.jpg",
        "assets/images/gallery/vui-choi-3.jpg",
      ],
      date: "2024-10-20",
    },
    {
      id: 4,
      title: "Cơ sở vật chất hiện đại",
      description: "Không gian học tập và sinh hoạt tốt nhất",
      category: "facilities",
      images: [
        "assets/images/gallery/co-so-1.jpg",
        "assets/images/gallery/co-so-2.jpg",
        "assets/images/gallery/co-so-3.jpg",
        "assets/images/gallery/co-so-4.jpg",
      ],
      date: "2024-08-20",
    },
  ],

  // ===== THÀNH TÍCH & GIẢI THƯỞNG =====
  achievements: [
    {
      year: 2024,
      title: "Tập thể lao động xuất sắc",
      description: "Bằng khen của UBND tỉnh Đắk Lắk",
      category: "Tập thể",
    },
    {
      year: 2023,
      title: "Trường đạt chuẩn Quốc gia mức độ 1",
      description: "Quyết định công nhận của Bộ GD&ĐT",
      category: "Chất lượng",
    },
    {
      year: 2023,
      title: "Giáo viên dạy giỏi cấp tỉnh",
      description: "Cô Nguyễn Thị Hoa - Giải nhất",
      category: "Cá nhân",
    },
    {
      year: 2022,
      title: "Trường tiêu biểu về ATVSTP",
      description: "Bằng khen của Chi cục ATTP tỉnh",
      category: "An toàn",
    },
  ],

  // ===== LỊCH HỌC & HOẠT ĐỘNG =====
  schedule: {
    dailySchedule: [
      { time: "6:30 - 7:30", activity: "Đón trẻ, vệ sinh cá nhân" },
      { time: "7:30 - 8:00", activity: "Ăn sáng" },
      { time: "8:00 - 9:00", activity: "Hoạt động giáo dục" },
      { time: "9:00 - 9:15", activity: "Ăn phụ buổi sáng" },
      { time: "9:15 - 10:30", activity: "Hoạt động ngoài trời" },
      { time: "10:30 - 11:30", activity: "Hoạt động giáo dục" },
      { time: "11:30 - 12:30", activity: "Ăn trưa" },
      { time: "12:30 - 14:30", activity: "Ngủ trưa" },
      { time: "14:30 - 15:00", activity: "Vệ sinh, ăn phụ" },
      { time: "15:00 - 16:00", activity: "Hoạt động tự do" },
      { time: "16:00 - 17:30", activity: "Trả trẻ" },
    ],
    yearlyEvents: [
      { month: 3, event: "Tuyển sinh năm học mới" },
      { month: 9, event: "Khai giảng năm học" },
      { month: 10, event: "Ngày hội thể thao" },
      { month: 11, event: "Ngày nhà giáo Việt Nam" },
      { month: 12, event: "Noel và năm mới" },
      { month: 1, event: "Tết Nguyên đán" },
      { month: 3, event: "Ngày quốc tế phụ nữ" },
      { month: 6, event: "Ngày quốc tế thiếu nhi" },
    ],
  },

  // ===== CHÍNH SÁCH HỌC PHÍ =====
  tuition: {
    nhaTre: {
      monthly: 800000,
      registration: 200000,
      uniform: 150000,
      book: 100000,
    },
    mauGiaoNho: {
      monthly: 900000,
      registration: 200000,
      uniform: 150000,
      book: 120000,
    },
    mauGiaoLon: {
      monthly: 1000000,
      registration: 200000,
      uniform: 150000,
      book: 150000,
    },
    discounts: [
      { condition: "Con em cán bộ giáo viên", discount: "10%" },
      { condition: "Gia đình có từ 2 con trở lên", discount: "5%" },
      { condition: "Gia đình khó khăn có xác nhận", discount: "20%" },
    ],
  },

  // ===== CẤU HÌNH WEBSITE =====
  siteConfig: {
    theme: {
      primaryColor: "#1e40af",
      secondaryColor: "#059669",
      accentColor: "#dc2626",
    },
    features: {
      enableSlider: true,
      enableGallery: true,
      enableNews: true,
      enableContact: true,
    },
    seo: {
      title: "Trường Mầm non Tuổi Ngọc - Xã Quảng Phú, Đắk Lắk",
      description:
        "Trường Mầm non Tuổi Ngọc - Môi trường giáo dục chất lượng cho trẻ em tại xã Quảng Phú, tỉnh Đắk Lắk",
      keywords: "mầm non, trường mầm non, Tuổi Ngọc, Quảng Phú, Đắk Lắk",
    },
  },
};

// ===== HELPER FUNCTIONS =====
const DatabaseHelper = {
  // Lấy thông tin cơ bản trường
  getSchoolInfo: () => MOCK_DATABASE.schoolInfo,

  // Lấy thống kê
  getStatistics: () => MOCK_DATABASE.statistics,

  // Lấy tin tức (có thể filter theo category)
  getNews: (category = null, limit = null) => {
    let news = MOCK_DATABASE.news;
    if (category) {
      news = news.filter((item) => item.category === category);
    }
    if (limit) {
      news = news.slice(0, limit);
    }
    return news.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  // Lấy tin tức nổi bật
  getFeaturedNews: () => MOCK_DATABASE.news.filter((item) => item.featured),

  // Lấy chi tiết tin tức theo ID
  getNewsById: (id) => MOCK_DATABASE.news.find((item) => item.id === id),

  // Lấy chương trình giáo dục
  getPrograms: () => MOCK_DATABASE.programs,

  // Lấy chương trình theo ID
  getProgramById: (id) => MOCK_DATABASE.programs.find((item) => item.id === id),

  // Lấy danh sách giáo viên
  getTeachers: () => MOCK_DATABASE.teachers,

  // Lấy thông tin giáo viên theo ID
  getTeacherById: (id) => MOCK_DATABASE.teachers.find((item) => item.id === id),

  // Lấy album hình ảnh (có thể filter theo category)
  getGallery: (category = null) => {
    let gallery = MOCK_DATABASE.gallery;
    if (category) {
      gallery = gallery.filter((item) => item.category === category);
    }
    return gallery.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  // Lấy thực đơn tuần
  getMenu: (week = "week1") => MOCK_DATABASE.menu[week],

  // Lấy thành tích theo năm
  getAchievements: (year = null) => {
    let achievements = MOCK_DATABASE.achievements;
    if (year) {
      achievements = achievements.filter((item) => item.year === year);
    }
    return achievements.sort((a, b) => b.year - a.year);
  },

  // Lấy lịch học hàng ngày
  getDailySchedule: () => MOCK_DATABASE.schedule.dailySchedule,

  // Lấy sự kiện trong năm
  getYearlyEvents: () => MOCK_DATABASE.schedule.yearlyEvents,

  // Lấy thông tin học phí
  getTuition: () => MOCK_DATABASE.tuition,

  // Lấy cơ sở vật chất
  getFacilities: () => MOCK_DATABASE.facilities,

  // Lấy cấu hình website
  getSiteConfig: () => MOCK_DATABASE.siteConfig,

  // Format ngày tháng
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  // Format tiền tệ
  formatCurrency: (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  },
};

// Export cho browser
if (typeof window !== "undefined") {
  window.MOCK_DATABASE = MOCK_DATABASE;
  window.DatabaseHelper = DatabaseHelper;
}

// Export cho Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MOCK_DATABASE, DatabaseHelper };
}
