from pathlib import Path
text=Path('src/app/(public)/page.tsx').read_text(encoding='utf-8')
import re
m=re.search(r'<SectionHeader\s*\n\s*eyebrow="Solutions"[\s\S]*?/>' , text)
print('found', bool(m))
print(repr(m.group(0)) if m else '')
