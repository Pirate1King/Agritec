from pathlib import Path
path = Path('src/app/(public)/page.tsx')
text = path.read_text(encoding='utf-8')
text = text.replace('title="N ¯?n t §œng gi §œi phA­p nA\'ng nghi ¯Øp dAÿnh cho doanh nghi ¯Øp"', 'title="Giải pháp xử lý nước + sinh học cho trang trại chuyên nghiệp"')
text = text.replace('subtitle="Agritec thi §¨t k §¨ vAÿ tri ¯Ÿn khai h ¯Ø th ¯
g t’ø ¯>i, giA­m sA­t vi khA- h §-u vAÿ dinh d’ø ¯­ng chA-nh xA­c cho trang tr §­i vAÿ nhAÿ phA›n ph ¯i."', 'subtitle="Chuyên tưới thông minh, sát trùng đường nước, kiểm soát tiêu chảy và dinh dưỡng chính xác cho farm 5–200ha."')
text = text.replace('{ label: "Xem gi §œi phA­p", href: "/giai-phap" }', '{ label: "Xem giải pháp", href: "/giai-phap" }')
text = text.replace('{ label: "Ž? ¯§út hAÿng", href: "/dat-hang" }', '{ label: "Đặt hàng", href: "/dat-hang" }')
text = text.replace('title="Gi §œi phA­p c ¯	 lAæi c ¯\'\u0165a Agritec"', 'title="Giải pháp trọng tâm của Agritec"')
text = text.replace('description="Thi §¨t k §¨ Ž ¯Ÿ gi §œi quy §¨t cA­c v §n Ž ¯? v §-n hAÿnh th ¯ñc t §¨: thi §¨u nhA›n cA\'ng, d ¯_ li ¯Øu r ¯?i r §­c, chi phA- n’ø ¯>c Ži ¯Øn tŽŸng cao."', 'description="Tưới nhỏ giọt, giám sát vi khí hậu, pha hóa chất/kháng khuẩn đường nước, kiểm soát tiêu chảy và dinh dưỡng."')
path.write_text(text, encoding='utf-8')
print('updated hero and header')
