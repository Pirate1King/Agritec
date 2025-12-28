from pathlib import Path
path=Path("src/app/(public)/page.tsx")
text=path.read_text(encoding="utf-8")
start=text.find("<Hero")
if start==-1:
    raise SystemExit("no hero")
end=text.find("/>", start)
if end==-1:
    raise SystemExit("no end")
end=end+2
new_block="""
        <Hero
          title="Giải pháp vận hành trang trại chăn nuôi B2B"
          subtitle="Mỗi giải pháp là một hệ triển khai hoàn chỉnh: sản phẩm – quy trình – thiết bị – combo ứng dụng thực tế."
          imageUrl="https://nexocode.com/images/nexo_blog_thumbnail_1920x500_ai_in_poultry_industry.webp"
          primaryCta={{ label: "Xem giải pháp", href: "/giai-phap" }}
          secondaryCta={{ label: "Đặt hàng", href: "/dat-hang" }}
        />
"""
path.write_text(text[:start]+new_block+text[end:], encoding="utf-8")
print("hero replaced")
