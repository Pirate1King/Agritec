from pathlib import Path
path = Path('src/app/(public)/page.tsx')
text = path.read_text(encoding='utf-8')
start = text.find('const processSteps = [')
if start == -1:
    raise SystemExit('not found')
end = text.find('];', start)
if end == -1:
    raise SystemExit('end not found')
end = end + 2
new_block = "const processSteps = [\n    { title: \"Khảo sát & đánh giá nước\", detail: \"Đo pH, độ cứng, kiểm tra nguồn nước và hạ tầng pha trộn/pha nước.\" },\n    { title: \"Thiết kế giải pháp\", detail: \"Đề xuất combo Acidex/Globacid + thiết bị pha Mixtron, tính liều và ROI.\" },\n    { title: \"Triển khai & hiệu chuẩn\", detail: \"Lắp đặt, hiệu chỉnh lưu lượng, chạy thử với cảm biến/điều khiển tưới Agritec.\" },\n    { title: \"Vận hành & giám sát\", detail: \"Dashboard, cảnh báo, hỗ trợ 24/7 qua Zalo 0977791412, tài liệu bàn giao.\" }\n  ];"
text = text[:start] + new_block + text[end:]
path.write_text(text, encoding='utf-8')
print('updated processSteps')
