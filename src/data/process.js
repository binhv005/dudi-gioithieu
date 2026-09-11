// 6 Bước quy trình làm việc - Stepper Data
export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Tiếp nhận nhu cầu",
    desc: "Trao đổi mục tiêu, tư vấn gói phù hợp ngân sách.",
    input: "Form yêu cầu, tư liệu cơ bản",
    output: "Bảng tóm tắt yêu cầu dự án"
  },
  {
    step: "02",
    title: "Chốt Sitemap & Khung trang",
    desc: "Lập cấu trúc cây thư mục và dàn trang chuẩn.",
    input: "Danh sách trang & tư liệu",
    output: "Sitemap chi tiết thống nhất"
  },
  {
    step: "03",
    title: "Duyệt Giao diện UI",
    desc: "Thiết kế layout trực quan theo nhận diện.",
    input: "Sitemap & Brand guidelines",
    output: "Layout UI khách hàng phê duyệt"
  },
  {
    step: "04",
    title: "Lập trình & Tối ưu",
    desc: "Viết mã responsive, tích hợp form và CRUD.",
    input: "UI đã duyệt & nội dung",
    output: "Bản thử nghiệm trên Staging"
  },
  {
    step: "05",
    title: "Kiểm thử & Nghiệm thu",
    desc: "Audit tốc độ, cross-browser, form và SEO.",
    input: "Website staging hoàn chỉnh",
    output: "Biên bản nghiệm thu kỹ thuật"
  },
  {
    step: "06",
    title: "Deploy & Bàn giao",
    desc: "Trỏ domain, cấu hình SSL và hướng dẫn CMS.",
    input: "Hosting & Domain kết nối",
    output: "Website live & Mã nguồn"
  }
];
