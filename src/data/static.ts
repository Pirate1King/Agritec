import { Solution, Product, SolutionCombo } from "@/lib/types";

export const sampleProducts: Product[] = [
  {
    id: "f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1",
    name: "Bộ điều khiển tưới Agritec Flow",
    slug: "bo-dieu-khien-tuoi-agritec-flow",
    category: "Tưới tiêu",
    excerpt: "Điều khiển tự động, lịch tưới thông minh, giám sát áp lực theo thời gian thực.",
    description: "Module điều khiển trung tâm hỗ trợ đa van, lập lịch tưới linh hoạt, cảnh báo rò rỉ và thiếu áp, tích hợp 4G/LoRa.",
    usage: "Kết nối van và cảm biến áp suất, cấu hình lịch qua ứng dụng Agritec Cloud.",
    unit: "bộ",
    price: 18500000,
    images: [
      {
        id: "3fb2a9a5-0bdd-4e5b-a18c-b98b8d8d181a",
        url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
        is_primary: true
      },
      {
        id: "f3bf67a3-37fe-40b7-96fa-7139bc383c43",
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
        is_primary: false
      }
    ]
  },
  {
    id: "3ab5a19a-5534-43ce-bcce-408e0ebd9e8a",
    name: "Cảm biến thời tiết Agritec Clima",
    slug: "cam-bien-thoi-tiet-agritec-clima",
    category: "IoT cảm biến",
    excerpt: "Theo dõi vi khí hậu 24/7: mưa, gió, nhiệt, ẩm, bức xạ.",
    description: "Trạm thời tiết IoT dùng năng lượng mặt trời, kết nối 4G, chuẩn IP66, đồng bộ dữ liệu thời gian thực.",
    usage: "Lắp đặt tại ruộng, kết nối gateway Agritec, xem dashboard trên web.",
    unit: "bộ",
    price: 12500000,
    images: [
      {
        id: "98dabdf4-5764-4d65-b391-b7f5f2f3e088",
        url: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80",
        is_primary: true
      }
    ]
  },
  {
    id: "e85c3d1f-8b6b-4ec0-934a-74b903a4eb59",
    name: "Van điện từ chịu mặn",
    slug: "van-dien-tu-chiu-man",
    category: "Thiết bị phụ trợ",
    excerpt: "Van bền bỉ, chịu mặn, phù hợp vùng ven biển, hỗ trợ điều khiển từ xa.",
    description: "Thân đồng, gioăng EPDM, áp suất làm việc 0.2-8 bar, tương thích bộ điều khiển Agritec Flow.",
    usage: "Lắp đặt trên đường ống chính, kết nối dây tín hiệu đến tủ điều khiển.",
    unit: "cái",
    price: 2200000,
    images: [
      {
        id: "2d1b5e87-69c0-4a87-8c1a-2e312c6f0c55",
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
        is_primary: true
      }
    ]
  },
  {
    id: "0dc648c8-72ae-4c35-bc96-1abef7513885",
    name: "Phân bón lá Agritec Nutrient",
    slug: "phan-bon-la-agritec-nutrient",
    category: "Dinh dưỡng",
    excerpt: "Công thức NPK + vi lượng tối ưu cho rau màu và cây ăn quả, dễ pha, ít cặn.",
    description: "Tăng khả năng quang hợp, phục hồi sau thu hoạch, giảm sốc nhiệt. Sử dụng cho cả hệ thống tưới nhỏ giọt.",
    usage: "Pha 50-80ml/ bình 16L hoặc theo khuyến nghị Agritec.",
    unit: "chai 1L",
    price: 980000,
    images: [
      {
        id: "a6c6e403-547d-43e8-9d1d-5c6d68a2616f",
        url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
        is_primary: true
      }
    ]
  }
];

