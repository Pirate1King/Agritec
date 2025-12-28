from pathlib import Path
text=Path('src/app/(public)/page.tsx').read_text(encoding='utf-8')
start=text.index('<Hero')
end=text.index('/>', start)+2
print(repr(text[start:end]))
