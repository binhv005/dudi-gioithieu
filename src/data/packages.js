// Single Source of Truth cho 3 gói dịch vụ - Tối ưu ngắn gọn dạng Tag & Micro-metrics
export const PACKAGES = [
  {
    id: "basic",
    name: "Cơ bản",
    price: "3.000.000đ",
    priceLabel: "Từ",
    badge: "Tiết kiệm",
    target: "Hộ kinh doanh / Cá nhân",
    objective: "Website giới thiệu tinh gọn",
    features: [
      { text: "Tối đa 4 trang cơ bản", highlight: true },
      { text: "Giao diện mẫu có sẵn" },
      { text: "100% Responsive mobile" },
      { text: "Form liên hệ chuẩn" },
      { text: "SEO On-page cơ bản" },
      { text: "Bàn giao mã nguồn" }
    ],
    limitations: ["Không CMS quản trị", "Không module Blog/Dự án"],
    ctaText: "Chọn gói Cơ bản"
  },
  {
    id: "standard",
    name: "Tiêu chuẩn",
    price: "7.000.000đ",
    priceLabel: "Từ",
    recommended: true,
    badge: "Khuyên dùng nhiều nhất",
    target: "Doanh nghiệp nhỏ",
    objective: "Chuyên nghiệp & Tự quản trị",
    features: [
      { text: "Tối đa 6 trang hoàn chỉnh", highlight: true },
      { text: "UI tinh chỉnh theo ngành", highlight: true },
      { text: "Trang quản trị CMS tự sửa bài", highlight: true },
      { text: "Module Blog tin tức 1 cấp" },
      { text: "Trang dự án / đối tác tĩnh" },
      { text: "Form lead gắn nguồn UTM" },
      { text: "SEO On-page toàn diện & GA4" },
      { text: "Khả năng mở rộng tương lai" }
    ],
    limitations: [],
    ctaText: "Chọn gói Tiêu chuẩn"
  },
  {
    id: "premium",
    name: "Cao cấp",
    price: null,
    priceLabel: "Liên hệ",
    badge: "May đo thương hiệu",
    target: "Doanh nghiệp định vị & Thu lead",
    objective: "Thiết kế riêng & Tối ưu chuyển đổi",
    features: [
      { text: "8–12 trang sitemap riêng", highlight: true },
      { text: "UI may đo theo Brand Guidelines", highlight: true },
      { text: "CRUD quản trị đa nội dung", highlight: true },
      { text: "Blog đa cấp + Showcase dự án" },
      { text: "Phễu form lead tùy biến sâu" },
      { text: "Schema JSON-LD & Tracking GA4" },
      { text: "Kiến trúc module hóa linh hoạt" }
    ],
    limitations: [],
    ctaText: "Gửi nhu cầu báo giá"
  }
];

export const PRICING_DISCLAIMER = {
  title: "Lưu ý về chi phí:",
  content: "Giá 3.000.000đ và 7.000.000đ là giá tham khảo theo dự án, thanh toán một lần (không phải phí duy trì hàng tháng). Gói Cao cấp được báo giá chính xác sau khi chốt sitemap và chức năng.",
  excluded: "Chưa bao gồm: Domain, Hosting, Email doanh nghiệp, viết bài/chụp ảnh, và các hệ thống nghiệp vụ phức tạp (Booking chuyên sâu, Marketplace, ERP/CRM, Cổng thanh toán)."
};

export const TERMINOLOGY = [
  { term: "Giao diện mẫu", desc: "Tinh chỉnh màu, font, ảnh, bố cục từ component có sẵn." },
  { term: "CRUD cơ bản", desc: "Thêm, sửa, xóa 01 loại bài viết/dịch vụ với trường cố định." },
  { term: "CRUD nâng cao", desc: "Nhiều loại nội dung, trường tùy biến, trạng thái Draft/Published." },
  { term: "SEO On-page", desc: "Audit thẻ Title, Meta, Heading, Sitemap, Robots, nén ảnh, tốc độ." },
  { term: "Thu lead nâng cao", desc: "Form đa trường, tự động lưu UTM chiến dịch và nguồn giới thiệu." },
  { term: "Tối ưu tốc độ", desc: "Nén ảnh WebP, Lazy-load, cache CSS/JS tải trang dưới 2s." }
];
