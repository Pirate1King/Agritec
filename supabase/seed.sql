-- Seed data for Agritec (demo)
insert into public.solutions (id, slug, title, excerpt, hero_url, pdf_url, problem, solution, benefits, is_published) values
('6d4b0f7a-1e7c-4a47-9b1d-573f07a3b4d1','tuoi-nho-giot-thong-minh','Tưới nhỏ giọt thông minh','Giảm 30-40% lượng nước, kiểm soát áp lực và lịch tưới tự động cho trang trại 5-50ha.','https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80',null,'Thiếu nhân công, thất thoát nước và áp lực không ổn định gây hỏng đường ống, cây sinh trưởng không đồng đều.','Agritec Flow + van chịu mặn + cảnh báo áp lực giúp tưới chuẩn xác, giảm thất thoát và đảm bảo cây nhận đúng lượng nước.', $$
  [
    {"title":"Tiết kiệm 30% nước","detail":"Giám sát áp lực, rò rỉ, lập lịch tưới chuẩn."},
    {"title":"Quản lý từ xa","detail":"Ứng dụng web/mobile, cảnh báo tức thì qua SMS/Zalo."},
    {"title":"Bảo trì chủ động","detail":"Theo dõi lưu lượng, cảnh báo tắc nghẽn để xử lý sớm."}
  ]
$$::jsonb,true),
('eaf94c14-5cc6-4d6c-8200-6c1ba695903f','giam-sat-vi-khi-hau','Giám sát vi khí hậu','Dữ liệu thời tiết tại ruộng theo thời gian thực, cảnh báo sương, mưa, gió mạnh.','https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',null,'Thiếu dữ liệu thực địa khiến lịch tưới bón sai lệch, tăng rủi ro bệnh hại và giảm năng suất.','Trạm Clima thu thập dữ liệu 24/7, dashboard cảnh báo giúp quyết định tưới, phun, thu hoạch chính xác.', $$
  [
    {"title":"Ra quyết định nhanh","detail":"Dữ liệu mưa/gió/bức xạ theo thời gian thực, cảnh báo ngưỡng."},
    {"title":"Giảm rủi ro bệnh hại","detail":"Dự đoán sương giá, độ ẩm lá để tối ưu lịch phun."},
    {"title":"Tích hợp tưới","detail":"Kết nối bộ điều khiển để tự động bật tưới khi đất khô."}
  ]
$$::jsonb,true),
('c7f154f1-65b1-4a6a-9e9c-9f4ae4d9a7de','dinh-duong-chinh-xac','Dinh dưỡng chính xác','Công thức dinh dưỡng và tưới bón chuẩn theo từng giai đoạn sinh trưởng.','https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1600&q=80',null,'Bón không đều và quá tay làm tăng chi phí, nguy cơ ngộ độc rễ và suy cây.','Công thức Nutrient + lịch bón chuẩn, tích hợp hệ thống tưới nhỏ giọt cho phân bổ đồng đều.', $$
  [
    {"title":"Tăng 12-18% năng suất","detail":"Dinh dưỡng chính xác, giảm hao hụt."},
    {"title":"Tiết kiệm nhân công","detail":"Pha sẵn, định lượng chuẩn, tích hợp hệ thống tưới."},
    {"title":"Tuân thủ truy xuất","detail":"Lưu vết lô hàng, lịch bón."}
  ]
$$::jsonb,true)
on conflict (id) do nothing;

insert into public.products (id, slug, name, category, excerpt, description, usage, unit, price, is_published) values
('f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1','bo-dieu-khien-tuoi-agritec-flow','Bộ điều khiển tưới Agritec Flow','Tưới tiêu','Điều khiển tự động, lịch tưới thông minh, giám sát áp lực theo thời gian thực.','Module điều khiển trung tâm hỗ trợ đa van, lập lịch tưới linh hoạt, cảnh báo rò rỉ và thiếu áp, tích hợp 4G/LoRa.','Kết nối van và cảm biến áp suất, cấu hình lịch qua ứng dụng Agritec Cloud.','bộ',18500000,true),
('3ab5a19a-5534-43ce-bcce-408e0ebd9e8a','cam-bien-thoi-tiet-agritec-clima','Cảm biến thời tiết Agritec Clima','IoT cảm biến','Theo dõi vi khí hậu 24/7: mưa, gió, nhiệt, ẩm, bức xạ.','Trạm thời tiết IoT dùng năng lượng mặt trời, kết nối 4G, chuẩn IP66, đồng bộ dữ liệu thời gian thực.','Lắp đặt tại ruộng, kết nối gateway Agritec, xem dashboard trên web.','bộ',12500000,true),
('e85c3d1f-8b6b-4ec0-934a-74b903a4eb59','van-dien-tu-chiu-man','Van điện từ chịu mặn','Thiết bị phụ trợ','Van bền bỉ, chịu mặn, phù hợp vùng ven biển, hỗ trợ điều khiển từ xa.','Thân đồng, gioăng EPDM, áp suất làm việc 0.2-8 bar, tương thích bộ điều khiển Agritec Flow.','Lắp đặt trên đường ống chính, kết nối dây tín hiệu đến tủ điều khiển.','cái',2200000,true),
('0dc648c8-72ae-4c35-bc96-1abef7513885','phan-bon-la-agritec-nutrient','Phân bón lá Agritec Nutrient','Dinh dưỡng','Công thức NPK + vi lượng tối ưu cho rau màu và cây ăn quả, dễ pha, ít cặn.','Tăng khả năng quang hợp, phục hồi sau thu hoạch, giảm sốc nhiệt. Sử dụng cho cả hệ thống tưới nhỏ giọt.','Pha 50-80ml/ bình 16L hoặc theo khuyến nghị Agritec.','chai 1L',980000,true)
on conflict (id) do nothing;

