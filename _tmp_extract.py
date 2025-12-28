# -*- coding: utf-8 -*-
import os
from pathlib import Path
from pypdf import PdfReader
pdfs = list(Path('.').glob('*.pdf'))
print('Found PDFs:', [p.name for p in pdfs])
for p in pdfs:
    try:
        reader=PdfReader(p)
        pages=min(2, len(reader.pages))
        text=' '.join((reader.pages[i].extract_text() or '') for i in range(pages))
        print('\n---', p.name, '---')
        print(text[:1200].replace('\n',' '))
    except Exception as e:
        print('error', p.name, e)