export const sampleSolutions: Solution[] = [
  {
    id: "6d4b0f7a-1e7c-4a47-9b1d-573f07a3b4d1",
    title: "Tưới nhỏ giọt thông minh",
    slug: "tuoi-nho-giot-thong-minh",
    excerpt: "Giảm 30-40% lượng nước, kiểm soát áp lực và lịch tưới tự động cho trang trại 5-50ha.",
    hero_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
    problem: "Thiếu nhân công, thất thoát nước và áp lực không ổn định gây hỏng đường ống, cây sinh trưởng không đồng đều.",
    solution: "Agritec Flow + van chịu mặn + cảnh báo áp lực giúp tưới chuẩn xác, giảm thất thoát và đảm bảo cây nhận đúng lượng nước.",
    benefits: [
      { title: "Tiết kiệm 30% nước", detail: "Giám sát áp lực, rò rỉ, lập lịch tưới chuẩn theo giai đoạn sinh trưởng." },
      { title: "Quản lý từ xa", detail: "Ứng dụng web/mobile, cảnh báo tức thì qua SMS/Zalo." },
      { title: "Bảo trì chủ động", detail: "Theo dõi lưu lượng, cảnh báo tắc nghẽn để xử lý sớm." }
    ],
    products: [sampleProducts[0], sampleProducts[2]].map((p, idx) => ({ ...p, linkQuantity: idx === 0 ? 1 : 10 })),
    combos: [
      {
        id: "9f9fa5d1-5112-4e5e-bae3-08949fd89c7a",
        name: "Combo tưới tiết kiệm 5ha",
        slug: "combo-tuoi-5ha",
        description: "Tối ưu cho 5-10ha, tích hợp cảnh báo áp lực.",
        price: 39000000,
        items: [
          { product_id: sampleProducts[0].id, quantity: 1, product: sampleProducts[0] },
          { product_id: sampleProducts[2].id, quantity: 10, product: sampleProducts[2] }
        ]
      }
    ]
  },
  {
    id: "eaf94c14-5cc6-4d6c-8200-6c1ba695903f",
    title: "Giám sát vi khí hậu",
    slug: "giam-sat-vi-khi-hau",
    excerpt: "Dữ liệu thời tiết tại ruộng theo thời gian thực, cảnh báo sương, mưa, gió mạnh.",
    hero_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    problem: "Thiếu dữ liệu thực địa khiến lịch tưới bón sai lệch, tăng rủi ro bệnh hại và giảm năng suất.",
    solution: "Trạm Clima thu thập dữ liệu 24/7, dashboard cảnh báo giúp quyết định tưới, phun, thu hoạch chính xác.",
    benefits: [
      { title: "Ra quyết định nhanh", detail: "Dữ liệu mưa/gió/bức xạ theo thời gian thực, cảnh báo ngưỡng." },
      { title: "Giảm rủi ro bệnh hại", detail: "Dự đoán sương giá, độ ẩm lá để tối ưu lịch phun và phòng bệnh." },
      { title: "Tích hợp tưới", detail: "Kết nối bộ điều khiển để tự động bật tưới khi đất khô." }
    ],
    products: [sampleProducts[0], sampleProducts[1]].map((p) => ({ ...p, linkQuantity: 1 })),
    combos: [
      {
        id: "ab0c5bb4-e1f9-4e67-94c9-395bba1fed26",
        name: "Combo giám sát khí hậu",
        slug: "combo-khi-hau",
        description: "Bao gồm trạm thời tiết + gateway điều khiển tưới.",
        price: 26500000,
        items: [
          { product_id: sampleProducts[1].id, quantity: 1, product: sampleProducts[1] },
          { product_id: sampleProducts[0].id, quantity: 1, product: sampleProducts[0] }
        ]
      }
    ]
  },
  {
    id: "c7f154f1-65b1-4a6a-9e9c-9f4ae4d9a7de",
    title: "Dinh dưỡng chính xác",
    slug: "dinh-duong-chinh-xac",
    excerpt: "Công thức dinh dưỡng và tưới bón chuẩn theo từng giai đoạn sinh trưởng.",
    hero_url: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1600&q=80",
    problem: "Bón không đều và quá tay làm tăng chi phí, nguy cơ ngộ độc rễ và suy cây.",
    solution: "Công thức Nutrient + lịch bón chuẩn, tích hợp hệ thống tưới nhỏ giọt cho phân bổ đồng đều.",
    benefits: [
      { title: "Tăng 12-18% năng suất", detail: "Dinh dưỡng chính xác, giảm hao hụt và sốc rễ." },
      { title: "Tiết kiệm nhân công", detail: "Pha sẵn, định lượng chuẩn, tích hợp hệ thống tưới." },
      { title: "Tuân thủ truy xuất", detail: "Lưu vết lô hàng, lịch bón theo lô sản xuất." }
    ],
    products: [sampleProducts[0], sampleProducts[3]].map((p, idx) => ({ ...p, linkQuantity: idx === 0 ? 1 : 10 })),
    combos: [
      {
        id: "b8402d79-8d51-4fb1-a1a5-8a68670c32c2",
        name: "Combo dinh dưỡng chính xác",
        slug: "combo-dinh-duong",
        description: "Dành cho trang trại rau màu, tích hợp tưới và pha dinh dưỡng.",
        price: 13500000,
        items: [
          { product_id: sampleProducts[3].id, quantity: 10, product: sampleProducts[3] },
          { product_id: sampleProducts[0].id, quantity: 1, product: sampleProducts[0] }
        ]
      }
    ]
  }
];

export const sampleCombos: SolutionCombo[] = sampleSolutions.flatMap((solution) => solution.combos || []);