insert into public.product_images (id, product_id, url, is_primary) values
('3fb2a9a5-0bdd-4e5b-a18c-b98b8d8d181a','f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1','https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80',true),
('f3bf67a3-37fe-40b7-96fa-7139bc383c43','f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1','https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',false),
('98dabdf4-5764-4d65-b391-b7f5f2f3e088','3ab5a19a-5534-43ce-bcce-408e0ebd9e8a','https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80',true),
('2d1b5e87-69c0-4a87-8c1a-2e312c6f0c55','e85c3d1f-8b6b-4ec0-934a-74b903a4eb59','https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',true),
('a6c6e403-547d-43e8-9d1d-5c6d68a2616f','0dc648c8-72ae-4c35-bc96-1abef7513885','https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80',true)
on conflict (id) do nothing;

insert into public.solution_products (solution_id, product_id, quantity) values
('6d4b0f7a-1e7c-4a47-9b1d-573f07a3b4d1','f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1',1),
('6d4b0f7a-1e7c-4a47-9b1d-573f07a3b4d1','e85c3d1f-8b6b-4ec0-934a-74b903a4eb59',10),
('eaf94c14-5cc6-4d6c-8200-6c1ba695903f','f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1',1),
('eaf94c14-5cc6-4d6c-8200-6c1ba695903f','3ab5a19a-5534-43ce-bcce-408e0ebd9e8a',1),
('c7f154f1-65b1-4a6a-9e9c-9f4ae4d9a7de','f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1',1),
('c7f154f1-65b1-4a6a-9e9c-9f4ae4d9a7de','0dc648c8-72ae-4c35-bc96-1abef7513885',10)
on conflict do nothing;

insert into public.solution_combos (id, solution_id, name, slug, description, price, is_active) values
('9f9fa5d1-5112-4e5e-bae3-08949fd89c7a','6d4b0f7a-1e7c-4a47-9b1d-573f07a3b4d1','Combo tưới tiết kiệm 5ha','combo-tuoi-5ha','Tối ưu cho 5-10ha, tích hợp cảnh báo áp lực.',39000000,true),
('ab0c5bb4-e1f9-4e67-94c9-395bba1fed26','eaf94c14-5cc6-4d6c-8200-6c1ba695903f','Combo giám sát khí hậu','combo-khi-hau','Bao gồm trạm thời tiết + gateway điều khiển tưới.',26500000,true),
('b8402d79-8d51-4fb1-a1a5-8a68670c32c2','c7f154f1-65b1-4a6a-9e9c-9f4ae4d9a7de','Combo dinh dưỡng chính xác','combo-dinh-duong','Dành cho trang trại rau màu, tích hợp tưới và pha dinh dưỡng.',13500000,true),
('2b6c05af-3e8d-4ccf-bd26-637c3b667cb2','6d4b0f7a-1e7c-4a47-9b1d-573f07a3b4d1','Combo tưới thông minh 10ha','combo-tuoi-10ha','Mở rộng cho 10ha, thêm cảm biến áp lực.',52000000,true)
on conflict (id) do nothing;

insert into public.combo_items (combo_id, product_id, quantity) values
('9f9fa5d1-5112-4e5e-bae3-08949fd89c7a','f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1',1),
('9f9fa5d1-5112-4e5e-bae3-08949fd89c7a','e85c3d1f-8b6b-4ec0-934a-74b903a4eb59',10),
('ab0c5bb4-e1f9-4e67-94c9-395bba1fed26','3ab5a19a-5534-43ce-bcce-408e0ebd9e8a',1),
('ab0c5bb4-e1f9-4e67-94c9-395bba1fed26','f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1',1),
('b8402d79-8d51-4fb1-a1a5-8a68670c32c2','0dc648c8-72ae-4c35-bc96-1abef7513885',10),
('b8402d79-8d51-4fb1-a1a5-8a68670c32c2','f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1',1),
('2b6c05af-3e8d-4ccf-bd26-637c3b667cb2','f1c44a9d-6ddc-4b80-94e2-54b03fa6c1b1',1),
('2b6c05af-3e8d-4ccf-bd26-637c3b667cb2','e85c3d1f-8b6b-4ec0-934a-74b903a4eb59',15)
on conflict do nothing;

insert into public.news (id, title, excerpt, image_url, link_url, sort_order, is_published) values
('d2f0f10c-7a32-4a3c-8f4c-6b47f5f2c101','Gia tang hieu qua chan nuoi an toan','Giai phap tong the giup giam rui ro benh va on dinh tang truong.','https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80','#',1,true),
('7e7f1d20-7e3d-42b5-9ac5-03e6a4c38c02','Toi uu dinh duong va tieu hoa','Combo sinh hoc ho tro duong ruot va giam ap luc khang sinh.','https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80','#',2,true),
('b08da0cb-2b5d-46b9-b5d0-1d8b681cdd03','Mo hinh trien khai theo giai doan','Danh gia hien trang, thiet ke giai phap va theo doi hieu qua.','https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80','#',3,true)
on conflict (id) do nothing;

insert into public.partners (id, name, logo_url, website_url, sort_order, is_active) values
('4f2c17c7-cc4d-4e49-a0b6-0f0a13f3c201','Agri Partner','https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80','#',1,true),
('5b9a4c50-1c86-4a65-98dd-3a6c11c1d202','Feed Mill Group','https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80','#',2,true),
('7a19fb86-1f15-4ed0-9c25-4580f2fb6203','Green Farm Co','https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80','#',3,true),
('c3f1d799-1cb0-4c6a-9f1c-5d420a7a6204','AgriTech Lab','https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80','#',4,true)
on conflict (id) do nothing;
