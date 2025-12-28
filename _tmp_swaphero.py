from pathlib import Path
path=Path("src/app/(public)/page.tsx")
text=path.read_text(encoding="utf-8")
text=text.replace("https://nexocode.com/images/nexo_blog_thumbnail_1920x500_ai_in_poultry_industry.webp","https://www.spireenergy.com/sites/default/files/styles/hero_image/public/2020-03/rsz_gettyimages-177750786.jpg?itok=zyV3xtCw")
path.write_text(text, encoding="utf-8")
print("hero image updated")
